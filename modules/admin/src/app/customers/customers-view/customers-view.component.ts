import { Component, HostListener } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { ColumnDef } from "../model/column-definition";
import { Pagination } from "../model/pagination";
import { CustomersService, REPOSITORY_NAME } from "../customers.service";
import { RelationshipModal } from "../model/relationship-modal";
import { CustomersViewService } from "./customers-view.service";

@Component({
    selector: 'customers-view',
    template: require('./customers-view.component.html'),
    styleUrls: ['./customers-view.component.scss'],
    providers: [CustomersViewService]
})

export class CustomersViewComponent {

    public gridResponsive: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData = [];

    public selectedRows: ColumnDef[] = [];

    public displayRelationshipModal: boolean = false;

    public relationshipModal: RelationshipModal = <RelationshipModal>{};

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public customersViewService: CustomersViewService) {
    }

    showDialog(model, id: number, propertyName: string, renderProperties: string[]) {
        this.relationshipModal.model = model;
        this.relationshipModal.mainEntityId = id;
        this.relationshipModal.renderProperties = renderProperties;
        this.relationshipModal.propertyName = propertyName;
        this.displayRelationshipModal = true;
    }

    ngOnInit() {
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();

        // enable responsive mode for grid on mobile devices
        this.gridResponsive = window.innerWidth < 540;
    }

    onPaginate(event) {
        this.customersService.getResources(event.page, event.rows)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
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

    getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    getNumberCustomers() {
        return this.route.snapshot.data['view'].totalElements;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // enable responsive mode for grid on mobile devices
        this.gridResponsive = event.target.innerWidth < 540;
    }
}
