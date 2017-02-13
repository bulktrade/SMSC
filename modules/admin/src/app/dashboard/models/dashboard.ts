import { OUser } from '../../shared/components/models/OUser';
import { MetaData } from '../../shared/components/models/meta-data';

export class Dashboard {
    metaData: MetaData;
    icon: string;
    name: string;
    user: OUser;

    constructor(metaData: MetaData, icon: string, name: string, user: OUser) {
        this.metaData = metaData;
        this.icon = icon;
        this.name = name;
        this.user = user;
    }
}
