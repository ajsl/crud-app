import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../models/client';
import { ClientService } from '../services/client.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client!: IClient;
  clientId = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClient(this.clientId);
  }

  loadClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (data: IClient) => {
        this.client = data;
      }
    })
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.clientId).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      }
    })
  }

  //reload component to show updated coontact list
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('client/' + this.client.clientId)
  }

  //need a better way to handle this
  //introducing a delay to allow the backend to remove client from db

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async removeContact(personId: number) {
    this.personService.updateContactsClient(personId, 0);
    this.client.contacts.filter(x => x.personId !== personId);
    await this.sleep(1000);
    this.reloadComponent();

  }

}
