import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ContactFormEditorComponent } from './components/contact-form-editor/contact-form-editor.component';
import { DialogContactEditorComponent } from './components/dialog/dialog-contact-editor.component';
import { ContactEditorRoutingModule } from './contact-editor-routing.module';

@NgModule({
  declarations: [ContactFormEditorComponent, DialogContactEditorComponent],
  imports: [
    CommonModule,
    ContactEditorRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ContactEditorModule {}
