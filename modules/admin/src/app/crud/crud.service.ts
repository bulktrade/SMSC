import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {RequestGetParameters} from "../orientdb/orientdb.requestGetParameters";
import {LocalStorage} from "angular2-localStorage/WebStorage";
import {Router, ActivatedRoute} from "@angular/router";
import {CrudUpdate} from "./crudUpdate/crud.update";

@Injectable()
export class CrudService {
    @LocalStorage('focusedRow') public focusedRow:any;

    public btnDeleteDisabled = true;
    public currPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public successMessage = '';
    public model: any = {};

	constructor(public databaseService: ODatabaseService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value);
    }

    createRecord(colsValue) {
        let params: RequestGetParameters = {
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

        for (let key in value.data) {
            if (key !== 'rid' && key !== 'version') {
                colsValue.push(value.data[key]);
            }
        }

        let params = {
            "rid": value.data.rid,
            "version": value.data.version,
            "colsValue": value.data
        };

        return this.databaseService.update(params)
            .then((res) => {
                value.data.version++;
                this.successExecute = true;
                this.successMessage = 'orientdb.successUpdate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
    }

    deleteRecord(rowData) {
        return this.databaseService.delete(rowData[this.focusedRow-1].rid)
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

            case 'update':
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

    setCrudName(router) {
        for (let k in router) {
            if (typeof router[k] == "object" && router[k] !== null) {
                if (router[k].path === this.currPath) {
                    this.className = router[k].data['crudClass'];
                    return;
                } else {
                    this.setCrudName(router[k]);
                }
            }
        }
    }

}
