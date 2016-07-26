import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ODatabaseService} from '../orientdb/orientdb.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {GridOptions} from 'ag-grid/main';
import {CustomerModel} from '../crud/crud.model';

@Injectable()
export class CustomerUsers {
	public rowData;
    public dataNotFound = false;
    public errorMessage = '';

    constructor(public translate: TranslateService,
    			public databaseService: ODatabaseService,
    			public customerModel: CustomerModel) {
    	this.initData();
    }

    initData() {
    	let nameClass = 'OUser';

    	this.databaseService.query('select from ' + nameClass)
            .then((res: Response) => {
                let data = res.json();

                return this.customerModel.getStore(data['result'], nameClass);
            }).then((store) => {
                this.rowData = store;
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotFound';
            });

    }

    columnDefs = [
        { headerName: this.translate.get('NAME')['value'],
            field: "name", editable: false },
        { headerName: this.translate.get('PASSWORD')['value'],
            field: "password", editable: false }
    ];

    gridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'multiple',
        singleClickEdit: true
    }

}
