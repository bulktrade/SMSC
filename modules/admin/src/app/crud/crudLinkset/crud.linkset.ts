import { Component, ViewEncapsulation, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudModel } from "../crud.model";
import { LoadingGrid } from "../../common/loadingGrid";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'crud-linkset',
    template: require('./crud.linkset.html'),
    styleUrls: [
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-material.css')
    ],
    styles: [
        require('./crud.linkset.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        AgGridNg2,
        LoadingGrid,
        AlertComponent
    ],
    pipes: [ TranslatePipe ]
})

export class CrudLinkset {
    public crudModel = new CrudModel([], []);
    public className;

    constructor(public translate:TranslateService,
                public router:Router,
                public crudService:CrudService,
                public route:ActivatedRoute) {
    }

    ngOnInit() {
        this.className = this.crudService.linkedClass;

        // init the column definitions
        this.crudService.initGridData = new Promise((resolve, reject) => {
            this.crudService.getColumnDefs(this.className, false)
                .then((columnDefs) => {
                    this.crudModel.columnDefs = columnDefs['grid'];
                    this.gridOptions.columnDefs = columnDefs['grid'];
                    this.crudService.addCheckboxSelection(this.crudModel.columnDefs, this.gridOptions);
                }, (error) => {
                    this.crudService.dataNotFound = true;
                    this.crudService.errorMessage = 'orientdb.dataNotFound';
                })
                .then((res) => {
                    // init the row data
                    this.crudService.getStore(this.className)
                        .then((store) => {
                            this.gridOptions.rowData = store;
                            this.crudModel.rowData = store;
                            resolve();
                        }, (error) => {
                            this.crudService.dataNotFound = true;
                            this.crudService.errorMessage = 'orientdb.dataNotFound';
                        });
                })
        });
    }

    gridOptions:GridOptions = {
        columnDefs: this.crudModel.columnDefs,
        rowData: this.crudModel.rowData,
        rowSelection: 'multiple',
        rowHeight: 50
    };
}
