import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./views/contact-list/contact-list.module').then(c => c.ContactListModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./views/contact-editor/contact-editor-routing.module').then(c => c.ContactEditorRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
