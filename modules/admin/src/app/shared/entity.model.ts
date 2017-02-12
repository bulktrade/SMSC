export interface Link {
    href: string;
}

interface Links {
    self: Link;
}

export interface Entity {
    _links: Links;
}
