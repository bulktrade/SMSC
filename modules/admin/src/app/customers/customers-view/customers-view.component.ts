import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { BackendService } from "../../services/backend/backend.service";
import { ColumnDef } from "../model/column-definition";
import { Pagination } from "../model/pagination";
import { CustomersService } from "../customers.service";

@Component({
    selector: 'customers-view',
    template: require('./customers-view.component.html'),
    styleUrls: [
        require('./customers-view.component.scss')
    ],
    providers: []
})

export class CustomersViewComponent {

    public isEditClick: boolean = false;

    public isDeleteClick: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData = [];

    public selectedRows: ColumnDef[] = [];

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService,
                public location: Location) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();
    }

    onPaginate(event) {
        this.customersService.getCustomers(event.page, event.rows)
            .subscribe(rows => {
                this.rowData = rows;
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
        this.location.back();
    }

    onEdit() {
        this.isEditClick = true;
    }

    onDelete() {
        this.isDeleteClick = true;
    }

    navigateToCreate() {
        this.router.navigate(['customers', 'create']);
    }

    navigateToDelete(id) {
        this.router.navigate(['customers', 'delete', id]);
    }

    navigateToUpdate(id) {
        this.router.navigate(['customers', 'update', id]);
    }

    getColumnDefs() {
        return this.route.snapshot.data['view'].columnDefs;
    }

    getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    getNumberCustomers() {
        return this.route.snapshot.data['view'].totalElements;
    }
}
