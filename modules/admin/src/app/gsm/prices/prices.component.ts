import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

require('./prices.scss');

@Component({
    selector: 'prices',
    template: require('./prices.html'),
    styleUrls: [],
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
        { headerName: this.translate.get('MCC')['value'], field: "mcc" },
        { headerName: this.translate.get('MNC')['value'], field: "mnc" },
        { headerName: this.translate.get('PRICE')['value'], field: "price" },
        { headerName: this.translate.get('TYPE')['value'], field: "type" },
        { headerName: this.translate.get('VALIDFROM')['value'], field: "valid_from" },
        { headerName: this.translate.get('VALIDTO')['value'], field: "valid_to" }
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
