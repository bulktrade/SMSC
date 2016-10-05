import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from './theme';

@Injectable()
export class TrafficChartService {

    constructor(private _baConfig:BaThemeConfigProvider) {
    }


    getData() {
        let dashboardColors = this._baConfig.get().colors.dashboard;
        return [10, 20, 30];
    }
}
