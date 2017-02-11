class Link {
    public href: String;
}

class Links {
    public self: Link;
}

export class Profile {
    public _links: Links;

    constructor(
        public firstname: String,
        public surname: String,
        public email: String,
        public username: String,
        public password: String
    ) {}
}
