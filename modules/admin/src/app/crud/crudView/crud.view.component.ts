import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";
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
        AlertComponent,
        LoadingGrid
    ],
    pipes: [TranslatePipe]
})

export class CrudView {
    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    navigateToCreate() {
        this.crudService.setModel({});
        this.router.navigateByUrl(this.crudService.parentPath + '/create');
    }

    navigateToDelete() {
        let id = this.crudService.getSelectedRID(this.crudService.gridOptions);

        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    }

    clickOnCell(event) {
        if (event.colDef.type === 'LINK' ||
            event.colDef.type === 'LINKSET') {
            this.crudService.setLinkedClass(event.colDef.linkedClass);
            this.crudService.setModifiedRecord({
                data: event.data,
                modifiedLinkset: event.colDef.field,
                type: event.colDef.type,
                from: this.route.component['name']
            });

            this.router.navigateByUrl(this.crudService.parentPath + '/linkset');
        }
    }
}
