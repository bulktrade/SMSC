import {Component} from '@angular/core';
import {Response} from '@angular/http';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';
import {ODatabaseService} from '../../orientdb/orientdb.service';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

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
        { headerName: "Customer ID", field: "customer_id" },
        { headerName: "Company Name", field: "company_name" }
    ];

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
    }

    query() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let store = [];
                let data = res.json();
                for (let i = 0; i < data['result'].length; i++) {
                    store.push({customer_id: data['result'][i].customer_id,
                        company_name: data['result'][i].company_name});
                }
                return store;
            });
    }

}

