import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
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
        LoadingGrid
    ],
    pipes: [TranslatePipe]
})

export class CrudView {
    public gridOptions:GridOptions;

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.gridOptions = this.crudService.gridOptions;
    }
}
