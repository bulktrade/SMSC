import {Injectable} from '@angular/core';
import {ODatabaseService} from '../orientdb/orientdb.service';
import {Response} from "@angular/http";
import {TranslateService} from "ng2-translate/ng2-translate";

@Injectable()
export class CrudModel {
    public className = null;

    constructor(public databaseService: ODatabaseService,
                public translate: TranslateService) {
    }

    getStore(nameClass) {
        return this.databaseService.query('select from ' + nameClass)
            .then((res: Response) => {
                let result = res.json()['result'];

                result.forEach((item) => {
                    item['rid'] = item['@rid'];
                    item['version'] = item['@version'];

                    delete item['@rid'];
                    delete item['@version'];
                    delete item['@fieldTypes'];
                    delete item['@class'];
                    delete item['@type'];
                });

                return result;
        })
    }

    getColumnDefs(className, readOnly) {
        this.className = className;
        let columnDefs = [];

        if (readOnly) {
            columnDefs = [
                {
                    headerName: " ",
                    field: "update",
                    width: 66,
                    cellRenderer: (params) => {
                        return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                            "border-radius: 3px;' disabled>Update</button>";
                    },
                    hideInForm: true
                },
                {
                    headerName: " ",
                    field: "delete",
                    width: 61,
                    cellRenderer: (params) => {
                        return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                            "border-radius: 3px;'>Delete</button>";
                    },
                    hideInForm: true
                }
            ];
        }

        return this.databaseService.getInfoClass(className)
            .then((res: Response) => {
                res.json().properties.forEach((item) => {
                    columnDefs.push({
                        headerName: this.translate.get(item.name.toUpperCase())['value'],
                        field: item.name,
                        editable: !item.readonly,
                        required: item.mandatory
                    })
                })

                return columnDefs;
            })
    }
}
