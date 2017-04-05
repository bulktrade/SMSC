import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {TranslateService} from "ng2-translate";
import {DOCUMENT} from "@angular/platform-browser";

import {MCC} from "./mcc.model";
import {ActivatedRoute} from "@angular/router";
import {MCCService} from "./mcc.service";
import {Pagination} from "../customers/model/pagination";
import {Sort, SortType} from "../shared/sort.model";
import {ControlErrorService} from "../services/control-error";
import {NotificationService} from "../services/notification-service";
import {Observable} from "rxjs";

@Component({
    selector: 'mcc',
    templateUrl: './mcc.component.html',
    styleUrls: [
        './mcc.component.scss',
        '../shared/styles/view.component.scss'
    ]
})
export class MCCComponent implements OnInit, AfterViewInit {

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public rowData: MCC[] = [];

    public isFiltering: { [inputFieldName: string]: boolean }[] = [];

    public filters: { [colName: string]: string } = {};

    public selectedRows: MCC[] = [];

    public _isMobileDevice: boolean = false;

    public isDeleteWindow: boolean = false;

    public msgs: Message[] = [];

    public sort: Sort = null;

    public isLoading: boolean = false;

    public tableHeaderHeight: number;

    public tableBodyHeight: number;

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public mccService: MCCService,
                public controlErrorService: ControlErrorService,
                public notification: NotificationService,
                @Inject(DOCUMENT) public document) {
    }

    ngAfterViewInit() {
        if (this.document.querySelector('.smsc-crud-view')) {
            this.tableHeaderHeight = this.getTableHeaderHeight();
            this.tableBodyHeight = this.getTableBodyHeight();
        }
    }

    ngOnInit() {
        this.translate.get('MULTIPLE_DELETE_RECORDS')
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
        this._isMobileDevice = this.isMobileDevice(window.innerWidth);
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberCustomers();
    }

    onPaginate(event) {
        this.pagination.number = event.page;
        this.pagination.size = event.rows;

        this.toggleLoading();
        this.mccService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.pagination.totalElements = res['page']['totalElements'];
                    this.rowData = res['_embedded'][this.mccService.repositoryName];
                    this.toggleLoading();
                },
                () => {
                    this.toggleLoading();
                }
            );
    }

    onEditComplete(event) {
        this.mccService.updateResource(event.data)
            .subscribe(
                () => {
                    this.notification.createNotification('success', 'SUCCESS', 'mcc.successUpdateMCC');
                }, (e) => {
                    this.controlErrorService.gridControlErrors(e.json(), event);
                }
            );
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

        this.toggleLoading();
        this.mccService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.toggleLoading();
                    this.rowData = res['_embedded'][this.mccService.repositoryName];
                },
                () => {
                    this.toggleLoading();
                }
            );
    }

    onMultipleDelete() {
        let batchObservables = [];
        this.selectedRows.forEach((i: MCC) => {
            batchObservables.push(
                this.mccService.deleteResource(i)
                    .map((res) => {
                        this.rowData.forEach((mcc: MCC, index, arr: MCC[]) => {
                            if (mcc.mcc === i.mcc) {
                                arr.splice(index, 1);
                            }
                        });
                        return res;
                    })
            );
        });

        Observable.forkJoin(batchObservables).subscribe(
            () => {
                this.notification.createNotification('success', 'SUCCESS', 'mcc.successDeleteMCC');
                this.toggleDeleteWindow();
            },
            () => {
                this.notification.createNotification('error', 'ERROR', 'mcc.errorDeleteMCC');
            }
        );
    }

    onFilter(colName: string, inputField) {
        this.filters[colName] = inputField.value;
        this.isFiltering[<string>inputField.name] = true;

        this.mccService.getResources(null, null, this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.pagination.totalElements = res['page']['totalElements'];
                    this.rowData = res['_embedded'][this.mccService.repositoryName];
                    this.isFiltering[<string>inputField.name] = false;
                }, () => {
                    this.isFiltering[<string>inputField.name] = false;
                }
            );
    }

    toggleDeleteWindow() {
        this.isDeleteWindow = !this.isDeleteWindow;
    }

    toggleLoading() {
        this.isLoading && this.ngAfterViewInit();
        this.isLoading = !this.isLoading;
    }

    onResize(event) {
        this._isMobileDevice = this.isMobileDevice(event.target.innerWidth);
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

    isMobileDevice(width: number): boolean {
        return width <= 640;
    }

    getRowData(): MCC[] {
        return <MCC[]>this.route.snapshot.data['mcc']['_embedded'][this.mccService.repositoryName];
    }

    getNumberCustomers(): number {
        return <number>this.route.snapshot.data['mcc']['page']['totalElements'];
    }
}
