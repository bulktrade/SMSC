import { Component, ModuleWithProviders, NgModule } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location, CommonModule } from "@angular/common";
import { MdSelectModule } from "../../common/material/select/select.component";
import { DropdownModule, AlertModule } from "ng2-bootstrap";
import { AgGridModule } from "ag-grid-ng2";
import { LoadingGridModule } from "../../common/loading-grid.component";
import { FormsModule } from "@angular/forms";
import { DynamicViewModule } from "../dynamic-view/dynamic-view.component";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ButtonModule } from "primeng/components/button/button";
import { PaginatorModule } from "primeng/components/paginator/paginator";
import { ColumnDef } from "../model/column-definition";
import { Pagination } from "../model/pagination";
import { BackendService } from "../../services/backend/backend.service";
import { Observable } from "rxjs";

@Component({
    selector: 'crud-linkset',
    template: require('./crud-linkset.component.html'),
    styleUrls: [],
    providers: []
})

export class CrudLinksetComponent {
    public pagination: Pagination = new Pagination(10, null, null, 0);
    public columnDefs: ColumnDef[];
    public rowData = [];
    public selectedRows = null;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public backend: BackendService) {
    }

    onPaginate(event) {
        this.backend.getResources(this.crudService.getRepositoryName(), event.page, event.rows)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][this.crudService.getRepositoryName()];
            });
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();

        // get total rows
        this.getCountRows()
            .subscribe(countRows => {
                this.pagination.totalElements = countRows;
            });
    }

    getCountRows() {
        return Observable.create(obs => {
            this.backend.getResources(this.crudService.getRepositoryName())
                .subscribe(res => {
                    obs.next(res.page.totalElements);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                })
        });
    }

    getColumnDefs() {
        return this.route.snapshot.data['linkset'].columnDefs;
    }

    getRowData() {
        return this.route.snapshot.data['linkset'].rowData;
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

@NgModule({
    imports: [
        PaginatorModule,
        DataTableModule,
        ButtonModule,
        CommonModule,
        MdSelectModule,
        FormsModule,
        DropdownModule,
        TranslateModule,
        AlertModule,
        AgGridModule,
        LoadingGridModule,
        DynamicViewModule
    ],
    exports: [CrudLinksetComponent],
    declarations: [CrudLinksetComponent]
})
export class CrudLinksetModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudLinksetModule,
            providers: []
        };
    }
}
