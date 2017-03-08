import {Component, Inject} from "@angular/core";
import {Location} from "@angular/common";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router, ActivatedRoute} from "@angular/router";
import {ColumnDef} from "../model/column-definition";
import {Pagination} from "../model/pagination";
import {CustomersService, REPOSITORY_NAME} from "../customer.service";
import {NotificationService} from "../../services/notification-service";
import {Customer} from "../model/customer";
import {OneToMany, Action} from "../../shared/components/one-to-many/one-to-many.model";
import {Sort, SortType} from "../../shared/sort.model";
import {DOCUMENT} from "@angular/platform-browser";
import {Message} from "primeng/components/common/api";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Component({
    selector: 'customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent {

    public showConfirmDeletionWindow: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public columnDefs: ColumnDef[];

    public rowData: Customer[] = [];

    public selectedRows: Customer[] = [];

    public contactsModel: OneToMany[] = [];

    public usersModel: OneToMany[] = [];

    public action = Action;

    public isLoading: boolean = false;

    public filters: Customer = <Customer>{};

    public sort: Sort = null;

    public searchModel: Customer[] = [];

    public isFilterLoading: Customer[] = [];

    public tableHeaderHeight: number;

    public tableBodyHeight: number;

    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService,
                @Inject(DOCUMENT) private document) {
    }

    ngOnInit() {
        this.translate.get('customers.multipleDeleteRecords')
            .subscribe(detail => {
                this.msgs.push({severity: 'warn', detail: detail});
            });

        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();
    }

    ngAfterViewChecked() {
        if (this.document.querySelector('#customers-view-window')) {
            this.tableHeaderHeight = this.getTableHeaderHeight();
            this.tableBodyHeight = this.getTableBodyHeight();
        }
    }

    onSort(event) {
        this.sort = new Sort(event.field, null);
        switch (event.order) {
            case 1:
                this.sort.sortType = SortType.ASC;
                break;
            case -1:
                this.sort.sortType = SortType.DESC;
                break;
            default:
                break;
        }
        this.setRowData();
    }

    onFilter(column: string, filterName: string) {
        this.filters[column] = this.searchModel[filterName];
        this.isFilterLoading[filterName] = true;

        this.customersService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
                this.isFilterLoading[filterName] = false;
            }, err => {
                this.isFilterLoading[filterName] = false;
            });
    }

    onRowExpand(event) {
        this.contactsModel[event.data['id']] = new OneToMany('contacts', Action.View, null);
        this.usersModel[event.data['id']] = new OneToMany('users', Action.View, null);
    }

    onPaginate(event) {
        this.pagination.number = event.page;
        this.pagination.size = event.rows;
        this.setRowData();
    }

    onEditComplete(event) {
        this.customersService.updateResource(event.data)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
                this.setRowData();
            }, err => {
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateCustomer');
                this.setRowData();
            })
    }

    setRowData() {
        this.isLoading = true;
        this.customersService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(rows => {
                this.pagination.totalElements = rows['page']['totalElements'];
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
                this.isLoading = false;
                this.showConfirmDeletionWindow = false;
            }, err => {
                this.isLoading = false;
            });
    }

    onDeleteCustomers() {
        let batchObservables: Observable<Response>[] = [];
        this.selectedRows.forEach(i => {
            batchObservables.push(this.customersService.deleteResource(i));
        });
        return Observable.create(obs => {
            Observable.forkJoin(batchObservables)
                .subscribe(res => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successDeleteCustomers');
                    this.setRowData();
                    obs.next(res);
                }, err => {
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorDeleteCustomers');
                    obs.error(err);
                });
        });
    }

    onResize(event) {
        this.tableHeaderHeight = this.getTableHeaderHeight();
        this.tableBodyHeight = this.getTableBodyHeight();
    }

    getTableHeaderHeight(): number {
        return this.document.querySelector('#customers-view-window p-dataTable .ui-datatable-header').offsetHeight +
            this.document.querySelector('#customers-view-window p-dataTable .ui-datatable-scrollable-header').offsetHeight
    }

    getTableBodyHeight(): number {
        return this.document.querySelector('#customers-view-window p-dataTable tbody').offsetHeight;
    }

    getRowData() {
        return this.route.snapshot.data.hasOwnProperty('view') ?
            this.route.snapshot.data['view']['_embedded'][REPOSITORY_NAME] : [];
    }

    getNumberCustomers() {
        return this.route.snapshot.data.hasOwnProperty('view') ?
            this.route.snapshot.data['view']['page']['totalElements'] : 0;
    }
}
