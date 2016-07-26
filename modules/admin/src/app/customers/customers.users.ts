import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ODatabaseService} from '../orientdb/orientdb.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {GridOptions} from 'ag-grid/main';
import {CrudModel} from '../crud/crud.model';

@Injectable()
export class CustomerUsers {
    public nameClass = 'OUser';
	public rowData;
	public columnDefs;
    public dataNotFound = false;
    public errorMessage = '';

    constructor(public translate: TranslateService,
    			public databaseService: ODatabaseService,
    			public customerModel: CrudModel) {
    	this.initData();
    }

    initData() {
        // init the column definitions
        this.customerModel.getColumnDefs(this.nameClass, false)
            .then((columnDefs) => {
                this.columnDefs = columnDefs;
            })
            .then((res) => {
                // init the row data
                this.customerModel.getStore(this.nameClass)
                    .then((store) => {
                        this.rowData = store;
                    });
            });

    }

    gridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'multiple',
        singleClickEdit: true
    }

}
