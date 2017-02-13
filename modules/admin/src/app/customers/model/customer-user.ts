import {Link, Entity} from "../../shared/entity.model";

interface Links {
    self: Link;
    customer: Link;
}

export interface CustomerUser extends Entity {
    username: string;
    password: string;
    salt: string;
    firstname: string;
    surname: string;
    email: string;
    active: boolean;
    created: string;
    blocked: boolean;
    _links: Links;
}
