import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { RequestGetParameters } from "../orientdb/orientdb.requestGetParameters";
import { LocalStorage } from "angular2-localStorage/WebStorage";
import { Router, ActivatedRoute } from "@angular/router";
import {Response} from "@angular/http";
import {TranslateService} from "ng2-translate/ng2-translate";
import {CrudModel} from "./crud.model";

@Injectable()
export class CrudService {
    @LocalStorage('focusedRow') public focusedRow:any;

    crudModel = new CrudModel([], []);

    public btnDeleteDisabled = true;
    public initGridData: Promise<any>;
    public currPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public successMessage = '';
    public model:any = {};

    constructor(public databaseService:ODatabaseService,
                public router:Router,
                public route:ActivatedRoute,
                public translate: TranslateService) {
        this.currPath = this.route.snapshot['_urlSegment'].pathsWithParams[0].path;
        this.setCrudClass(this.router['config']);

        // init the column definitions
        this.initGridData = new Promise((resolve, reject) => {
            this.getColumnDefs(true)
                .then((columnDefs) => {
                    this.crudModel.columnDefs = columnDefs;
                })
                .then((res) => {
                    // init the row data
                    this.getStore()
                        .then((store) => {
                            this.crudModel.rowData = store;
                            resolve(this.crudModel.rowData);
                        }, (error) => {
                            this.dataNotFound = true;
                            this.errorMessage = 'orientdb.dataNotFound';
                        });
                });
        });
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value.data);
    }

    createRecord(colsValue) {
        let params:RequestGetParameters = {
            "nameClass": "customer",
            "colsValue": colsValue
        };

        this.databaseService.insert(params)
            .then((res) => {
                this.successExecute = true;
                this.successMessage = 'orientdb.successCreate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
        return params;
    }

    updateRecord(value) {
        let colsValue = [];

        for (let key in value) {
            if (key !== 'rid' && key !== 'version') {
                colsValue.push(value[key]);
            }
        }

        let params = {
            "rid": value.rid,
            "version": value.version,
            "colsValue": value
        };

        return this.databaseService.update(params)
            .then((res) => {
                value.version++;
                this.successExecute = true;
                this.successMessage = 'orientdb.successUpdate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
    }

    deleteRecord(rowData) {
        return this.databaseService.delete(rowData[this.focusedRow].rid)
            .then((res) => {
                this.successExecute = true;
                this.successMessage = 'orientdb.successDelete';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotFound';
            });
    }

    clickOnCell(event) {
        this.btnDeleteDisabled = false;
        this.focusedRow = event.rowIndex;

        switch (event.colDef.field) {
            case 'users':
                this.router.navigateByUrl('customers/users');
                break;

            case 'delete':
                break;

            case 'edit':
                this.router.navigateByUrl(this.currPath + '/edit');
                break;
        }
    }

    chooseUsers(ridUsers, gridOptions, customerService) {
        let linkSet = '';
        let params = {};

        for (let item = 0; item < ridUsers.length; item++) {
            linkSet += "" + ridUsers[item].rid + ",";
        }

        linkSet = linkSet.substring(0, linkSet.length - 1);

        params['data'] = gridOptions.rowData[this.focusedRow];
        params['data'].users = linkSet;

        customerService.updateRecord(params);
        gridOptions.rowData[this.focusedRow] = params['data'];

        gridOptions.api.setRowData(gridOptions.rowData);
    }

    setCrudClass(router) {
        for (let k in router) {
            if (typeof router[k] == "object" && router[k] !== null) {
                if (router[k].path === this.currPath) {
                    this.className = router[k].data['crudClass'];
                    return;
                } else {
                    this.setCrudClass(router[k]);
                }
            }
        }
    }

    getStore() {
        return this.databaseService.query('select from ' + this.className)
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

    getColumnDefs(readOnly) {
        let columnDefs = [];

        if (readOnly) {
            columnDefs = [
                {
                    headerName: " ",
                    field: "edit",
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

        return this.databaseService.getInfoClass(this.className)
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
