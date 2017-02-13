import {Link, Entity} from "../shared/entity.model";

interface Links {
    self: Link;
    dashboards: Link,
    roles: Link,
    user: Link
}

export interface User extends Entity {
    username: string,
    password: string,
    salt: string,
    firstname: string,
    surname: string,
    email: string,
    active: boolean,
    created: string,
    blocked: boolean,
    _links: Links;
}
