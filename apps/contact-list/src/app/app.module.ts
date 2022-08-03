import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementButtonsComponent } from './components/management-buttons/management-buttons.component';
import { MaterialModule } from "./material.module";
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserService } from "./services/user.service";
import { ContactListComponent } from './views/contact-list/contact-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ContactListComponent,
    ManagementButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
