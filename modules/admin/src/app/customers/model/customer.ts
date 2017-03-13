import {Contact} from "./contact";
import {CustomerUser} from "./customer-user";
import {Entity, Link} from "../../shared/entity.model";

interface Links {
    self: Link;
    customer: Link;
    contacts: Link;
    parent: Link;
    users: Link;
}

export interface Customer extends Entity {
    country: string;
    city: string;
    companyName: string;
    street: string;
    street2: string;
    postcode: string;
    vatid: string;
    contacts: Contact[];
    users: CustomerUser[];
    parent: Customer;
    _links: Links;
}
