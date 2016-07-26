import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {CustomerModel} from '../crud/crud.model';
import {RequestGetParameters} from "../orientdb/orientdb.requestGetParameters";
import {LocalStorage} from "angular2-localStorage/WebStorage";
import {Router} from "@angular/router";

@Injectable()
export class CustomerService {
    @LocalStorage('focusedRow') public focusedRow:any;

    public btnDeleteDisabled = true;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public successMessage = '';
    public switcher = {
        showCustomersGrid: false,
        showUsersGrid: true,
        showForm: true,
        showDeleteMsg: true,
    };

	constructor(public databaSeservice?: ODatabaseService,
                public customerModel?: CustomerModel,
                public router?: Router) {
    }

    addRow(gridOptions, params) {
        gridOptions.rowData.push(this.createRecord(params).colsValue);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    removeRow(gridOptions) {
        this.deleteRecord(gridOptions);
        gridOptions.rowData.splice(this.focusedRow, 1);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value);
    }

    getCustomers() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let data = res.json();

                return this.customerModel.getStore(data['result'], 'customer');
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotFound';
            });
    }

    createRecord(colsValue) {
        let params: RequestGetParameters = {
            "nameClass": "customer",
            "colsValue": colsValue
        };

        this.databaSeservice.insert(params)
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

        return this.databaSeservice.update(params)
            .then((res) => {
                value.data.version++;
                this.successExecute = true;
                this.successMessage = 'orientdb.successUpdate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
    }

    deleteRecord(gridOptions) {
        return this.databaSeservice.delete(gridOptions.rowData[this.focusedRow].rid)
            .then((res) => {
                this.successExecute = true;
                this.successMessage = 'orientdb.successDelete';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotFound';
            });
    }

    goTo(key) {
        for (let item in this.switcher) {
            this.switcher[item] = true;
        }

        this.switcher[key] = false;
    }

    redirectTo(event) {
        let param = event;
        this.btnDeleteDisabled = false;

        if (param.hasOwnProperty('colDef')) {
            param = event.colDef.field;
            this.focusedRow = event.rowIndex;
        }

        switch (param) {
            case 'users':
                this.goTo('showUsersGrid');
                break;

            case 'delete':
                this.goTo('showDeleteMsg');
                break;

            case 'create':
                this.goTo('showForm');
                break;

            default:
                this.goTo('showCustomersGrid');
                break;
        }
    }

    clickOnCell(path) {
        switch (path.colDef.field) {
            case 'users':
                this.router.navigateByUrl('customers/users');
                break;

            case 'delete':
                this.goTo('showDeleteMsg');
                break;

            case 'create':
                this.goTo('showForm');
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
}
