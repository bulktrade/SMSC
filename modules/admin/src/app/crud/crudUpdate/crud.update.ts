import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudModel } from "../crud.model";

@Component({
    selector: 'crud-update',
    template: require('./crud.update.html'),
    styles: [
        require('./crud.update.scss')
    ],
    providers: [],
    directives: [
        AgGridNg2
    ],
    pipes: [TranslatePipe]
})

export class CrudUpdate {
    public rowData = [];
    public columnDefs = [];

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public crudModel:CrudModel,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.currPath = this.router.url.split('/')[1];
        this.crudService.setCrudName(this.router['config']);

        // init the column definitions
        this.crudModel.getColumnDefs(this.crudService.className, true)
            .then((columnDefs) => {
                this.columnDefs = columnDefs;
            })
            .then((res) => {
                // init the row data
                this.crudModel.getStore(this.crudService.className)
                    .then((store) => {
                        this.rowData = store;
                    }, (error) => {
                        this.crudService.dataNotFound = true;
                        this.crudService.errorMessage = 'orientdb.dataNotFound';
                    });
            });
    }

    gridOptions:GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

}
