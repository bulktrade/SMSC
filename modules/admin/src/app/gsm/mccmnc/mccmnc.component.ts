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
        { headerName: this.translate.get('MCC')['value'], field: "mcc" },
        { headerName: this.translate.get('CODE')['value'], field: "code" },
        { headerName: this.translate.get('COUNTRY')['value'], field: "country" }
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
        { headerName: this.translate.get('MNC')['value'], field: "mnc" },
        { headerName: this.translate.get('MCC')['value'], field: "mcc" },
        { headerName: this.translate.get('CARRIER')['value'], field: "carrier" }
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
        { label: this.translate.get('MCC')['value'], columnDefs: this.columnDefsMCC,  rowData: this.rowDataMCC },
        { label: this.translate.get('MNC')['value'], columnDefs: this.columnDefsMNC,  rowData: this.rowDataMNC }
    ];

}
