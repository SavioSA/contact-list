import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormEditorComponent } from '../../components/contact-form-editor/contact-form-editor.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MaterialModule } from "../../material.module";
import { ContactEditorRoutingModule } from './contact-editor-routing.module';
import { ContactEditorComponent } from './contact-editor.component';


@NgModule({
  declarations: [ContactEditorComponent, ContactFormEditorComponent, DialogComponent],
  imports: [
    CommonModule,
    ContactEditorRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class ContactEditorModule {}
