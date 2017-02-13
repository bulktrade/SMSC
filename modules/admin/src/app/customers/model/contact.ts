import {Link, Entity} from "../../shared/entity.model";

interface Links {
    self: Link;
    customer: Link;
}

export interface Contact extends Entity {
    firstname: string;
    surname: string;
    phone: string;
    mobilePhone: string;
    fax: string;
    emailAddress: string;
    type: string;
    salutation: string;
    _links: Links;
}
