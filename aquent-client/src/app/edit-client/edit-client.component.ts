import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
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
  submitted = false;
  get contacts() {
    return this.clientForm.get('contacts') as FormArray;
  };

  constructor(private personService: PersonService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    let clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getClient(+clientId).subscribe({
        next: (client: IClient) => {
          this.clientData = client;
          console.log(this.clientData);
          this.clientForm = new FormGroup({
            companyName: new FormControl(client.companyName),
            websiteUri: new FormControl(client.websiteUri),
            phoneNumber: new FormControl(client.phoneNumber),
            streetAddress: new FormControl(client.streetAddress),
            city: new FormControl(client.city),
            state: new FormControl(client.state),
            zipCode: new FormControl(client.zipCode),
            contacts: new FormArray([])
          });
        }
      })
      
    } else {
      this.clientForm = this.formBuilder.group({
        companyName: [''],
        websiteUri: [''],
        phoneNumber: [''],
        streetAddress: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        contacts: new FormArray([])
      });
    }
    
  }

  ngOnInit() {
    this.getContacts();
  }

  //getter to access form controls from the template
  get fc(): {[key: string]: AbstractControl} {
    return this.clientForm.controls;
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
    this.submitted = true; 
    let contacts = this.clientForm.value.contacts;
    let clientId;
    delete this.clientForm.value.contacts;
    this.clientService.postClient(this.clientForm.value).subscribe({
      next: (id: number) => {
        clientId = id;
        console.log(id);
        this.updateContacts(contacts, clientId)
        this.router.navigateByUrl('/client/' + clientId);
      }
    })
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
