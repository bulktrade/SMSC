import { Injectable } from "@angular/core";

@Injectable()
export class CustomersViewService {

    constructor() {
    }

    /**
     * Gets parsed URI properties
     *
     * @example
     * let rowData = [
     *    {id: 1, username: 'admin'},
     *    {id: 2, username: 'user'}
     * ];
     * getParsedURI(rowData, 'username'); // 'admin, user'
     *
     * @param rowData
     * @param titleColumns
     * @returns {string}
     */
    getParsedURI(rowData: any[], titleColumns: string) {
        let _rowData: string = '';

        rowData.forEach((item, i, arr) => {
            if (item) {
                _rowData += item[titleColumns] || item['id'];
            }

            if (i !== arr.length - 1) {
                _rowData += ', ';
            }

        });

        return _rowData;
    }
}
