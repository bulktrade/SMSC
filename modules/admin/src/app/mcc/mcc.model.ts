import {Entity, Link} from "../shared/entity.model";

interface Links {
    self: Link;
    mcc: Link;
}

export interface MCC extends Entity {
    mcc: string;
    code: string;
    country: string;
    _links: Links;
}
