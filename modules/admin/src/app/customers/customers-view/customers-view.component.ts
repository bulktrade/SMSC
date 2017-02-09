import { Component, HostListener } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { ColumnDef } from "../model/column-definition";
import { Pagination } from "../model/pagination";
import { CustomersService, REPOSITORY_NAME } from "../customers.service";
import { RelationshipModal } from "../model/relationship-modal";
import { CustomersViewService } from "./customers-view.service";
import * as clone from "js.clone";
import { NotificationService } from "../../services/notification-service";

@Component({
    selector: 'customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: ['./customers-view.component.scss'],
    providers: [CustomersViewService]
})

export class CustomersViewComponent {

    public gridResponsive: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData = [];

    public selectedRows: ColumnDef[] = [];

    public oneToManyModal: boolean = false;

    public oneToOneModal: boolean = false;

    public relationshipModal: RelationshipModal = <RelationshipModal>{};

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public customersViewService: CustomersViewService,
                public notifications: NotificationService) {
    }

    onEditInit(event) {
        switch (event.column.field) {
            case 'contacts':
                this.relationshipModal.model = event.data[event.column.field];
                this.relationshipModal.mainEntityId = event.data['id'];
                this.relationshipModal.renderProperties = ['firstname', 'surname', 'phone', 'mobilePhone', 'emailAddress'];
                this.relationshipModal.propertyName = 'contacts';
                this.oneToManyModal = true;
                break;

            case 'customerUsers':
                this.relationshipModal.model = event.data[event.column.field];
                this.relationshipModal.renderProperties = ['firstname', 'surname', 'username', 'email'];
                this.relationshipModal.propertyName = 'users';
                this.oneToManyModal = true;
                break;

            case 'parentCustomer':
                this.relationshipModal.model = event;
                this.relationshipModal.mainEntityId = event.data['id'];
                this.relationshipModal.propertyName = 'parentCustomer';
                this.oneToOneModal = true;
                break;

            default:
                break;
        }
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

    onEditComplete(event) {
        let data = clone(event.data);

        delete data['customerUsers'];
        delete data['contacts'];
        delete data['parentCustomer'];

        this.customersService.updateResource(event.data['id'], data)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdate');

                return false;
            })
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
