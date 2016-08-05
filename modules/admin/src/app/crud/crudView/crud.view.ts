import { Component, ViewEncapsulation } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import {MdCheckbox} from "@angular2-material/checkbox/checkbox";
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    encapsulation: ViewEncapsulation.Native,
    styles: [
        require('./crud.view.scss'),
        require('../common/style.scss')
    ],
    providers: [CrudService],
    directives: [
        AgGridNg2,
        CrudLinkset,
        AlertComponent
    ],
    pipes: [TranslatePipe]
})

export class CrudView {
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.getColumnDefs(this.crudService.className, true)
            .then((columnDefs) => {
                this.crudService.crudModel.columnDefs = columnDefs;
                this.gridOptions.columnDefs = columnDefs;
                this.crudService.addCheckboxSelection(columnDefs, this.gridOptions);
            })
            .then((res) => {
                // init the row data
                this.crudService.getStore(this.crudService.className)
                    .then((store) => {
                        this.gridOptions.rowData = store;
                        this.crudService.crudModel.rowData = store;
                        this.crudService.gridOptions = this.gridOptions;
                    }, (error) => {
                        this.crudService.dataNotFound = true;
                        this.crudService.errorMessage = 'orientdb.dataNotFound';
                    });
            });
    }

    gridOptions:GridOptions = {
        rowSelection: 'multiple',
        singleClickEdit: true,
        rowHeight: 30
    }

}
