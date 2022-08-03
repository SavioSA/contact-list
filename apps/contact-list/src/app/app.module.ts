import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementButtonsComponent } from './components/management-buttons/management-buttons.component';
import { MaterialModule } from './material.module';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserService } from "./services/user.service";
import { ContactEditorModule } from './views/contact-editor/contact-editor.module';
import { ContactListModule } from "./views/contact-list/contact-list.module";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ManagementButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ContactListModule,
    ContactEditorModule,
    MaterialModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
