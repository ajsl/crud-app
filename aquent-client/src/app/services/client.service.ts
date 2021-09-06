import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IClient } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.put(this.baseUrl + 'client/', client)
  }

  deleteClient(id: number) {
    return this.http.delete(this.baseUrl + 'client/' + id);
  }


}
