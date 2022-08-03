import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ContactFormEditorComponent } from '../../components/contact-form-editor/contact-form-editor.component';
import { MaterialModule } from "../../material.module";
import { ContactListRoutingModule } from './contact-list-routing.module';
import { ContactListComponent } from './contact-list.component';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactFormEditorComponent
  ],
  imports: [
    CommonModule,
    ContactListRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class ContactListModule { }
