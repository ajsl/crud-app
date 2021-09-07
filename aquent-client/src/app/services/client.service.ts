import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IClient } from '../models/client';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private personService: PersonService) { }

  getClients() {
    let request = this.http.get<IClient[]>(this.baseUrl + 'client/list');
    return request;
  }

  getClient(id: number) {
    return this.http.get<IClient>(this.baseUrl + 'client/' + id);
  }

  postClient(client: IClient) {
    return this.http.post<number>(this.baseUrl + 'client/create', client);
  }

  updateClient(client: IClient) {
    return this.http.put(this.baseUrl + 'client/', client);
  }

  deleteClient(client: IClient) {
    //check if they client has any contacts.
    //if they doo delete them.
    if (client.contacts && client.contacts.length > 0){
      client.contacts.forEach(contact => {
        this.personService.updateContactsClient(contact.personId, 0)
      });
    }

    return this.http.delete(this.baseUrl + 'client/' + client.clientId);
  }


}
