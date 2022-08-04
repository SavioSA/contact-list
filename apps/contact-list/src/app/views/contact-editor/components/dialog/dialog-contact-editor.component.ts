import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'contact-list-dialog-contact-editor',
  templateUrl: './dialog-contact-editor.component.html',
  styleUrls: ['./dialog-contact-editor.component.scss'],
})
export class DialogContactEditorComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContactEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  clearFields() {
    this.data.formData.controls['phone'].setValue('');
    this.data.formData.controls['email'].setValue('');
  }

  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submit() {
    this.dialogRef.close({ validated: true });
  }
}
