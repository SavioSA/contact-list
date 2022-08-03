import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ContactListComponent } from './views/contact-list/contact-list.component';


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ContactListComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
