import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import ContactTypeInterface from '../../../../interfaces/contact-type.interface';
import ContactInterface from '../../../../interfaces/contact.interface';
import UserInterface from '../../../../interfaces/user.interface';
import { ContactTypeService } from '../../../../services/contact-type.service';
import { ContactService } from '../../../../services/contact.service';
import { UserService } from '../../../../services/user.service';
import { DialogComponent } from "../dialog/dialog.component";
@Component({
  selector: 'contact-list-contact-form-editor',
  templateUrl: './contact-form-editor.component.html',
  styleUrls: ['./contact-form-editor.component.scss'],
})
export class ContactFormEditorComponent implements OnInit {
  contacts: ContactInterface[] = [];
  currentContactId!: number | undefined;
  contactTypes: ContactTypeInterface[] = []
  userId!: number
  userForm = this.fb.group({
    name: [
      '', {
        validators: [
          Validators.required,
          Validators.minLength(3),
        ]
      }
    ],
    surname: [
      '', {
        validators: [
          Validators.required,
          Validators.minLength(3),
        ]
      }
    ],
  })
  contactForm = this.fb.group({
    type: [
      '', {
        validators: [
          Validators.required
        ]
      }
    ],
    phone: [
      '', {
        validators: [
          Validators.minLength(11),
          Validators.maxLength(11),
        ]
      }
    ],
    email: [
      '', {
        validators: [
          Validators.email
        ]
      }
    ],
    isWhatsapp: [
      false, {
        validators: []
      }
    ]
  })

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder, private contactTypeService: ContactTypeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.userId = params["id"]
        this.getUser(this.userId);
      }
    })
    this.getContactTypes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '16rem',
      height: '360px',
      data: {
        formData: this.contactForm,
        contactTypes: this.contactTypes
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.validated) {
        if (this.userId) {
          this.contactService.registerContact({
            identifier: (this.contactForm.value.email || this.contactForm.value.phone) as string,
            isWhatsapp: this.contactForm.value.isWhatsapp as boolean,
            contactTypeId: parseInt(this.contactForm.value.type as string),
            userId: this.userId
          }).subscribe((res) => {
            this.setContacts(res.id);
            })
        } else {
            this.setContacts();
        }
      }
      this.contactForm.reset();
    });
  }
  getContactTypes() {
    this.contactTypeService.getAll().subscribe(res => {
      this.contactTypes = res;
    })
  }
  saveUser() {
    const { name, surname } = this.userForm.value;
    const userInformations = {
      name: name as string,
      surname: surname as string
    }
    if (this.userId) {
      this.editUser(userInformations)
    } else {
      this.registerUser(userInformations)
    }
  }
  getUser(id: number) {
    this.userService.getUser(id).subscribe(res => {
      const { contacts, name, surname } = res;
      this.contacts = contacts as ContactInterface[];
      this.userForm.controls.name.setValue(name);
      this.userForm.controls.surname.setValue(surname);
    })
  }
  editUser(user: UserInterface) {
    this.userService.editUser({
      id: this.userId,
      name: user.name,
      surname: user.surname,
    }).subscribe(res => {
      console.log(res);
    })
  }
  registerUser(user: UserInterface) {
    this.userService.registerUser({
      name: user.name,
      surname: user.surname,
      contacts: this.contacts
    }).subscribe((res) => {
      this.router.navigate([`/user/edit/${res.id}`])
    })
  }

  deleteContact(contactInfo:{id: number, identifier: string}) {
    if (contactInfo?.id) {
      this.contactService.deleteContact(contactInfo.id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => {
        return contact.id !== contactInfo.id
      })
    })
    } else {
      this.contacts = this.contacts.filter(contact => {
        return contact.identifier !== contactInfo.identifier
      })
    }
  }

  setContacts(id: number | null = null) {
    const contactTypeName = this.contactTypes.find(type => {
      return type.id === parseInt(this.contactForm.value.type as string)
    })
    const contactInfo = {
        contactTypeName: contactTypeName?.type,
        contactTypeId: parseInt(this.contactForm.value.type as string),
        identifier: (this.contactForm.value.email || this.contactForm.value.phone) as string,
        isWhatsapp: this.contactForm.value.isWhatsapp as boolean
    }

    this.contacts = [
      id ? {...contactInfo, id} : contactInfo,
      ...this.contacts
    ]
  }
}
