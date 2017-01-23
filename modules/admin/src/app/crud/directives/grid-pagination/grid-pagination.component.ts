import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Response } from '@angular/http';
import { ODatabaseService } from '../../../orientdb/orientdb.service';
import { NotificationService } from '../../../services/notification-service';
import { GridOptions } from 'ag-grid';
import { GridService } from '../../../services/grid.service';
import { CrudLevel } from '../../model/crud-level';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/components/common/api';

const squel = require('squel');

@Component({
    selector: 'grid-pagination',
    providers: [],
    template: require('./grid-pagination.component.html'),
    styleUrls: [
        require('./grid-pagination.component.scss'),
    ],
    encapsulation: ViewEncapsulation.None
})

export class GridPaginationComponent {
    @Input('className') public className: string;
    @Input('gridOptions') public gridOptions: GridOptions;
    @Input('currentCrudLevel') public currentCrudLevel: CrudLevel;

    public rowsThisPage = [];
    public stepPageSize: SelectItem[] = [
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: '150', value: 150 },
        { label: '200', value: 200 },
        { label: '300', value: 300 }
    ];
    public defaultPageSize: number = 25;
    public pageSize;
    private currentPage: number = 0;
    private fromRecord: number;
    private toRecord: number;
    private sizeClass: number;

    constructor(public translate: TranslateService,
                public gridService: GridService,
                public databaseService: ODatabaseService,
                public serviceNotifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('ALL_RECORDS')
            .subscribe(res => {
                this.stepPageSize.push({ label: res, value: res });
            });

        this.pageSize = this.defaultPageSize;
        this.changePageSize();
    }

    changePageSize() {
        if (this.pageSize === 'All records') {
            this.getSizeClass(this.className)
                .subscribe(classSize => {

                    this.currentPage = 0;
                    this.pageSize = classSize;

                    this.createNewDatasource(0, this.pageSize);
                });
        } else {
            this.getSizeClass(this.className)
                .subscribe(size => {
                    if (this.currentPage * this.pageSize <= size) {
                        let skip = this.currentPage * this.pageSize;
                        let limit = this.pageSize;

                        this.createNewDatasource(skip, limit);
                    } else {
                        let lastRows = size - this.currentPage * this.pageSize;

                        if (lastRows) {
                            let skip = this.currentPage * this.pageSize;
                            let limit = lastRows;

                            this.createNewDatasource(skip, limit);
                        }
                    }
                });
        }
    }

    first() {
        this.setCurrentPage(0);

        let skip = this.currentPage * this.pageSize;
        let limit = this.pageSize;

        this.createNewDatasource(skip, limit);
    }

    last() {
        this.getSizeClass(this.className)
            .subscribe(size => {
                let remainderRows = size % this.pageSize;
                this.setCurrentPage(Math.floor(size / this.pageSize));

                if (remainderRows) {
                    let skip = this.currentPage * this.pageSize;
                    let limit = remainderRows;

                    return this.createNewDatasource(skip, limit);
                } else {
                    let skip = this.currentPage * this.pageSize;
                    let limit = this.pageSize;

                    return this.createNewDatasource(skip, limit);
                }

            });
    }

    previous() {
        if ((this.currentPage - 1) * this.pageSize >= 0) {
            this.currentPage -= 1;

            let skip = this.currentPage * this.pageSize;
            let limit = this.pageSize;

            this.createNewDatasource(skip, limit);
        }
    }

    next() {
        return new Promise((resolve, reject) => {
            this.getSizeClass(this.className)
                .subscribe(size => {
                    if ((this.currentPage + 1) * this.pageSize < size) {
                        this.currentPage += 1;

                        let skip = this.currentPage * this.pageSize;
                        let limit = this.pageSize;

                        return this.createNewDatasource(skip, limit)
                            .then(res => {
                                resolve(res);
                            }, err => {
                                reject(err);
                            });
                    } else {
                        let lastRows = size - this.currentPage * this.pageSize;

                        if (lastRows) {
                            let skip = this.currentPage * this.pageSize;
                            let limit = lastRows;

                            return this.createNewDatasource(skip, limit)
                                .then(res => {
                                    resolve(res);
                                }, err => {
                                    reject(err);
                                });
                        }
                    }
                }, error => {
                    reject(error);
                });
        });
    }

    createNewDatasource(skip?, limit?): Promise<Array<any>> {
        let sql = squel.select()
            .from(this.className);

        if (skip !== undefined && limit !== undefined) {
            sql
                .offset(skip);
        }

        return this.gridService.combineOperators(this.currentCrudLevel)
            .then(res => {
                if (res !== null) {
                    sql.where(res);
                }

                if (this.gridOptions.api) {
                    this.gridOptions.api.showLoadingOverlay();
                }

                return new Promise((resolve, reject) => {
                    this.databaseService.query(sql.toString(), limit)
                        .subscribe((queryRes: Response) => {
                            this.rowsThisPage = queryRes.json().result;

                            if (skip === undefined && limit === undefined) {
                                this.fromRecord = 0;
                                this.toRecord = this.rowsThisPage.length;
                            } else {
                                this.setFromRecord();
                                this.setToRecord(this.rowsThisPage.length);
                            }

                            this.gridService.selectLinksetProperties(this.gridOptions.columnDefs,
                                this.rowsThisPage)
                                .then(() => {

                                    if (this.gridOptions.api) {
                                        this.gridOptions.api.setRowData(this.rowsThisPage);
                                        this.gridOptions.rowData = this.rowsThisPage;
                                        this.gridOptions.api.hideOverlay();
                                    }

                                    resolve(this.rowsThisPage);
                                });
                        }, (error) => {
                            this.serviceNotifications.createNotificationOnResponse(error);
                            reject(error);
                        });
                });
            });
    }

    getSizeClass(className): Observable<number> {
        return Observable.create((obs) => {
            this.gridService.getSizeClass(className)
                .subscribe((size: number) => {
                    this.sizeClass = size;

                    obs.next(size);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    setCurrentPage(value: number) {
        this.currentPage = value;
    }

    setPageSize(value) {
        this.pageSize = value;
    }

    setFromRecord() {
        this.fromRecord = this.currentPage * this.pageSize;
    }

    setToRecord(numberRecords) {
        this.toRecord = this.currentPage * this.pageSize + numberRecords;
    }
}
