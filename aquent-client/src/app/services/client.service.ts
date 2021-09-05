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


}
