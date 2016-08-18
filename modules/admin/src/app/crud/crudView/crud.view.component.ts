import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudLinkset } from "../crudLinkset/crud.linkset.component";
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { LoadingGrid } from "../../common/loadingGrid";

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    styles: [
        require('./crud.view.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        AgGridNg2,
        CrudLinkset,
        AlertComponent,
        LoadingGrid,
        CrudView
    ],
    pipes: [ TranslatePipe ]
})

export class CrudView {
    public gridOptions:GridOptions;
    public showLinksetView = false;

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router,
                public route:ActivatedRoute) {
    }

    ngOnInit() {
        this.crudService.className = this.route.parent.parent.routeConfig.data[ 'crudClass' ];
        this.crudService.parentPath = this.router.url;

        this.crudService.initializationGrid(this.crudService.getClassName(),
            (rowData) => {
                if (!rowData.length) {
                    this.crudService.isInfoMessage = true;
                    this.crudService.infoMessage = 'orientdb.noRows';
                }

                this.crudService.gridOptions.rowData = rowData;
                this.crudService.setRowData(rowData, this.crudService.gridOptions);
            },
            (columnDefs) => {
                this.crudService.gridOptions.columnDefs = columnDefs;
                this.crudService.addCheckboxSelection(columnDefs, this.crudService.gridOptions);
            });

        this.gridOptions = this.crudService.gridOptions;
    }

    back() {
        let lastElement:any;

        if (this.crudService.multiCrud.length) {
            this.crudService.multiCrud.pop();
            lastElement = this.crudService.multiCrud[ this.crudService.multiCrud.length - 1 ];
        }

        if (lastElement) {
            this.crudService.linkedClass = lastElement.linkedClass;
        } else {
            this.crudService.linkedClass = this.crudService.className;
        }

        this.showLinksetView = true;
    }

    clickOnCell(event) {
        let columnDefs = event.colDef;

        if (columnDefs.type === 'LINKSET' ||
            columnDefs.type === 'LINK') {
            this.crudService.linkedClass = columnDefs.linkedClass;
            this.showLinksetView = true;
        }
    }
}
