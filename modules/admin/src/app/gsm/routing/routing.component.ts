import {Component} from '@angular/core';
import {RoutingGrid} from './directives/routing-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'routing',
    template: require('./routing.html'),
    styleUrls: [
        // require('./routing.scss')
    ],
    providers: [BreadcrumbService],
    directives: [RoutingGrid, BreadcrumbService, AgGridNg2],
    pipes: [TranslatePipe]
})
export class Routing {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

    columnDefs = [
        { headerName: "Carrier", field: "carrier" },
        { headerName: "Type", field: "type" }
    ];

    rowData = [
        { carrier: "", type: "" },
        { carrier: "", type: "" },
        { carrier: "", type: "" },
    ];

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
    }

}
