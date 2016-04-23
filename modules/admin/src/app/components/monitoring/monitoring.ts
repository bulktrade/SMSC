import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {MonitoringGrid} from "./directives/monitoring-grid";
import {Router} from 'angular2/router';

@Component({
    selector: 'monitoring',
    templateUrl: 'app/components/monitoring/monitoring.html',
    styles: [
        require('./monitoring.scss'),
        require('../../../assets/css/theme/breadcrumb.scss')
    ],
    providers: [],
    directives: [MonitoringGrid],
    pipes: [TranslatePipe]
})
export class Monitoring {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}