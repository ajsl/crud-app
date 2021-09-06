import { IPerson } from "./person";
import { IAddress } from "./address";

export interface IClient {
    clientId: number;
    companyName: string;
    websiteUri: string;
    phoneNumber: string;
    address: IAddress;
    contacts?: IPerson[];
}