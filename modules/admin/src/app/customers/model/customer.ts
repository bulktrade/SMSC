import { Contact } from "./contact";
import { CustomerUser } from "./customer-user";

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
    users: CustomerUser[],
    parentCustomer: Customer
}
