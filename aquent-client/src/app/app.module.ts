import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FourOhFourComponent } from './shared/fourOhFour/fourOhFour.component';
import { AddressInputComponent } from './shared/addressInput/addressInput.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [						
    AppComponent,
      ClientListComponent,
      ClientDetailComponent,
      ContactListComponent,
      ContactDetailComponent,
      EditClientComponent,
      EditContactComponent,
      FourOhFourComponent,
      AddressInputComponent,
      SpinnerComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
