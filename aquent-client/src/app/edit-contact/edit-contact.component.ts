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
    let contactId = this.getRouteParam();
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

  getRouteParam() {
    return this.route.snapshot.paramMap.get('id');
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
    let contact = this.contactForm.value;
    contact['clientId'] = contact['clientId'][0];
    contact.personId = this.getRouteParam();
    let personId = this.getRouteParam();
    if (!personId) {
      this.personService.postContact(this.contactForm.value).subscribe({
        next: (id: number) => {
          this.router.navigateByUrl('/contact/' + id);
        }
      });
    } else {
      this.personService.updateContact(contact).subscribe({
        next: () => {
          this.router.navigateByUrl('/contact/' + contact.personId);
        }
      })
    }
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

