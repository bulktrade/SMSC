import { Component, ViewEncapsulation } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudModel } from "../crud.model";

@Component({
    selector: 'crud-update',
    template: require('./crud.view.html'),
    encapsulation: ViewEncapsulation.Native,
    styleUrls: [
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-fresh.css')
    ],
    styles: [
        require('./crud.view.scss')
    ],
    providers: [CrudService],
    directives: [
        AgGridNg2
    ],
    pipes: [TranslatePipe]
})

export class CrudView {
    model = new CrudModel([], []);

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        // init the column definitions
        this.crudService.getColumnDefs(true)
            .then((columnDefs) => {
                this.model.columnDefs = columnDefs;
            })
            .then((res) => {
                // init the row data
                this.crudService.getStore()
                    .then((store) => {
                        this.model.rowData = store;
                    }, (error) => {
                        this.crudService.dataNotFound = true;
                        this.crudService.errorMessage = 'orientdb.dataNotFound';
                    });
            });
    }

    gridOptions:GridOptions = {
        columnDefs: this.model.columnDefs,
        rowData: this.model.rowData,
        rowSelection: 'single',
        singleClickEdit: true
    }

}
