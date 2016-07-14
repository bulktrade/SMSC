import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from './customers.service';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

@Component({
    selector: 'customers-edit-grid',
    template: require('./customers.edit.html'),
    styleUrls: [],
    providers: [CustomerService],
    directives: [AgGridNg2],
    pipes : [TranslatePipe]
})

export class CustomersEditing {
    public rowData;

    constructor(public translate: TranslateService,
                public customerService: CustomerService) {
    }

    ngOnInit() {
        this.customerService.query()
            .then((store) => {
                this.rowData = store;
            });
    }

    columnDefs = [
        { headerName: this.translate.get('CUSTOMERID')['value'],
            field: "customer_id", editable: true },
        { headerName: this.translate.get('COMPANYNAME')['value'],
            field: "company_name", editable: true },
        { headerName: this.translate.get('CONTACTS')['value'],
            field: "contacts", editable: true },
    ];

    gridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

}
