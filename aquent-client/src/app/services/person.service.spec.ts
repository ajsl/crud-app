/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import { IPerson } from '../models/person';
import { HttpErrorResponse } from '@angular/common/http';


describe('Service: Person', () => {
    let httpTestingController: HttpTestingController;
    let personService: PersonService;
    let testUrl = 'http://localhost:8081/person/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        personService = TestBed.inject(PersonService);
    });

    afterEach(() => {
        httpTestingController.verify();
    })

    let testContact: IPerson = {
        personId: 2,
        firstName: "Jamse",
        lastName: "Smith",
        emailAddress: "fake2@aquent.com",
        address: {
            streetAddress: "1243 Any St.",
            city: "Ashesdfville",
            state: "NC",
            zipCode: "28801"
        },
        clientId: 2
    }

    xit('updateContact should use Put to send data', () => {
        personService.updateContact(testContact).subscribe;

        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('PUT');
    })

    it('can test for 500 error', () => {
        const errorMessage = "test";

        personService.postContact(testContact).subscribe(
            (data: any) => fail('should fail with a 500 error'),
            (error: HttpErrorResponse) => {
                expect(error.status).withContext('500')
                expect(error.error.message).withContext(errorMessage);
            }
        );

        const mockError = new ErrorEvent('Network error', {
            message: errorMessage,
        });

        const testRequest = httpTestingController.expectOne(testUrl + 'create');
        testRequest.error(mockError);
    });
});
