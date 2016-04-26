import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {MonitoringGrid} from "./directives/monitoring-grid";
import {Router} from 'angular2/router';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'monitoring',
    templateUrl: 'app/components/monitoring/monitoring.html',
    styles: [
        require('./monitoring.scss')
    ],
    providers: [BreadcrumbService],
    directives: [MonitoringGrid, BreadcrumbService],
    pipes: [TranslatePipe]
})
export class Monitoring {

    constructor(public translate: TranslateService,
                public router: Router, public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}