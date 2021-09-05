import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contact!: IPerson;
  contactId = 0;
  constructor(private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.getContact(this.contactId);
  }

  getContact(id: number){
    this.personService.getContact(id).subscribe({
      next: (data: IPerson) => {
        this.contact = data;
      }
    })
  }

  deleteContact(id: number){
    console.log("deleteing contact");
  }

}
