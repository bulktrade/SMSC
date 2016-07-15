import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from './customers.service';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
import {CustomersCrud} from './customers.crud';

import {MdCard, MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {MdButton} from '@angular2-material/button/button';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MdSlideToggle} from '@angular2-material/slide-toggle/slide-toggle';
import {MdIcon} from '@angular2-material/icon/icon';

//noinspection TypeScriptUnresolvedVariable
@Component({
    selector: 'customers-edit-grid',
    template: require('./customers.edit.html'),
    styleUrls: [],
    providers: [CustomerService, CustomersCrud],
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
        MdIcon,
    ],
    pipes : [TranslatePipe]
})

export class CustomersEditing {
    public rowData;

    constructor(public translate: TranslateService,
                public customerService: CustomerService) {
    }

    ngOnInit() {
        this.customerService.query()
            .then((store) => {
                this.rowData = store;
            });
    }

    columnDefs = [
        { headerName: this.translate.get('CUSTOMERID')['value'],
            field: "customer_id", editable: true },
        { headerName: this.translate.get('COMPANYNAME')['value'],
            field: "company_name", editable: true },
        { headerName: this.translate.get('CONTACTS')['value'],
            field: "contacts", editable: true },
    ];

    gridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

}
