import {AfterViewChecked, Component, Inject, OnInit} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "primeng/components/common/api";
import {DOCUMENT} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

import {Action, OneToMany} from "../../shared/components/one-to-many/one-to-many.model";
import {NotificationService} from "../../services/notification-service";
import {CustomersService, REPOSITORY_NAME} from "../customer.service";
import {ControlErrorService} from "../../services/control-error";
import {ControlCellErrors} from "../model/control-cell-errors";
import {Sort, SortType} from "../../shared/sort.model";
import {Pagination} from "../model/pagination";
import {Customer} from "../model/customer";

@Component({
    selector: 'customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: [
        './customers-view.component.scss',
        '../../shared/styles/view.component.scss'
    ]
})
export class CustomersViewComponent implements OnInit, AfterViewChecked {

    public showConfirmDeletionWindow: boolean = false;

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public rowData: Customer[] = [];

    public selectedRows: Customer[] = [];

    public contactsModel: OneToMany[] = [];

    public usersModel: OneToMany[] = [];

    public action = Action;

    public isLoading: boolean = false;

    public sort: Sort = null;

    public isFiltering: { [inputFieldName: string]: boolean }[] = [];

    public filters: { [colName: string]: string } = {};

    public tableHeaderHeight: number;

    public tableBodyHeight: number;

    public msgs: Message[] = [];

    public cellsModel: ControlCellErrors = null;

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService,
                public controlErrorService: ControlErrorService,
                @Inject(DOCUMENT) private document) {
        this.cellsModel = new ControlCellErrors();
    }

    ngOnInit() {
        this.translate.get('MULTIPLE_DELETE_RECORDS')
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();
    }

    ngAfterViewChecked() {
        if (this.document.querySelector('.smsc-crud-view')) {
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
        }
        this.setRowData();
    }

    onFilter(colName: string, inputField) {
        this.filters[colName] = inputField.value;
        this.isFiltering[<string>inputField.name] = true;

        this.customersService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(rows => {
                this.rowData = rows['_embedded'][REPOSITORY_NAME];
                this.isFiltering[<string>inputField.name] = false;
            }, () => {
                this.isFiltering[<string>inputField.name] = false;
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
                for (let column in this.cellsModel) {
                    this.cellsModel[column][event.data.id] = false;
                }
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
            }, (e) => {
                this.controlErrorService.gridControlErrors(e.json(), event, this.cellsModel);
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
            }, () => {
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

    onResize() {
        this.tableHeaderHeight = this.getTableHeaderHeight();
        this.tableBodyHeight = this.getTableBodyHeight();
    }

    getTableHeaderHeight(): number {
        return this.document.querySelector('.smsc-crud-view p-dataTable .ui-datatable-header').offsetHeight +
            this.document.querySelector('.smsc-crud-view p-dataTable .ui-datatable-scrollable-header').offsetHeight
    }

    getTableBodyHeight(): number {
        return this.document.querySelector('.smsc-crud-view p-dataTable tbody').offsetHeight;
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
