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
    ]
})

export class CustomersViewComponent {

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

    back() {
        this.location.back();
    }

    onEdit() {
        setTimeout(() => {
            this.router.navigate(['customers', 'update', this.selectedRows['id']]);
        }, 50);
    }

    onDelete() {
        setTimeout(() => {
            this.router.navigate(['customers', 'delete', this.selectedRows['id']]);
        }, 50);
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
