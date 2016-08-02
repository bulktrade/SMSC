import { Component, ViewEncapsulation } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    encapsulation: ViewEncapsulation.Native,
    styleUrls: [
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-material.css')
    ],
    styles: [
        require('./crud.view.scss')
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
        this.crudService.gridOptions = this.gridOptions;
    }

    gridOptions:GridOptions = {
        columnDefs: this.crudService.crudModel.columnDefs,
        rowData: this.crudService.crudModel.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

}
