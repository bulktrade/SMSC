import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {MonitoringGrid} from './directives/monitoring-grid';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'monitoring',
    template: require('./monitoring.html'),
    styleUrls: [
        // require('./monitoring.scss')
    ],
    providers: [BreadcrumbService],
    directives: [MonitoringGrid, BreadcrumbService, AgGridNg2],
    pipes: [TranslatePipe]
})
export class Monitoring {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

    columnDefs = [
        { headerName: "column1", field: "column1" },
        { headerName: "column2", field: "column2" }
    ];

    rowData = [
        { column1: "", column2: "" },
        { column1: "", column2: "" },
        { column1: "", column2: "" },
    ];

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
    }

}
