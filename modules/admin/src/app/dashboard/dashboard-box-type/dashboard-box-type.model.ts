import {Link, Entity} from "../../shared/entity.model";

export enum Type {
    STATUS,
    CHART
}

export enum Kind {
    PIE_CHART,
    SERIAL_CHART,
    LINE_CHART,
    BAR_CHART,
    BUBBLE_CHART,
    FEEDBACK_STATUS,
    PROFIT_STATUS,
    ORDERS_STATUS,
    USERS_STATUS
}

interface Links {
    self: Link;
    dashboardBoxType: Link,
    dashboardBoxes: Link
}

export interface DashboardBoxType extends Entity {
    name: string;
    type: Type;
    kind: Kind;
    _links: Links;
}
