import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
            clientId: new FormControl(contact.clientId),
            address: new FormGroup({
              streetAddress: new FormControl(contact.address.streetAddress, Validators.required),
              city: new FormControl(contact.address.city, Validators.required),
              state: new FormControl(contact.address.state, [Validators.required, Validators.pattern('[a-z,A-Z]{2}')]),
              zipCode: new FormControl(contact.address.zipCode, [Validators.required, Validators.pattern('[0-9]{5}')]),
            })
          })
        }
      })
    }
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      clientId: [''],
      address: this.formBuilder.group({
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', [Validators.required, Validators.pattern('[a-z,A-Z]{2}')]],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      }),
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
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: (data: any) => {
        this.clientsList = data;
        data.push({
          companyName: "None",
          clientId: 0
        });
      }
    })
  }

  checkCurrentClient() {
    if (this.contactData && this.clientsList) {
      for (let i = 0; i < this.clientsList.length; i++) {
        if (this.clientsList[i].clientId === this.contactData.clientId) {
          return this.clientsList[i].companyName;
        }
      }
    }
    return '';
  }

  onSubmit(): void {
    let contact = this.contactForm.value;
    if(contact['clientId'] > 0){
      contact['clientId'] = contact['clientId'][0];
    }
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
}

