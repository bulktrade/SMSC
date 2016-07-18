import {Injectable} from '@angular/core';

@Injectable()
export class CustomerModel {

    public colsName = [
        'customerId',
        'companyName',
        'street',
        'street2',
        'postcode',
        'country',
        'city',
        'vatid',
        'contacts',
        'users',
        'parentCustomer'
    ];

    constructor() {
    }

    getStore(result) {
        let res = [];

        result.forEach((item) => {
            let row = '{';
            this.colsName.forEach((cols) => {
                row += '"' + cols + '": "' + item[cols] + '", ';
            });
            row = row.substring(0, row.length - 2) + '}';

            res.push(JSON.parse(row));
        });

        return res;
    }
}
