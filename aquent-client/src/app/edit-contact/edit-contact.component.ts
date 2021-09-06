import { Component, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../models/client';
import { IPerson } from '../models/person';
import { ClientService } from '../services/client.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  clientsList!: IClient[];
  selectedClient!: number;
  contactData!: IPerson;

  get contacts() {
    return this.contactForm.get('contacts') as FormArray;
  };

  constructor(private personService: PersonService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.personService.getContact(+contactId).subscribe({
        next: (contact: IPerson) => {
          this.contactData = contact;
          this.contactForm = new FormGroup({
            firstName: new FormControl(contact.firstName, Validators.required),
            lastName: new FormControl(contact.lastName, Validators.required),
            emailAddress: new FormControl(contact.emailAddress, [Validators.required, Validators.email]),
            streetAddress: new FormControl(contact.streetAddress, Validators.required),
            city: new FormControl(contact.city, Validators.required),
            state: new FormControl(contact.state, [Validators.required, Validators.pattern('[a-z]{2}')]),
            zipCode: new FormControl(contact.zipCode, [Validators.required, Validators.pattern('[0-9]{5}')]),
            clientId: new FormControl(contact.clientId)
          })
        }
      })
    }
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.pattern('[a-z]{2}')]],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      clientId: ['']
    });
  }

  ngOnInit() {
    this.getClients();
  }
  
  //getter to access form controls from the template
  get fc(): {[key: string]: AbstractControl} {
    return this.contactForm.controls;
  }

  onSelectChange(e: any) {
    this.contactForm.value['clientId'] = e.target.value[0];
    console.log(this.contactForm.value);
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: (data: any) => {
        console.log(data);
        this.clientsList = data;
        data.unshift(' ');
      }
    })
  }

  onSubmit(): void {
    console.log(this.contactForm.value);
    this.contactForm.value['clientId'] = this.contactForm.value['clientId'][0];
    this.personService.postContact(this.contactForm.value).subscribe({
      next: (id: number) => {
        this.router.navigateByUrl('/contact/' + id);
      }
    })
  }

  updateContacts(contacts: string[], id: number) {
    contacts.forEach(person => {
      this.personService.updateContactsClient(+person, id)
    });
  }


  addContactsToFormArray() {
    console.log(this.clientsList);
    if (this.clientsList) {
      this.clientsList.forEach(person => {
        this.contacts.push(this.formBuilder.control(''));
      });
    }
  }
}

