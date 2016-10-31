import { DashboardBoxType } from './dashboard-box-type';
import { MetaData } from '../../common/models/meta-data';
import { Dashboard } from './dashboard';
import { OUser } from '../../common/models/OUser';
import {ChartType} from "./chart-type";

export class DashboardBox {
    metaData: MetaData;
    name: string;
    description: string;
    width: number;
    height: number;
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
        this.width = data['width'];
        this.height = data['height'];
        this.order = data['order'];

        this.dashboard = new Dashboard(
            new MetaData(
                data['dashboard']['@class'],
                data['dashboard']['@rid'],
                data['dashboard']['@version']
            ),
            data['dashboard']['icon'],
            data['dashboard']['name'],
            new OUser(
                data['dashboard']['user']['name']
            )
        );

        this.type = new DashboardBoxType(
            new MetaData(
                data['type']['@class'],
                data['type']['@rid'],
                data['type']['@version']
            ),
            data['type']['type'],
            data['type']['kind'],
            data['type']['code'],
            data['type']['codeLanguage'],
            data['type']['name']
        );
    }

    /**
     * Get OrientDB record object
     * @returns {Object}
     */
    getORecord(): Object {
        let data: Object = {};

        data['@class'] = this.metaData.className;
        data['@rid'] = this.metaData.rid;
        data['@version'] = this.metaData.version;

        data['order'] = this.order;
        data['width'] = this.width;
        data['height'] = this.height;
        data['name'] = this.name;
        data['description'] = this.description;
        data['dashboard'] = this.dashboard.metaData.rid;
        data['type'] = this.type.metaData.rid;

        return data;
    }
}
