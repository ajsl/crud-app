import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../models/client';
import { IPerson } from '../models/person';
import { ClientService } from '../services/client.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientForm!: FormGroup;
  clientData!: IClient;
  contactsList!: IPerson[];
  get contacts() {
    return this.clientForm.get('contacts') as FormArray;
  };

  constructor(private personService: PersonService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    let clientId = this.getRoute();
    if (clientId) {
      this.clientService.getClient(+clientId).subscribe({
        next: (client: IClient) => {
          this.clientData = client;
          console.log(this.clientData);
          this.clientForm = new FormGroup({
            companyName: new FormControl(client.companyName, Validators.required),
            websiteUri: new FormControl(client.websiteUri, Validators.required),
            phoneNumber: new FormControl(client.phoneNumber, [Validators.required, Validators.pattern('[0-9,a-z]{7,15}')]),
            streetAddress: new FormControl(client.streetAddress, Validators.required),
            city: new FormControl(client.city, Validators.required),
            state: new FormControl(client.state, [Validators.required, Validators.pattern('[a-z]{2}')]),
            zipCode: new FormControl(client.zipCode, [Validators.required, Validators.pattern('[0-9]{5}')]),
            contacts: new FormArray([])
          });
        }
      })
      
    } else {
      this.clientForm = this.formBuilder.group({
        companyName: ['', Validators.required],
        websiteUri: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('[a-z,0-9]{7,15}')]],
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', [Validators.required, Validators.pattern('[a-z]{2}')]],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
        contacts: new FormArray([])
      });
    }
    
  }

  ngOnInit() {
    this.getContacts();
  }

  getRoute(){
    return this.route.snapshot.paramMap.get('id');
  }

  onCheckBoxChange(e: any) {
    console.log(this.clientForm);
    const contactsCheck: FormArray = this.clientForm.get('contacts') as FormArray;

    if (e.target.checked) {
      contactsCheck.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      contactsCheck.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          contactsCheck.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  getContacts(): void {
    this.personService.getContacts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.contactsList = data;
      }
    })
  }

  onSubmit(): void {
    let contacts = this.clientForm.value.contacts;
    let client = this.clientForm.value;
    let clientId;
    delete client.contacts;
    if(!this.getRoute()) {
      this.clientService.postClient(client).subscribe({
        next: (id: number) => {
          clientId = id;
          console.log(id);
          this.updateContacts(contacts, clientId)
          this.router.navigateByUrl('/client/' + clientId);
        }
      })
    } else {
      client.clientId = this.getRoute();
      console.log(client);
      this.clientService.updateClient(client).subscribe({
        next: () => {
            this.updateContacts(contacts, client.clientId)
            this.router.navigateByUrl('/client/' + client.clientId);
        }
      })
    }
    
  }

  updateContacts(contacts: string[], id: number){
    contacts.forEach(person => {
      this.personService.updateContactsClient(+person, id)
    });
  } 


  addContactsToFormArray() {
    console.log(this.contactsList);
    if(this.contactsList){
      this.contactsList.forEach(person => {
        this.contacts.push(this.formBuilder.control(''));
      });
    }
  }
}
