import {Component} from '@angular/core';
import {CustomersGrid} from './directives/customers-grid';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [
        // require('./customers.scss')
    ],
    providers: [BreadcrumbService],
    directives: [CustomersGrid, BreadcrumbService, AgGridNg2],
    pipes : [TranslatePipe]
})
export class Customers {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {
    }

    ngOnInit() {
    }

    columnDefs = [
        { headerName: "Customer ID", field: "customer_id" },
        { headerName: "Company Name", field: "company_name" }
    ];

    rowData = [
        { customer_id: "", company_name: "" },
        { customer_id: "", company_name: "" },
        { customer_id: "", company_name: "" },
    ];

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
    }

}

