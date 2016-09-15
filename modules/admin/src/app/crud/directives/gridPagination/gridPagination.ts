import { Component, Input, NgModule, ModuleWithProviders } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Response } from "@angular/http";
import { ODatabaseService } from "../../../orientdb/orientdb.service";
import { NotificationService } from "../../../services/notificationService";
import { GridOptions } from "ag-grid";
import { GridService } from "../../../services/grid.service";
import { CommonModule } from "@angular/common";
import { MdSelectModule } from "../../../common/material/select/select";
import { MdModule } from "../../../md.module";
import { Observable, Observer } from "rxjs";

const squel = require('squel');

@Component({
    selector: 'grid-pagination',
    providers: [],
    template: require('./gridPagination.html'),
    styleUrls: [
        require('./gridPagination.scss'),
    ]
})

export class GridPagination {
    @Input('className') public className: string;
    @Input('gridOptions') public gridOptions: GridOptions;

    public rowsThisPage = [];
    public stepPageSize: any = [25, 50, 150, 200, 300];
    public pageSize: any = 25;
    private currentPage: number = 0;
    private fromRecord: number;
    private toRecord: number;

    constructor(public translate: TranslateService,
                public gridService: GridService,
                public databaseService: ODatabaseService,
                public serviceNotifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('ALL_RECORDS')
            .subscribe(res => {
                this.stepPageSize.push(res);
            });

        this.changePageSize();
    }

    changePageSize() {
        if (this.pageSize === 'All records') {
            this.createNewDatasource();
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

    next(): Observable<Array<any>> {
        return Observable.create((observer: Observer<Array<any>>) => {
            this.getSizeClass(this.className)
                .subscribe(size => {
                    if ((this.currentPage + 1) * this.pageSize < size) {
                        this.currentPage += 1;

                        let skip = this.currentPage * this.pageSize;
                        let limit = this.pageSize;

                        return this.createNewDatasource(skip, limit)
                            .then(res => {
                                observer.next(res);
                                observer.complete();
                            }, err => {
                                observer.error(err);
                                observer.complete();
                            });
                    } else {
                        let lastRows = size - this.currentPage * this.pageSize;

                        if (lastRows) {
                            let skip = this.currentPage * this.pageSize;
                            let limit = lastRows;

                            return this.createNewDatasource(skip, limit)
                                .then(res => {
                                    observer.next(res);
                                    observer.complete();
                                }, err => {
                                    observer.error(err);
                                    observer.complete();
                                });
                        }
                    }
                }, error => {
                    observer.error(error);
                    observer.complete();
                });
        });
    }

    createNewDatasource(skip?, limit?): Promise<Array<any>> {
        let sql;

        if (skip === undefined && limit === undefined) {
            sql = squel.select()
                .from(this.className);
        } else {
            sql = squel.select()
                .from(this.className)
                .offset(skip)
                .limit(limit);
        }

        if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
        }

        return new Promise((resolve, reject) => {
            this.databaseService.query(sql.toString())
                .subscribe((res: Response) => {
                    this.rowsThisPage = res.json().result;

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
                })
        });
    }

    getSizeClass(className): Observable<number> {
        let classSize = squel.select()
            .from(className);

        return Observable.create((observer: Observer<number>) => {
            this.databaseService.query(classSize.toString())
                .subscribe((res: Response) => {
                    observer.next(res.json().result.length);
                    observer.complete();
                }, (error) => {
                    this.serviceNotifications.createNotificationOnResponse(error);
                    observer.error(error);
                    observer.complete();
                })
        });
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    setCurrentPage(value: number) {
        this.currentPage = value;
    }

    setFromRecord() {
        this.fromRecord = this.currentPage * this.pageSize;
    }

    setToRecord(numberRecords) {
        this.toRecord = this.currentPage * this.pageSize + numberRecords;
    }
}

@NgModule({
    imports: [CommonModule, MdSelectModule, MdModule.forRoot()],
    exports: [GridPagination],
    declarations: [GridPagination]
})
export class GridPaginationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GridPaginationModule,
            providers: []
        };
    }
}
