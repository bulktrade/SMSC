import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router, ActivatedRoute} from "@angular/router";
import {ColumnDef} from "../model/column-definition";
import {Pagination} from "../model/pagination";
import {CustomersService, REPOSITORY_NAME} from "../customer.service";
import * as clone from "js.clone";
import {NotificationService} from "../../services/notification-service";
import {Customer} from "../model/customer";
import {OneToMany, Action} from "../../shared/components/one-to-many/one-to-many.model";

@Component({
    selector: 'customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: ['./customers-view.component.scss']
})

export class CustomersViewComponent {

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData: Customer[] = [];

    public selectedRows: ColumnDef[] = [];

    public contactsModel: OneToMany[] = [];

    public usersModel: OneToMany[] = [];

    public action = Action;

    public isLoading: boolean = false;

    public filters: Customer = <Customer>{};

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();
    }

    onFilter(column: string, data: string) {
        this.filters[column] = data;
        this.isLoading = true;

        this.customersService.getResources(this.pagination.number, this.pagination.size, this.filters)
            .subscribe(rows => {
                this.isLoading = false;
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
            }, err => {
                console.error(err);
                this.isLoading = false;
            });
    }

    onRowExpand(event) {
        this.contactsModel[event.data['id']] = new OneToMany('contacts', Action.View, null);
        this.usersModel[event.data['id']] = new OneToMany('users', Action.View, null);
    }

    onPaginate(event) {
        this.pagination.number = event.page;
        this.pagination.size = event.rows;
        this.isLoading = true;

        this.customersService.getResources(this.pagination.number, this.pagination.size, this.filters)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
                this.isLoading = false;
            }, err => {
                console.error(err);
                this.isLoading = false;
            });
    }

    onEditComplete(event) {
        let data: Customer = clone(event.data);

        this.customersService.updateResource(data)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateCustomer');
                return false;
            })
    }

    getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    getNumberCustomers() {
        return this.route.snapshot.data['view'].totalElements;
    }
}
