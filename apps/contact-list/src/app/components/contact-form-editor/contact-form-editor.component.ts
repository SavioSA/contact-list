import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import ContactTypeInterface from '../../interfaces/contact-type.interface';
import ContactInterface from '../../interfaces/contact.interface';
import { ContactTypeService } from '../../services/contact-type.service';
import { DialogComponent } from "../dialog/dialog.component";
@Component({
  selector: 'contact-list-contact-form-editor',
  templateUrl: './contact-form-editor.component.html',
  styleUrls: ['./contact-form-editor.component.scss'],
})
export class ContactFormEditorComponent implements OnInit {
  contacts: ContactInterface[] = [];
  contactTypes: ContactTypeInterface[]= []
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

  constructor(public dialog: MatDialog, private fb: FormBuilder, private contactTypeService: ContactTypeService ) {}

  ngOnInit(): void {
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
      if (result?.validated) {
        console.log(this.contactForm.value);
        const contactTypeName = this.contactTypes.find(type => {
          return type.id === parseInt(this.contactForm.value.type as string)
        })
        this.contacts = [
          {
            contactTypeName: contactTypeName?.type,
            contactTypeId: parseInt(this.contactForm.value.type as string),
            identifier: (this.contactForm.value.email || this.contactForm.value.phone) as string,
            isWhatsapp: this.contactForm.value.isWhatsapp as boolean
          },
          ...this.contacts
        ]
      }
    });
  }
  getContactTypes() {
    this.contactTypeService.getAll().subscribe(res => {
      this.contactTypes = res;
    })
  }
}
