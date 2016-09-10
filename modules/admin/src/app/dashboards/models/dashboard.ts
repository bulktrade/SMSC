import { OUser } from "../../common/models/OUser";

export class Dashboard {
    icon: string;
    name: string;
    user: OUser;

    constructor(icon: string, name: string, user: OUser) {
        this.icon = icon;
        this.name = name;
        this.user = user;
    }
}
