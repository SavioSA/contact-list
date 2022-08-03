import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
@Component({
  selector: 'contact-list-contact-form-editor',
  templateUrl: './contact-form-editor.component.html',
  styleUrls: ['./contact-form-editor.component.scss'],
})
export class ContactFormEditorComponent implements OnInit {
  contacts: any = [];

  contactForm = this.fb.group({
    type: [
      '', {
        validators: [
          Validators.required
        ]
      }
    ],
    phone: [
      null, {
        validators: [
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      }
    ],
    email: [
      null, {
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

  constructor(public dialog: MatDialog, private fb: FormBuilder ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '16rem',
      height: '360px',
      data: {
        formData: this.contactForm
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.validated) {

        this.contacts = [
          {
            type: this.contactForm.value.type,
            identifier: this.contactForm.value.email || this.contactForm.value.phone,
            whatsapp: this.contactForm.value.isWhatsapp
          },
          ...this.contacts
        ]

        console.log(this.contacts);

      }
    });
  }
  atLeastOneContact() {
   return this.contactForm.value.email || this.contactForm.value.email
  }
}
