import {Component, ViewEncapsulation, Input} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import {Router } from "@angular/router";
import {CrudService} from "../crud.service";

@Component({
    selector: 'crud-linkset',
    template: require('./crud.linkset.html'),
    encapsulation: ViewEncapsulation.Native,
    styleUrls: [
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-fresh.css')
    ],
    styles: [
        require('./crud.linkset.scss')
    ],
    providers: [CrudService],
    directives: [
        AgGridNg2
    ],
    pipes: [TranslatePipe]
})

export class CrudLinkset {
    @Input('crudService') crudServiceParent:any;

    public className;
    public gridOptions:GridOptions;

    constructor(public translate:TranslateService,
                public router:Router,
                public crudService:CrudService) {
    }

    ngOnInit() {
        this.className = this.crudServiceParent.linkedClass;

        // init the column definitions
        this.crudService.getColumnDefs(this.className, false)
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
            rowSelection: this.crudServiceParent.rowSelectionLinkset
        }
    }

}
