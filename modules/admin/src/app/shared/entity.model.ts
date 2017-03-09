export class Link {
    constructor(public href: string) {
    }
}

export class Links {
    self: Link;
}

export class Entity {
    _links: Links;
}
