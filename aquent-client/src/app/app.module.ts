import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FourOhFourComponent } from './shared/fourOhFour/fourOhFour.component';
import { AddressInputComponent } from './shared/address-Input/address-Input.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ServerErrorComponent } from './shared/server-error/server-error.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { ToastrModule } from 'ngx-toastr';

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
      SpinnerComponent,
      ServerErrorComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
