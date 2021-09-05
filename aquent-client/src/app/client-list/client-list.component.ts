import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: IClient[] | undefined;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe
    ({
      next: (data: any) => {
        this.clients = data;
      }
    })
  }

}
