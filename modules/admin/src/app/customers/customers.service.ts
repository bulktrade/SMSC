import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {CustomerModel} from './customers.model';
import {RequestGetParameters} from "../orientdb/orientdb.requestGetParameters";

@Injectable()
export class CustomerService {
	constructor(public databaSeservice?: ODatabaseService,
                public customerModel?: CustomerModel) {
    }

    addRow(gridOptions, params) {
        gridOptions.rowData.push(this.createRecord(params).colsValue);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    removeRow(gridOptions) {
        if(gridOptions.rowData.length > 1) {
            let selected = gridOptions.api.getFocusedCell();

            this.deleteRecord(gridOptions);

            gridOptions.rowData.splice(selected.rowIndex, 1);
            gridOptions.api.setRowData(gridOptions.rowData);
        }
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value);
    }

    getCustomers() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let data = res.json();

                return this.customerModel.getStore(data['result'], 'customer');
            });
    }

    createRecord(colsValue) {
        let params: RequestGetParameters = {
            "nameClass": "customer",
            "colsValue": colsValue
        };

        this.databaSeservice.insert(params);
        return params;
    }

    updateRecord(value) {
        this.databaSeservice.update({
            "rid": value.data.rid,
            "version": value.data.version,
            "colsValue": value.data
        });
    }

    deleteRecord(gridOptions) {
        let selected = gridOptions.api.getFocusedCell();

        return this.databaSeservice.getRowMetadata({
            "nameClass": "customer",
            "colsValue": {
                "customerId": gridOptions.rowData[selected.rowIndex].customerId
            }})
            .then((data) => {
                this.databaSeservice.delete(data['@rid']);
            });
    }
}
