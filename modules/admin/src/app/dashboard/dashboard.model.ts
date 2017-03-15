import {Entity, Link} from "../shared/entity.model";

interface Links {
    self: Link;
    dashboard: Link,
    user: Link,
    dashboardBoxes: Link
}

export interface Dashboard extends Entity {
    name: string;
    icon: string;
    _links: Links;
}
