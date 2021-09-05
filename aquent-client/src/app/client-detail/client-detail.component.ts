import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../models/client';
import { ClientService } from '../services/client.service';

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
    private clientService: ClientService
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
    console.log("deleting client number " + this.clientId);
  }

  removeContact(): void {
    console.log("removeing contact");
  }

}
