import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {MonitoringGrid} from './directives/monitoring-grid';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'monitoring',
    template: require('./monitoring.html'),
    styleUrls: [
        require('./monitoring.scss')
    ],
    providers: [BreadcrumbService],
    directives: [MonitoringGrid, BreadcrumbService],
    pipes: [TranslatePipe]
})
export class Monitoring {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}
