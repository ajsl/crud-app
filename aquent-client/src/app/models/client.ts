import { IPerson } from "./person";

export interface IClient {
    clientId: number;
    companyName: string;
    websiteUri: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    contacts: IPerson[];
}