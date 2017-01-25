import { Contact } from "./contact";
import { User } from "./user";

export interface Customer {
    country: string,
    city: string,
    companyName: string,
    street: string,
    street2: string,
    postcode: string,
    vatid: number,
    customerId: number,
    contacts: Contact[]
    users: User[],
    parentCustomer: Customer
}
