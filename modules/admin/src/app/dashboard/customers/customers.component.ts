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
        let params = {
            "customer_id": "1",
            "company_name": "SMSC",
        };

        this.customerModel.insert(params);
        this.gridOptions.rowData.push(params);
        this.gridOptions.api.setRowData(this.gridOptions.rowData);
    }

    removeRow() {
        if(this.gridOptions.rowData.length > 1) {
            let selected = this.gridOptions.api.getFocusedCell();

            this.customerModel.getRowMetadata({
                "customer_id": this.gridOptions.rowData[selected.rowIndex].customer_id,
                "company_name": this.gridOptions.rowData[selected.rowIndex].company_name,
            }).then((data) => {
                this.customerModel.delete(data['@rid']);
            });

            this.gridOptions.rowData.splice(selected.rowIndex, 1);
            this.gridOptions.api.setRowData(this.gridOptions.rowData);
        }
    }

    onFilterChanged(value) {
        this.gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.customerModel.getRowMetadata({
                "customer_id": value.data.customer_id,
                "company_name": value.oldValue
            }).then((data) => {
                this.customerModel.update({
                    "rid": data['@rid'],
                    "version": data['@version'],
                    "customer_id": value.data.customer_id,
                    "company_name": value.newValue
                });
            });
    }

}

