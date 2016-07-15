import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {RequestGetParameters} from "../orientdb/orientdb.requestGetParameters";

@Injectable()
export class CustomersCrud {
    constructor(public databaSeservice: ODatabaseService) {
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
        return this.databaSeservice.getRowMetadata({
                "nameClass": "customer",
                "colsValue": {
                    "customer_id": value.data.customer_id,
                    "company_name": value.oldValue
                }
            }).then((data) => {
                this.databaSeservice.update({
                    "rid": data['@rid'],
                    "version": data['@version'],
                    "colsValue": {
                        "customer_id": value.data.customer_id,
                        "company_name": value.newValue
                    }
                });
            });
    }

    deleteRecord(gridOptions) {
        let selected = gridOptions.api.getFocusedCell();
        
         return this.databaSeservice.getRowMetadata({
                "nameClass": "customer",
                "colsValue": {
                    "customer_id": gridOptions.rowData[selected.rowIndex].customerId,
                    "company_name": gridOptions.rowData[selected.rowIndex].companyName
                }})
                    .then((data) => {
                        this.databaSeservice.delete(data['@rid']);
                     });
    }
}
