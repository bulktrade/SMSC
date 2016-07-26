import {Injectable, Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from '../customers/customers.service';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';

import {MdCard, MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {MdButton, MdAnchor} from '@angular2-material/button/button';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MdSlideToggle} from '@angular2-material/slide-toggle/slide-toggle';
import {MdIcon} from '@angular2-material/icon/icon';
import {CrudModel} from './crud.model';
import {CustomerUsers} from '../customers/customers.users';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'customers-crud',
    template: require('./crud.html'),
    styleUrls: [
        require('./crud.scss')
    ],
    providers: [CustomerService, CrudModel, CustomerUsers],
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
        MdAnchor
    ],
    pipes: [TranslatePipe]
})

@Injectable()
export class CustomersCrud {
    public rowData;
    public columnDefs;
    public model: any = {};

    constructor(public translate: TranslateService,
                public customerService: CustomerService,
                public customerUsers: CustomerUsers,
                public CrudModel: CrudModel,
                public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        // init the column definitions
        this.CrudModel.getColumnDefs('customer', true)
            .then((columnDefs) => {
                this.columnDefs = columnDefs;
            })
            .then((res) => {
                // init the row data
                this.CrudModel.getStore('customer')
                    .then((store) => {
                        this.rowData = store;
                    });
            });

        // redirect depending on params
        this.route
            .params
            .subscribe(params => {
                if (params['action']) {
                    this.customerService.redirectTo(params['action']);
                }
            });
    }

    gridOptions:GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }
}
