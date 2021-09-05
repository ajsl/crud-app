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
}
