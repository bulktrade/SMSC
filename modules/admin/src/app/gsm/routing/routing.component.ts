import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

require('./routing.scss');

@Component({
    selector: 'routing',
    template: require('./routing.html'),
    styleUrls: [],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService, AgGridNg2],
    pipes: [TranslatePipe]
})
export class Routing {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

    columnDefs = [
        { headerName: this.translate.get('CARRIER')['value'], field: "carrier" },
        { headerName: this.translate.get('TYPE')['value'], field: "type" }
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
