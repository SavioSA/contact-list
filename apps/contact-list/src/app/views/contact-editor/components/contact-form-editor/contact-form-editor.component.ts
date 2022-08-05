import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmationComponent } from 'apps/contact-list/src/app/components/dialog-confirmation/dialog-confirmation.component';
import ContactInputInterface from 'apps/contact-list/src/app/interfaces/contact-input.interface';
import ContactTypeInterface from '../../../../interfaces/contact-type.interface';
import ContactInterface from '../../../../interfaces/contact.interface';
import UserInterface from '../../../../interfaces/user.interface';
import { ContactTypeService } from '../../../../services/contact-type.service';
import { ContactService } from '../../../../services/contact.service';
import { UserService } from '../../../../services/user.service';
import { DialogContactEditorComponent } from '../dialog/dialog-contact-editor.component';
@Component({
  selector: 'contact-list-contact-form-editor',
  templateUrl: './contact-form-editor.component.html',
  styleUrls: ['./contact-form-editor.component.scss'],
})
export class ContactFormEditorComponent implements OnInit {
  contacts: any = [];
  currentContactId!: number;
  contactTypes: ContactTypeInterface[] = [];
  userId!: number;
  userForm = this.fb.group({
    name: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    surname: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
  });
  contactForm = this.fb.group({
    type: [
      0,
      {
        validators: [Validators.required],
      },
    ],
    phone: [
      '',
      {
        validators: [Validators.minLength(11), Validators.maxLength(11)],
      },
    ],
    email: [
      '',
      {
        validators: [Validators.email],
      },
    ],
    isWhatsapp: [
      false,
      {
        validators: [],
      },
    ],
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private contactTypeService: ContactTypeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.userId = params['id'];
        this.getUser(this.userId);
        console.log(this.userForm.controls.name.value);
        if (this.userForm.controls.name.value !== '') {
          this.router.navigate([`/list`]);
        }
      }
    });
    this.getContactTypes();
  }

  updateContact(result: { validated: boolean }, context: this) {
    if (result?.validated) {
      const { phone, email, isWhatsapp } = context.contactForm.value;
      const data = {
        identifier: (phone ? phone : email) as string,
        isWhatsapp: isWhatsapp as boolean,
      };
      context.contactService
        .updateContact(context.currentContactId, data)
        .subscribe((res) => {
          context._snackBar.open('Contato Atualizado com sucesso.', 'OK');
          context.getUser(context.userId);
        });
    }
  }

  editContact(contactId: number) {
    this.currentContactId = contactId;
    this.contactService.getContact(contactId).subscribe((res) => {
      const { identifier, isWhatsapp, contactType } = res;
      this.contactForm.controls.isWhatsapp.setValue(isWhatsapp);
      this.contactForm.controls.type.setValue(contactType?.id);
      this.contactForm.controls.phone.setValue(
        contactType?.id === 1 ? identifier : null
      );
      this.contactForm.controls.email.setValue(
        contactType?.id === 2 ? identifier : null
      );
      const data = {
        formData: this.contactForm,
        contactTypes: this.contactTypes,
        userId: this.userId,
      };
      this.openDialog(data, this.updateContact);
    });
  }

  createContact(result: { validated: boolean }, context: this) {
    if (result?.validated) {
      if (context.userId) {
        context.setContacts();
      } else {
        context.setContactsWithoutSend();
      }
    }
  }

  openDeleteDialog(contactInfo: { id: number; identifier: string }) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '16rem',
      height: '184px',
      data: {
        message: `Deseja realmente exluir o contato ${contactInfo.identifier}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.response) {
        this.deleteContact(contactInfo);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  openDialog(data: unknown, todo: Function) {
    const dialogRef = this.dialog.open(DialogContactEditorComponent, {
      width: '16rem',
      height: '360px',
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      todo(result, this);
    });
  }

  addContact(): void {
    const data = {
      formData: this.contactForm,
      contactTypes: this.contactTypes,
    };
    this.openDialog(data, this.createContact);
  }

  getContactTypes() {
    this.contactTypeService.getAll().subscribe((res) => {
      this.contactTypes = res;
    });
  }
  saveUser() {
    const { name, surname } = this.userForm.value;
    const userInformations = {
      name: name as string,
      surname: surname as string,
    };
    if (this.userId) {
      this.editUser(userInformations);
    } else {
      this.registerUser(userInformations);
    }
  }
  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (res) => {
        const { contacts, name, surname } = res;
        this.contacts = contacts as ContactInterface[];
        this.userForm.controls.name.setValue(name);
        this.userForm.controls.surname.setValue(surname);
      },
      error: () => {
        this.router.navigate(['/list']);
      },
    });
  }
  editUser(user: UserInterface) {
    this.userService
      .editUser({
        id: this.userId,
        name: user.name,
        surname: user.surname,
      })
      .pipe();
  }
  registerUser(user: UserInterface) {
    this.userService
      .registerUser({
        name: user.name,
        surname: user.surname,
        contacts: this.contacts,
      })
      .subscribe((res) => {
        this._snackBar.open('Usuário registrado com sucesso.', 'Ok');
        this.router.navigate([`/user/${res.id}`]);
      });
  }

  deleteContact(contactInfo: { id: number; identifier: string }) {
    if (contactInfo?.id) {
      this.contactService.deleteContact(contactInfo.id).subscribe(() => {
        this.contacts = this.contacts.filter((contact: ContactInterface) => {
          return contact.id !== contactInfo.id;
        });
      });
    } else {
      this.contacts = this.contacts.filter((contact: ContactInputInterface) => {
        return contact.identifier !== contactInfo.identifier;
      });
    }
    this._snackBar.open('Contato deletado com sucesso.', 'Ok');
  }

  setContactsWithoutSend() {
    const contactType = this.contactTypes.find((type) => {
      return this.contactForm.value.type;
    });
    this.contacts = [
      {
        contactTypeName: contactType?.type,
        contactTypeId: this.contactForm.value.type,
        identifier: (this.contactForm.value.email ||
          this.contactForm.value.phone) as string,
        isWhatsapp: this.contactForm.value.isWhatsapp as boolean,
      },
      ...this.contacts,
    ];
    this.contactForm.reset();
  }

  setContacts() {
    this.contactService
      .registerContact({
        identifier: (this.contactForm.value.email ||
          this.contactForm.value.phone) as string,
        isWhatsapp: this.contactForm.value.isWhatsapp as boolean,
        contactTypeId: this.contactForm.value.type as number,
        userId: this.userId,
      })
      .subscribe((res) => {
        res.contactType;
        this.contacts = [...this.contacts, res];
        this._snackBar.open('Contato salvo com sucesso.', 'Ok');
      });
    this.contactForm.reset();
  }

  goBackToList() {
    this.router.navigate(['/list']);
  }
}
