import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'prices',
    template: require('./prices.html'),
    styleUrls: [
        // require('./prices.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService, AgGridNg2],
    pipes: [TranslatePipe]
})
export class Prices {
    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

    columnDefs = [
        { headerName: "MCC", field: "mcc" },
        { headerName: "MNC", field: "mnc" },
        { headerName: "Price", field: "price" },
        { headerName: "Type", field: "type" },
        { headerName: "Valid from", field: "valid_from" },
        { headerName: "Valid to", field: "valid_to" }
    ];

    rowData = [
        { mcc: "", mnc: "", price: "", type: "", valid_from: "", valid_to: ""},
        { mcc: "", mnc: "", price: "", type: "", valid_from: "", valid_to: ""},
        { mcc: "", mnc: "", price: "", type: "", valid_from: "", valid_to: ""}
    ];

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
    }
}
