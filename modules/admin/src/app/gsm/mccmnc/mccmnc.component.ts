import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
import {FORM_DIRECTIVES} from "@angular/forms";
import {MdInput} from "@angular2-material/input/input";
import {MdToolbar} from "@angular2-material/toolbar/toolbar";
import {MD_TABS_DIRECTIVES} from "@angular2-material/tabs/tabs";
import {NgFor} from "@angular/common";

require('./mccmnc.scss');

@Component({
    selector: 'mccmnc',
    template: require('./mccmnc.html'),
    styleUrls: [],
    providers: [BreadcrumbService],
    directives: [
        BreadcrumbService,
        AgGridNg2,
        MD_TABS_DIRECTIVES,
        MdToolbar,
        FORM_DIRECTIVES,
        NgFor
    ],
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
    };

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
    };

    tabs = [
        { label: 'MCC', columnDefs: this.columnDefsMCC,  rowData: this.rowDataMCC },
        { label: 'MNC', columnDefs: this.columnDefsMNC,  rowData: this.rowDataMNC }
    ];

}
