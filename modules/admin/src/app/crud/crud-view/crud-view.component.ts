import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";
import { ColumnDef } from "../model/column-definition";
import { CrudViewService } from "./crud-view.service";
import { Pagination } from "../model/pagination";
import { CrudLevelService } from "../services/crud-level";
import { CrudLevel } from "../model/crud-level";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html'),
    styleUrls: [
        require('./crud-view.component.scss')
    ],
    providers: [CrudViewService]
})

export class CrudViewComponent {

    public isEditClick: boolean = false;

    public isDeleteClick: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData = [];

    public selectedRows: ColumnDef[] = [];

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService,
                public crudViewService: CrudViewService,
                public crudLevelService: CrudLevelService,
                public location: Location) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();

        // get total rows
        this.crudViewService.getCountRows()
            .subscribe(countRows => {
                this.pagination.totalElements = countRows;
            });
    }

    onPaginate(event) {
        this.backend.getResources(this.crudService.getRepositoryName(), event.page, event.rows)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][this.crudService.getRepositoryName()];
            });
    }

    onRowSelect(event) {
        if (this.isDeleteClick) {
            this.navigateToDelete(event.data.id);
        } else if (this.isEditClick) {
            this.navigateToUpdate(event.data.id);
        }

        this.isDeleteClick = false;

        this.isEditClick = false;
    }

    back() {
        let crudLevel: CrudLevel = this.crudLevelService.previousCrudLevel();

        // set crud class name
        this.crudService.setClassName(crudLevel.linkedProperty.crudEntity);

        // set crud repository name
        this.crudService.setRepositoryName(crudLevel.linkedProperty.crudRepository);

        this.location.back();
    }

    onEdit() {
        this.isEditClick = true;
    }

    onDelete() {
        this.isDeleteClick = true;
    }

    getColumnDefs() {
        return this.route.snapshot.data['view'].columnDefs;
    }

    getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    navigateToCreate() {
        this.router.navigate([this.crudService.getCrudRootPath(), 'create']);
    }

    navigateToDelete(id) {
        this.router.navigate([this.crudService.getCrudRootPath(), 'delete', id]);
    }

    navigateToUpdate(id) {
        this.router.navigate([this.crudService.getCrudRootPath(), 'update', id]);
    }
}
