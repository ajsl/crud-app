import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FourOhFourComponent } from './shared/fourOhFour/fourOhFour.component';
import { ServerErrorComponent } from './shared/server-error/server-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'client/:id', component: ClientDetailComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'edit/client/:id', component: EditClientComponent },
  { path: 'edit/contact/:id', component: EditContactComponent },
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
