import {CustomerModel} from './customer.model';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomerController {
	constructor(public customerModel: CustomerModel) {
    }

    addRow(gridOptions) {
         this.customerModel.addRow(gridOptions);
    }

    removeRow(gridOptions) {
        this.customerModel.removeRow(gridOptions);
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.customerModel.cellValueChanged(value);
    }
}