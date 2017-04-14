import {Observable} from "rxjs";
import {Message} from "primeng/primeng";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "ng2-translate";
import {DOCUMENT} from "@angular/platform-browser";
import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";

import {Entity} from "../../entity.model";
import {Sort, SortType} from "../../sort.model";
import {CrudRepository} from "../../crud-repository";
import {Pagination} from "../../../customers/model/pagination";
import {ControlErrorService} from "../../../services/control-error";
import {NotificationService} from "../../../services/notification-service";

@Component({
    selector: 'crud-view',
    template: ''
})
export class CrudViewComponent<T extends Entity> implements OnInit {

    public pagination: Pagination = new Pagination(10, null, null, 0);

    public rowData: T[] = [];

    public isFiltering: { [inputFieldName: string]: boolean }[] = [];

    public filters: { [colName: string]: string } = {};

    public selectedRows: T[] = [];

    public _isMobileDevice: boolean = false;

    public isDeleteWindow: boolean = false;

    public msgs: Message[] = [];

    public sort: Sort = null;

    public isLoading: boolean = false;

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public crudService: CrudRepository<T>,
                public controlErrorService: ControlErrorService,
                public notification: NotificationService,
                @Inject(DOCUMENT) public document) {
    }

    ngOnInit() {
        this.translate.get('MULTIPLE_DELETE_RECORDS')
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
        this._isMobileDevice = this.isMobileDevice(window.innerWidth);
        this.rowData = this.getRowData();
        this.pagination.totalElements = this.getNumberResources();
    }

    onPaginate(event) {
        this.pagination.number = event.page;
        this.pagination.size = event.rows;

        this.toggleLoading();
        this.crudService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.pagination.totalElements = res['page']['totalElements'];
                    this.rowData = res['_embedded'][this.crudService.repositoryName];
                    this.toggleLoading();
                },
                () => {
                    this.toggleLoading();
                }
            );
    }

    onEditComplete(event) {
        this.crudService.updateResource(event.data)
            .subscribe(
                () => {
                    this.notification.createNotification('success', 'SUCCESS', 'SUCCESS_UPDATE_RESOURCE');
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
        this.crudService.getResources(this.pagination.number, this.pagination.size,
            this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.toggleLoading();
                    this.rowData = res['_embedded'][this.crudService.repositoryName];
                },
                () => {
                    this.toggleLoading();
                }
            );
    }

    onMultipleDelete() {
        let batchObservables = [];
        this.selectedRows.forEach((i: T) => {
            batchObservables.push(
                this.crudService.deleteResource(i)
                    .map((res) => {
                        this.rowData.forEach((resource: T, index, arr: T[]) => {
                            if (resource['id'] === i['id']) {
                                arr.splice(index, 1);
                            }
                        });
                        return res;
                    })
            );
        });

        Observable.forkJoin(batchObservables).subscribe(
            () => {
                this.notification.createNotification('success', 'SUCCESS', 'SUCCESS_DELETE_RESOURCE');
                this.toggleDeleteWindow();
            },
            () => {
                this.notification.createNotification('error', 'ERROR', 'ERROR_DELETE_RESOURCE');
            }
        );
    }

    onFilter(colName: string, inputField) {
        this.filters[colName] = inputField.value;
        this.isFiltering[<string>inputField.name] = true;

        this.crudService.getResources(0, this.pagination.size, this.filters, this.sort)
            .subscribe(
                (res) => {
                    this.pagination.totalElements = res['page']['totalElements'];
                    this.rowData = res['_embedded'][this.crudService.repositoryName];
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
        this.isLoading = !this.isLoading;
    }

    onResize(event) {
        this._isMobileDevice = this.isMobileDevice(event.target.innerWidth);
    }

    isMobileDevice(width: number): boolean {
        return width <= 640;
    }

    getRowData(): T[] {
        return <T[]>this.route.snapshot.data['view']['_embedded'][this.crudService.repositoryName];
    }

    getNumberResources(): number {
        return <number>this.route.snapshot.data['view']['page']['totalElements'];
    }
}
