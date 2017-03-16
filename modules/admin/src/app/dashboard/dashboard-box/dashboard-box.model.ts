import {Link, Entity} from "../../shared/entity.model";

export enum Width {
    WIDTH_25,
    WIDTH_50,
    WIDTH_75,
    WIDTH_100
}

export enum Height {
    HEIGHT_25,
    HEIGHT_50,
    HEIGHT_75,
    HEIGHT_100
}

interface Links {
    self: Link;
    dashboardBox: Link,
    dashboardBoxType: Link,
    dashboard: Link
}

export interface DashboardBox extends Entity {
    name: string;
    description: string;
    width: Width;
    height: Height;
    order: number;
    _links: Links;
}
