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
import { LoadingGridService } from "../../../services/loading/loadingGrid.service";

const squel = require('squel');
const sprintf = require('sprintf-js').sprintf;

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
            return this.createNewDatasource();
        } else {
            return this.getSizeClass(this.className)
                .then(size => {
                    if (this.currentPage * this.pageSize <= size) {
                        let skip = this.currentPage * this.pageSize;
                        let limit = this.pageSize;

                        return this.createNewDatasource(skip, limit);
                    } else {
                        let lastRows = size - this.currentPage * this.pageSize;

                        if (lastRows) {
                            let skip = this.currentPage * this.pageSize;
                            let limit = lastRows;

                            return this.createNewDatasource(skip, limit);
                        }
                    }
                });
        }
    }

    first(): Promise<any> {
        this.setCurrentPage(0);

        let skip = this.currentPage * this.pageSize;
        let limit = this.pageSize;

        return this.createNewDatasource(skip, limit);
    }

    last() {
        return this.getSizeClass(this.className)
            .then(size => {
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

    previous(): Promise<any> {
        if ((this.currentPage - 1) * this.pageSize >= 0) {
            this.currentPage -= 1;

            let skip = this.currentPage * this.pageSize;
            let limit = this.pageSize;

            return this.createNewDatasource(skip, limit);
        } else {
            return Promise.resolve();
        }
    }

    next() {
        this.getSizeClass(this.className)
            .then(size => {
                if ((this.currentPage + 1) * this.pageSize < size) {
                    this.currentPage += 1;

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

    createNewDatasource(skip?, limit?) {
        let pagination = "select * from %s SKIP %s LIMIT %s";
        let allRecords = "select * from %s";
        let sql;

        if (skip === undefined && limit === undefined) {
            sql = sprintf(allRecords, this.className);
        } else {
            sql = sprintf(pagination, this.className, skip, limit);
        }

        if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
        }

        return this.databaseService.query(sql)
            .then((res: Response) => {
                this.rowsThisPage = res.json().result;

                if (skip === undefined && limit === undefined) {
                    this.fromRecord = 0;
                    this.toRecord = this.rowsThisPage.length;
                } else {
                    this.setFromRecord();
                    this.setToRecord(this.rowsThisPage.length);
                }

                return this.gridService.selectLinksetProperties(this.gridOptions.columnDefs,
                    this.rowsThisPage)
                    .then(() => {

                        if (this.gridOptions.api) {
                            this.gridOptions.api.setRowData(this.rowsThisPage);
                            this.gridOptions.rowData = this.rowsThisPage;
                            this.gridOptions.api.hideOverlay();
                        }

                        return Promise.resolve(this.rowsThisPage);
                    });
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            })
    }

    getSizeClass(className) {
        let classSize = squel.select()
            .from(className);

        return this.databaseService.query(classSize.toString())
            .then((res: Response) => {
                return Promise.resolve(res.json().result.length);
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            })
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
