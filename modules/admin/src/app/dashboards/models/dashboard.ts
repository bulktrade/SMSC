import { OUser } from '../../common/models/OUser';
import { MetaData } from '../../common/models/metaData';

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
