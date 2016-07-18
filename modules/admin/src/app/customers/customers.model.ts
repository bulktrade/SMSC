import {Injectable} from '@angular/core';

@Injectable()
export class CustomerModel {

    public customer = [
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

    public ouser = [
        'name',
        'password'
    ];

    constructor() {
    }

    getStore(result, nameClass) {
        let res = [];
        let colsName = this[nameClass.toLowerCase()];

        result.forEach((item) => {
            let row = '{';
            colsName.forEach((cols) => {
                row += '"' + cols + '": "' + item[cols] + '", ';
            });

            row += '"rid": "' + item['@rid'] + '", ';
            row += '"version": "' + item['@version'] + '", ';
            row = row.substring(0, row.length - 2) + '}';

            res.push(JSON.parse(row));
        });

        return res;
    }
}
