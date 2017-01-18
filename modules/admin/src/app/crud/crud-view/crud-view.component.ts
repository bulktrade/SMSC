import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";
import { ColumnDef } from "../model/column-definition";
import * as _ from "lodash";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html')
})

export class CrudViewComponent {
    public lodash = _;
    public columnDefs: ColumnDef[];
    public rowData = [];
    public selectedRows: ColumnDef = <ColumnDef>{};

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();

        this.crudService.resetCrudLevels();
    }

    getColumnDefs() {
        return this.route.snapshot.data['view'].columnDefs;
    }

    getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    navigateToCreate() {
        this.router.navigate([this.router.url, 'create']);
    }

    navigateToDelete() {
        this.router.navigate([this.router.url, 'delete', this.getIdFromURI(this.selectedRows)]);
    }

    navigateToUpdate() {
        this.router.navigate([this.router.url, 'update', this.getIdFromURI(this.selectedRows)]);
    }

    getIdFromURI(data) {
        if (data.hasOwnProperty('_links')) {
            let parseUrl = data['_links'].self.href.split('/');
            return parseUrl[parseUrl.length - 1];
        } else {
            return null;
        }
    }
}
