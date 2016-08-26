import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";
import { LoadingGrid } from "../../common/loadingGrid";
import { Location } from "@angular/common";

@Component({
    selector: 'crud-linkset',
    template: require('./crud.linkset.html'),
    styles: [
        require('./crud.linkset.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        AgGridNg2,
        AlertComponent,
        LoadingGrid
    ],
    pipes: [TranslatePipe]
})

export class CrudLinkset {

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
    }

    back() {
        this.location.back();
    }

    addLink(gridOptions) {
        let params: any = this.crudService.modifiedRecord.data;
        let linkSet = this.setLinkset(gridOptions);

        if (this.crudService.modifiedRecord.type === 'LINK') {
            params[this.crudService.modifiedRecord.modifiedLinkset] = linkSet.join().replace(/\[|\]/gi, '');
        } else {
            params[this.crudService.modifiedRecord.modifiedLinkset] = linkSet;
        }

        if (this.crudService.modifiedRecord.from === 'CrudView') {
            this.crudService.updateRecord(params);
            this.back();
        } else {
            this.crudService.model = params;
            this.back();
        }
    }

    setLinkset(gridOptions) {
        let focusedRows = gridOptions.api.getSelectedRows();
        let result = [];

        for (let item = 0; item < focusedRows.length; item++) {
            result.push(focusedRows[item].rid);
        }

        return result;
    }

}
