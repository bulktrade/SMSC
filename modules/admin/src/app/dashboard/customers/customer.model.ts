import {ODatabaseService} from '../../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

declare var sprintf: any;

@Injectable()
export class CustomerModel {
    constructor(public databaSeservice: ODatabaseService) {
    }

    addRow(gridOptions) {
        let params = {
            "customer_id": "1",
            "company_name": "SMSC",
        };

        this.databaSeservice.insert({
            "class": "customer",
            "customer_id": "1",
            "company_name": "SMSC",
        });
        gridOptions.rowData.push(params);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    removeRow(gridOptions) {
        if(gridOptions.rowData.length > 1) {
            let selected = gridOptions.api.getFocusedCell();

            this.databaSeservice.getRowMetadata({
            	"class": "customer",
                "customer_id": gridOptions.rowData[selected.rowIndex].customer_id,
                "company_name": gridOptions.rowData[selected.rowIndex].company_name,
            }).then((data) => {
                this.databaSeservice.delete(data['@rid']);
            });

            gridOptions.rowData.splice(selected.rowIndex, 1);
            gridOptions.api.setRowData(gridOptions.rowData);
        }
    }

    cellValueChanged(value) {
        this.databaSeservice.getRowMetadata({
        		"class": "customer",
                "customer_id": value.data.customer_id,
                "company_name": value.oldValue
            }).then((data) => {
                this.databaSeservice.update({
                    "rid": data['@rid'],
                    "version": data['@version'],
                    "customer_id": value.data.customer_id,
                    "company_name": value.newValue
                });
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
}
