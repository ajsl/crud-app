import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPerson } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getContacts() {
    let request = this.http.get<IPerson>(this.baseUrl + "person/list");
    return request;
  }

  getContact(id: number) {
    return this.http.get<IPerson>(this.baseUrl + 'person/' + id);
  }

  postContact(contact: IPerson) {
    return this.http.post<number>(this.baseUrl + 'person/create', contact);
  }

  deleteContact(id: number) {
    return this.http.delete(this.baseUrl + 'person/' + id);
  }

  updateContact(contact: IPerson) {
    return this.http.put(this.baseUrl + 'person/', contact);
  }

  updateContactsClient(contactId: number, clientId: number) {
    let contact: IPerson;
    this.getContact(contactId).subscribe({
      next: (data: IPerson) => {
        contact = data;
        contact.clientId = clientId;
        this.updateContact(contact).subscribe({
          next: () => {
            console.log("updated contact");
          }
        });
      } 
    });
  }
}
