<<<<<<< Updated upstream
import {Injectable, Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {CustomerService} from "./customers.service";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid/main";
import {MdCard, MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {CORE_DIRECTIVES} from "@angular/common";
import {AlertComponent} from "ng2-bootstrap/ng2-bootstrap";
import {MdButton} from "@angular2-material/button/button";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input/input";
import {MdToolbar} from "@angular2-material/toolbar/toolbar";
import {FORM_DIRECTIVES} from "@angular/forms";
import {MdSlideToggle} from "@angular2-material/slide-toggle/slide-toggle";
import {MdIcon} from "@angular2-material/icon/icon";
import {CustomerModel} from "./customers.model";
=======
import {Injectable} from '@angular/core';
import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from './customers.service';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import {MdCard, MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {MdButton} from '@angular2-material/button/button';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MdSlideToggle} from '@angular2-material/slide-toggle/slide-toggle';
import {MdIcon} from '@angular2-material/icon/icon';
import {CustomerModel} from './customers.model';
import {CustomerUsers} from './customers.users';
>>>>>>> Stashed changes

require('./customers.crud.scss');

@Component({
    selector: 'customers-crud',
    template: require('./customers.crud.html'),
    styleUrls: [],
    providers: [CustomerService, CustomerModel, CustomerUsers],
    directives: [
        AgGridNg2,
        MdCard,
        CORE_DIRECTIVES,
        AlertComponent,
        MdButton,
        MD_INPUT_DIRECTIVES,
        MdToolbar,
        FORM_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdSlideToggle,
        MdIcon
    ],
    pipes: [TranslatePipe]
})

@Injectable()
export class CustomersCrud {
    public rowData;
<<<<<<< Updated upstream
    public showGrid:boolean = false;
    public showForm:boolean = true;
    public showDeleteMsg:boolean = true;
    public model:any = {};

    constructor(public translate:TranslateService,
                public customerService:CustomerService) {
=======
    public model: any = {};
    public switcher = {
        showCustomersGrid: false,
        showUsersGrid: true,
        showForm: true,
        showDeleteMsg: true,
    };

    constructor(public translate: TranslateService,
                public customerService: CustomerService,
                public customerUsers: CustomerUsers) {
>>>>>>> Stashed changes
    }

    ngOnInit() {
        this.customerService.getCustomers()
            .then((store) => {
                this.rowData = store;
            });
    }

    columnDefs = [
<<<<<<< Updated upstream
        {
            headerName: this.translate.get('CUSTOMERID')['value'],
            field: "customerId", editable: false
        },
        {
            headerName: this.translate.get('COMPANYNAME')['value'],
            field: "companyName", editable: true
        },
        {
            headerName: this.translate.get('CONTACTS')['value'],
            field: "contacts", editable: true
        },
        {
            headerName: this.translate.get('STREET')['value'],
            field: "street", editable: true
        },
        {
            headerName: this.translate.get('STREET2')['value'],
            field: "street2", editable: true
        },
        {
            headerName: this.translate.get('POSTCODE')['value'],
            field: "postcode", editable: true
        },
        {
            headerName: this.translate.get('COUNTRY')['value'],
            field: "country", editable: true
        },
        {
            headerName: this.translate.get('CITY')['value'],
            field: "city", editable: true
        },
        {
            headerName: this.translate.get('VATID')['value'],
            field: "vatid", editable: true
        },
        {
            headerName: this.translate.get('USERS')['value'],
            field: "users", editable: true
        },
        {
            headerName: this.translate.get('PARENTCUSTOMER')['value'],
            field: "parentCustomer", editable: true
        }
=======
        { headerName: this.translate.get('CUSTOMERID')['value'],
            field: "customerId", editable: false },
        { headerName: this.translate.get('COMPANYNAME')['value'],
            field: "companyName", editable: true },
        { headerName: this.translate.get('CONTACTS')['value'],
            field: "contacts", editable: true },
        { headerName: this.translate.get('STREET')['value'],
            field: "street", editable: true },
        { headerName: this.translate.get('STREET2')['value'],
            field: "street2", editable: true },
        { headerName: this.translate.get('POSTCODE')['value'],
            field: "postcode", editable: true },
        { headerName: this.translate.get('COUNTRY')['value'],
            field: "country", editable: true },
        { headerName: this.translate.get('CITY')['value'],
            field: "city", editable: true },
        { headerName: this.translate.get('VATID')['value'],
            field: "vatid", editable: true },
        { headerName: this.translate.get('USERS')['value'],
            field: "users", editable: false },
        { headerName: this.translate.get('PARENTCUSTOMER')['value'],
            field: "parentCustomer", editable: true }
>>>>>>> Stashed changes
    ];

    gridOptions:GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

    goTo(key) {
        for (let item in this.switcher) {
            this.switcher[item] = true;
        }

        this.switcher[key] = false;
    }

    cellClicked(event) {
        if (event.colDef.field === 'users') {
            this.goTo('showUsersGrid');
        }
    }

    chooseUsers(ridUsers) {
        let selected = this.gridOptions.api.getFocusedCell();
        let linkSet = '[';
        let params = {};

        for (let item = 0; item < ridUsers.length; item++) {
            linkSet += "'" + ridUsers[item].rid + "',";
        }

        linkSet = linkSet.substring(0, linkSet.length - 1) + ']';

        params['data'] = this.gridOptions.rowData[selected.rowIndex];
        params['data'].users = linkSet;

        this.customerService.updateRecord(params);
    }
}
