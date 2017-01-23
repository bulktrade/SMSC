import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";
import { ColumnDef } from "../model/column-definition";
import { CrudViewService } from "./crud-view.service";
import { Pagination } from "../model/pagination";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html'),
    styleUrls: [
        require('./crud-view.component.scss')
    ],
    providers: [CrudViewService]
})

export class CrudViewComponent {
    public pagination: Pagination = new Pagination(10, null, null, 0);
    public columnDefs: ColumnDef[];
    public rowData = [];
    public selectedRows = null;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService,
                public crudViewService: CrudViewService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();

        // get total rows
        this.crudViewService.getCountRows()
            .subscribe(countRows => {
                this.pagination.totalElements = countRows;
            });

        // this.crudService.resetCrudLevels();
    }

    onPaginate(event) {
        this.backend.getResources(this.crudService.getRepositoryName(), event.page, event.rows)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][this.crudService.getRepositoryName()];
            });
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
        this.router.navigate([this.router.url, 'delete', this.selectedRows['id']]);
    }

    navigateToUpdate() {
        this.router.navigate([this.router.url, 'update', this.selectedRows['id']]);
    }
}
