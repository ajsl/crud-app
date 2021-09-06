/* tslint:disable:no-unused-variable */
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IClient } from '../models/client';
import { ClientService } from './client.service';

describe('Service: Client', () => {
  let httpTestingController: HttpTestingController;
  let clientService: ClientService;
  let testUrl = 'http://localhost:8081/client/list';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    clientService = TestBed.inject(ClientService);

  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('getClients should return expected data', (done) => {
    const expectedData: IClient[] = [
      {
        "clientId": 2,
        "companyName": "Green Man Brewery",
        "websiteUri": "https://www.greenmanbrewery.com/",
        "phoneNumber": "9457634563",
        "address": {
          "streetAddress": "27 Buxton Ave",
          "city": "Asheville",
          "state": "NC",
          "zipCode": "28801",
        },
        "contacts": []
      },
      {
        "clientId": 3,
        "companyName": "bob",
        "websiteUri": "bob",
        "phoneNumber": "1234567890",
        "address": {
          "streetAddress": "bob",
          "city": "bob",
          "state": "bo",
          "zipCode": "28806",
        },
        "contacts": [
          {
            "personId": 1,
            "firstName": "John",
            "lastName": "Smith",
            "emailAddress": "fake1@aquent.com",
            "address": {
              "streetAddress": "123 Any St.",
              "city": "Asheville",
              "state": "NC",
              "zipCode": "28801",
            },
            "clientId": 3
          },
          {
            "personId": 2,
            "firstName": "Jane",
            "lastName": "Smith",
            "emailAddress": "fake2@aquent.com",
            "address": {
              "streetAddress": "123 Any St.",
              "city": "Asheville",
              "state": "NC",
              "zipCode": "28801",
            },
            "clientId": 3
          }
        ]
      }
    ];

    clientService.getClients().subscribe({
      next: (data: IClient[]) => {
        expect(data).toEqual(expectedData);
        done();
      }
    })

    const testRequest = httpTestingController.expectOne(testUrl);

    testRequest.flush(expectedData);

  });

  it('getClients should use GET to retrive data', () => {
    clientService.getClients().subscribe();

    const testRequest = httpTestingController.expectOne(testUrl);
    expect(testRequest.request.method).toEqual('GET');
  })

  it('can test for 500 error', () => {
    const errorMessage = "test 500 error message";

    clientService.getClients().subscribe(
      (data: any) => fail('should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).withContext('500')
        expect(error.error.message).withContext(errorMessage);
      }
    );

    const mockError = new ErrorEvent('Network error', {
      message: errorMessage,
    });

    const testRequest = httpTestingController.expectOne(testUrl);

    testRequest.error(mockError);
  });

});