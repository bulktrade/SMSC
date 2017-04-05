import {Entity, Link} from "../shared/entity.model";

interface Links {
    self: Link;
    mcc: Link;
}

export interface MCC extends Entity {
    mcc: number;
    code: number;
    country: string;
    _links: Links;
}
