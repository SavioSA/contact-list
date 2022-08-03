import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from "../../material.module";
import { ContactEditorRoutingModule } from './contact-editor-routing.module';
import { ContactEditorComponent } from './contact-editor.component';


@NgModule({
  declarations: [ContactEditorComponent],
  imports: [
    CommonModule,
    ContactEditorRoutingModule,
    MaterialModule,
    HttpClientModule],
})
export class ContactEditorModule {}
