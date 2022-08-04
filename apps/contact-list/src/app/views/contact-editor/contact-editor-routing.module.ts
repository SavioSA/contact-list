import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormEditorComponent } from './components/contact-form-editor/contact-form-editor.component';

const routes: Routes = [
  {
    path: 'new',
    component: ContactFormEditorComponent,
  },
  {
    path: 'edit/:id',
    component: ContactFormEditorComponent,
  },
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactEditorRoutingModule {}
