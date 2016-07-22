import {ODatabaseService} from '../orientdb/orientdb.service';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {CustomerModel} from './customers.model';
import {RequestGetParameters} from "../orientdb/orientdb.requestGetParameters";

@Injectable()
export class CustomerService {
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
                public customerModel?: CustomerModel) {
    }

    addRow(gridOptions, params) {
        gridOptions.rowData.push(this.createRecord(params).colsValue);
        gridOptions.api.setRowData(gridOptions.rowData);
    }

    removeRow(gridOptions) {
        let selected = gridOptions.api.getFocusedCell();

        this.deleteRecord(gridOptions);

        gridOptions.rowData.splice(selected.rowIndex, 1);
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
        return this.databaSeservice.update({
            "rid": value.data.rid,
            "version": value.data.version,
            "colsValue": value.data
        })
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
        let selected = gridOptions.api.getFocusedCell();

        return this.databaSeservice.delete(gridOptions.rowData[selected.rowIndex].rid)
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

    chooseUsers(ridUsers, gridOptions, customerService) {
        let selected = gridOptions.api.getFocusedCell();
        let linkSet = '[';
        let params = {};

        for (let item = 0; item < ridUsers.length; item++) {
            linkSet += "" + ridUsers[item].rid + ",";
        }

        linkSet = linkSet.substring(0, linkSet.length - 1) + ']';

        params['data'] = gridOptions.rowData[selected.rowIndex];
        params['data'].users = linkSet;

        customerService.updateRecord(params);
        gridOptions.rowData[selected.rowIndex] = params['data'];

        gridOptions.api.setRowData(gridOptions.rowData);
    }
}
