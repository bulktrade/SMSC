import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';
import {CustomerModel} from './customer.model';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

require('./customers.scss');

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [],
    providers: [BreadcrumbService, CustomerModel],
    directives: [BreadcrumbService, AgGridNg2],
    pipes : [TranslatePipe]
})
export class Customers {
    public rowData;

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService,
                public customerModel: CustomerModel) {
    }

    ngOnInit() {
        this.customerModel.query()
            .then((store) => {
                this.rowData = store;
           });
    };

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

    addRow() {
         this.customerModel.addRow(this.gridOptions);
    }

    removeRow() {
        this.customerModel.removeRow(this.gridOptions);
    }

    onFilterChanged(value) {
        this.gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.customerModel.cellValueChanged(value);
    }

}

