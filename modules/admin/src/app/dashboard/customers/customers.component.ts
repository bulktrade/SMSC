import {Component} from '@angular/core';
import {Response} from '@angular/http';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';
import {ODatabaseService} from '../../orientdb/orientdb.service';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

declare var sprintf: any;

require('./customers.scss');

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService, AgGridNg2],
    pipes : [TranslatePipe]
})
export class Customers {
    public rowData;
    public selectedRowIndex: number;

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService,
                public databaSeservice: ODatabaseService) {
    }

    ngOnInit() {
        this.query()
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
        singleClickEdit: true,
        onCellClicked: (event) => {
            this.selectedRowIndex = event.rowIndex;
        }
    }

    addRow() {
        this.insert()
            .then((data) => {
                this.rowData.push({
                    customer_id: data.customer_id,
                    company_name: data.company_name
                }); 
                this.gridOptions.api.setRowData(this.rowData);
                this.gridOptions.api.refreshView();
            });
        
    }

    removeRow() {
        if(this.rowData.length > 1) {
            this.delete(this.rowData[this.selectedRowIndex].customer_id,
                this.rowData[this.selectedRowIndex].company_name);

            this.rowData.splice(this.selectedRowIndex, 1);
            this.gridOptions.api.setRowData(this.rowData);
            this.gridOptions.api.refreshView();
        }
    }

    onFilterChanged(value) {
        this.gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.update(value.data.customer_id, value.oldValue,
                        value.newValue);
    }

    update(originId, originName, dataName) {
        this.databaSeservice.query(
        sprintf('select from customer where customer_id = \'%s\' and company_name = \'%s\'',
            originId, originName))
            .then((res: Response) => {
                let data = res.json();
                let rid = data['result'][0]['@rid'],
                    version = data['result'][0]['@version'],
                    str = sprintf('{ "transaction" : true, "operations" : ' +
                        '[ { "type" : "u", "record" : ' +
                        '{ "@rid" : "%s", "@version": %s, ' +
                        '"customer_id": "%s", "company_name": "%s" } } ] }',
                        rid, version, originId, dataName);

                this.databaSeservice.batchRequest(str);
            });
    }

    query() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let store = [];
                let data = res.json();
                for (let i = 0; i < data['result'].length; i++) {
                    store.push({
                        customer_id: data['result'][i].customer_id,
                        company_name: data['result'][i].company_name,
                        contacts: data['result'][i].contacts,
                    });
                }
                return store;
            });
    }

    insert() {
        return this.databaSeservice.query('SELECT max(customer_id) FROM customer')
            .then((res: Response) => {
                let nextId = 1;
                let data = res.json();

                if (data['result'].length) {
                    nextId = Number(data['result'][0].max) + 1;
                }

                let str = sprintf('{ "transaction" : true, "operations" : ' +
                    '[ { "type" : "c", "record" : ' +
                    '{ "@class" : "customer", "customer_id" : "%s",' +
                    '"company_name" : "%s" } } ] }', nextId, 'test');

                this.databaSeservice.batchRequest(str);

                return {customer_id: nextId, company_name: 'test'};
            });
    }

    delete(id, name) {
        this.databaSeservice.query(
            sprintf('select from customer where customer_id = "%s" and company_name = "%s"',
                id, name))
            .then((res: Response) => {
                let data = res.json();
                let rid = data['result'][0]['@rid'],
                    str = sprintf('{ "transaction" : true, "operations" : ' +
                        '[ { "type" : "d", "record" : ' +
                        '{ "@rid" : "%s" } } ] }', rid);

                this.databaSeservice.batchRequest(str);
            });
    }

}

