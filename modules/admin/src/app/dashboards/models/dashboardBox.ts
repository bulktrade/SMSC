import { DashboardBoxType } from "./dashboardBoxType";
import { MetaData } from "../../common/models/metaData";
import { Dashboard } from "./dashboard";
import { OUser } from "../../common/models/OUser";

export class DashboardBox {
    metaData: MetaData;
    name: string;
    description: string;
    size: number;
    order: number;
    dashboard: Dashboard;
    type: DashboardBoxType;

    constructor(data: Object) {
        this.metaData = new MetaData(
            data['@class'],
            data['@rid'],
            data['@version']
        );

        this.name = data['name'];
        this.description = data['description'];
        this.size = data['size'];
        this.order = data['order'];

        this.dashboard = new Dashboard(
            data['dashboard']['icon'],
            data['dashboard']['name'],
            new OUser(
                data['user']['name']
            )
        );

        this.type = new DashboardBoxType(
            new MetaData(
                data['@class'],
                data['@rid'],
                data['@version']
            ),
            data['type']['code'],
            data['type']['codeLanguage'],
            data['type']['name']
        );
    }

    // @todo Get object for orient db to do updating/delete/insert
    getORecord() {
        return {
          '@version': ''
        };
    }
}
