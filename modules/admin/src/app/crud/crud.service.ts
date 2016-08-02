import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { RequestGetParameters } from "../orientdb/orientdb.requestGetParameters";
import { LocalStorage } from "angular2-localstorage/WebStorage";
import { Router, ActivatedRoute } from "@angular/router";
import {Response} from "@angular/http";
import {TranslateService} from "ng2-translate/ng2-translate";
import {CrudModel} from "./crud.model";

@Injectable()
export class CrudService {
    @LocalStorage() public focusedRow:any;

    crudModel = new CrudModel([], []);

    public btnDeleteDisabled = true;
    public addingFormValid = false;
    public gridOptions;
    public isActiveLinkset = null;
    public rowSelectionLinkset = null;
    public linkedClass = null;
    public showLinksetView = false;
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

        if (this.route.data['value'].crudClass) {
            this.className = this.route.data['value'].crudClass;
        } else {
            this.setCrudClass(this.router['config']);
        }

        // init the column definitions
        this.initGridData = new Promise((resolve, reject) => {
            this.getColumnDefs(this.className, true)
                .then((columnDefs) => {
                    this.crudModel.columnDefs = columnDefs;
                })
                .then((res) => {
                    // init the row data
                    this.getStore(this.className)
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
            "nameClass": this.className,
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

        if (event.colDef.type === 'LINKSET' ||
                event.colDef.type === 'LINK') {
            this.linkedClass = event.colDef.linkedClass;
            this.isActiveLinkset = event.colDef.field;
            this.showLinksetView = true;
            this.rowSelectionLinkset = 'multiple';
        }

        switch (event.colDef.field) {
            case 'delete':
                break;

            case 'edit':
                this.router.navigateByUrl(this.currPath + '/edit');
                break;
        }
    }

    chooseLinkset(linksetGridOptions) {
        let focusedRows = linksetGridOptions.api.getSelectedRows();
        let linkSet = '';
        let params;

        for (let item = 0; item < focusedRows.length; item++) {
            linkSet += "" + focusedRows[item].rid + ",";
        }

        linkSet = linkSet.substring(0, linkSet.length - 1);

        if (this.gridOptions) {
            params = this.gridOptions.rowData[this.focusedRow];
            params[this.isActiveLinkset] = linkSet;
            this.updateRecord(params);

            this.gridOptions.rowData[this.focusedRow][this.isActiveLinkset] = linkSet;
            this.gridOptions.api.setRowData(this.gridOptions.rowData);
        } else {
            this.model[this.isActiveLinkset] = linkSet.split(',');
        }
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

    getStore(className) {
        return this.databaseService.query('select from ' + className)
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
        let columnDefs = [];

        columnDefs.push({
            headerName: " ",
            field: "checkboxSel",
            width: 40,
            hideInForm: true,
            checkboxSelection: true
        });

        if (readOnly) {
            columnDefs.push({
                headerName: " ",
                field: "edit",
                width: 66,
                cellRenderer: (params) => {
                    return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                        "border-radius: 3px;' disabled>Update</button>";
                },
                hideInForm: true
            });
            columnDefs.push({
                headerName: " ",
                field: "delete",
                width: 61,
                cellRenderer: (params) => {
                    return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                        "border-radius: 3px;'>Delete</button>";
                },
                hideInForm: true
            });
        }

        return this.databaseService.getInfoClass(className)
            .then((res: Response) => {
                res.json().properties.forEach((item) => {
                    columnDefs.push({
                        headerName: this.translate.get(item.name.toUpperCase())['value'],
                        field: item.name,
                        editable: !item.readonly,
                        required: item.mandatory,
                        type: item.type,
                        linkedClass: item.linkedClass
                    })
                });

                return columnDefs;
            })
    }

}
