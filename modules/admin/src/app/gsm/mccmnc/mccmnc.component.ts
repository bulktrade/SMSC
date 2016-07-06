import {Component} from '@angular/core';
import {MCCMNCGrid} from './directives/mccmnc-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'mccmnc',
    template: require('./mccmnc.html'),
    styleUrls: [
        // require('./mccmnc.scss')
    ],
    providers: [BreadcrumbService],
    directives: [MCCMNCGrid, BreadcrumbService, AgGridNg2],
    pipes: [TranslatePipe]
})
export class MCCMNC {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

    // MCC Grid
    columnDefsMCC = [
        { headerName: "MCC", field: "mcc" },
        { headerName: "Code", field: "code" },
        { headerName: "Country", field: "country" }
    ];

    rowDataMCC = [
        { mcc: "", code: "", country: "" },
        { mcc: "", code: "", country: "" },
        { mcc: "", code: "", country: "" }
    ];

    GridOptionsMCC: GridOptions = {
        columnDefs: this.columnDefsMCC,
        rowData: this.rowDataMCC
    }

    // MNC Grid
    columnDefsMNC = [
        { headerName: "MNC", field: "mnc" },
        { headerName: "MCC", field: "mcc" },
        { headerName: "Carrier", field: "carrier" }
    ];

    rowDataMNC = [
        { mnc: "", mcc: "", carrier: "" },
        { mnc: "", mcc: "", carrier: "" },
        { mnc: "", mcc: "", carrier: "" }
    ];

    GridOptionsMNC: GridOptions = {
        columnDefs: this.columnDefsMNC,
        rowData: this.rowDataMNC
    }

}
