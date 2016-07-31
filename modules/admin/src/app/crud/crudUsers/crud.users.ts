import {Component, ViewEncapsulation, Input} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import {Router } from "@angular/router";
import {CrudService} from "../crud.service";

@Component({
    selector: 'crud-users',
    template: require('./crud.users.html'),
    encapsulation: ViewEncapsulation.Native,
    styleUrls: [
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-fresh.css')
    ],
    styles: [
        require('./crud.users.scss')
    ],
    providers: [CrudService],
    directives: [
        AgGridNg2
    ],
    pipes: [TranslatePipe]
})

export class CrudUsers {
    @Input('crudService') crudServiceParent:any;

    public className = 'OUser';
    public gridOptions:GridOptions;

    constructor(public translate:TranslateService,
                public router:Router,
                public crudService:CrudService) {
    }

    ngOnInit() {
        // init the column definitions
        this.crudService.getColumnDefs(this.className, true)
            .then((columnDefs) => {
                this.crudService.crudModel.columnDefs = columnDefs;
            })
            .then((res) => {
                // init the row data
                this.crudService.getStore(this.className)
                    .then((store) => {
                        this.crudService.crudModel.rowData = store;
                    }, (error) => {
                        this.crudService.dataNotFound = true;
                        this.crudService.errorMessage = 'orientdb.dataNotFound';
                    });
            });

        this.gridOptions = {
            columnDefs: this.crudService.crudModel.columnDefs,
            rowData: this.crudService.crudModel.rowData,
            rowSelection: 'multiple',
            singleClickEdit: true
        }
    }

}
