import {Injectable, Component} from '@angular/core';
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
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'customers-crud',
    template: require('./customers.crud.html'),
    styleUrls: [
        require('./customers.crud.scss')
    ],
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
    public model: any = {};

    constructor(public translate: TranslateService,
                public customerService: CustomerService,
                public customerUsers: CustomerUsers,
                public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        this.customerService.getCustomers()
            .then((store) => {
                this.rowData = store;
            });

        // redirect depending on params
        this.route
            .params
            .subscribe(params => {
                this.customerService.redirectTo(params['action']);
            });
    }

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
        },
        { headerName: this.translate.get('CUSTOMERID')['value'],
            field: "customerId", editable: false, hideInForm: true },
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
    ];

    gridOptions:GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }
}
