import { Injectable } from "@angular/core";
import { URIColumn } from "../customers/model/uri-column";
const clone = require("js.clone");

@Injectable()
export class URIHandlingService {

    constructor() {
    }

    parseUriProps(uriColumns: URIColumn[], rowData: any[]) {
        let _rowData = clone(rowData);

        uriColumns.forEach(uriColumn => {

            _rowData.forEach(row => {

                let uriRow = row[uriColumn.name];

                if (uriRow) {
                    if (Array.isArray(uriRow)) {
                        row[uriColumn.name].forEach((item, i, arr) => {
                            arr[i] = item[uriColumn.columnsTitle || 'id'] || item['id'];
                        });
                    } else {
                        row[uriColumn.name] = uriRow[uriColumn.columnsTitle || 'id'] || uriRow['id'];
                    }
                }

            });


        });

        return _rowData;
    }

}
