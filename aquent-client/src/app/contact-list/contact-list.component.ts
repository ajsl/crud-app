import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/client';
import { IPerson } from '../models/person';
import { ClientService } from '../services/client.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts!: IPerson[];
  spinner = true;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.personService.getContacts().subscribe({
      next: (data: any) => {
        this.contacts = data;
        this.spinner = false;
      },
      error: (error: any) => {
      }
    });
  }
}
