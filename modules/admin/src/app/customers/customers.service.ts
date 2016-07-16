import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {CustomersCrud} from './customers.crud';

@Injectable()
export class CustomerService {
	constructor(public databaSeservice: ODatabaseService,
                public customersCrud: CustomersCrud) {
    }

    addRow(gridOptions, params) {
        this.customersCrud.createRecord(params)
        gridOptions.rowData.push(this.customersCrud.createRecord(params).colsValue);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    removeRow(gridOptions) {
        if(gridOptions.rowData.length > 1) {
            let selected = gridOptions.api.getFocusedCell();

            this.customersCrud.deleteRecord(gridOptions);

            gridOptions.rowData.splice(selected.rowIndex, 1);
            gridOptions.api.setRowData(gridOptions.rowData);
        }
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.customersCrud.updateRecord(value);
    }

    query() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let store = [];
                let data = res.json();
                for (let i = 0; i < data['result'].length; i++) {
                    store.push({
                        customerId: data['result'][i].customer_id,
                        companyName: data['result'][i].company_name,
                        contacts: data['result'][i].contacts,
                    });
                }
                return store;
            });
    }
}
