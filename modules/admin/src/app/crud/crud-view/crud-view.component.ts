import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";
import { ColumnDef } from "../model/column-definition";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html')
})

export class CrudViewComponent {
    public columnDefs: ColumnDef[];
    public rowData = [];
    public selectedRows: ColumnDef[] = [];

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

    navigateToDelete(data) {
        this.router.navigate([this.router.url, 'delete', this.getIdFromURI(data)]);
    }

    navigateToUpdate(data) {
        this.router.navigate([this.router.url, 'update', this.getIdFromURI(data)]);
    }

    getIdFromURI(data) {
        let parseUrl = data['_links'].self.href.split('/');

        return parseUrl[parseUrl.length - 1];
    }
}
