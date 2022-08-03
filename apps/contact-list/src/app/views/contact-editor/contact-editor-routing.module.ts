import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormEditorComponent } from "../../components/contact-form-editor/contact-form-editor.component";

const routes: Routes = [
  {
    path: 'new',
    component: ContactFormEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactEditorRoutingModule { }