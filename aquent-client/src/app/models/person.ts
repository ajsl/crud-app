import { IAddress } from "./address";

export interface IPerson {
    personId: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    address: IAddress;
    clientId: number;
    clientName?: string;
}
