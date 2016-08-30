import { Component, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Response } from "@angular/http";
import { EventEmitter } from "@angular/common/src/facade/async";
import { ODatabaseService } from "../../../orientdb/orientdb.service";
import { ServiceNotifications } from "../../../services/serviceNotification";

declare let sprintf;
const squel = require('squel');

@Component({
    selector: 'grid-pagination',
    providers: [],
    template: require('./gridPagination.html'),
    styles: [
        require('./gridPagination.scss'),
        require('ng2-select/components/css/ng2-select.css')
    ],
    directives: [],
    pipes: [TranslatePipe],
    outputs: [
        'rowData',
        'initRowData',
    ]
})

export class GridPagination {
    @Input('className') public className: string;
    public rowData = new EventEmitter();
    public initRowData = new EventEmitter();

    public rowsThisPage = [];
    public stepPageSize = [5, 25, 50, 150, 200, 300];
    public pageSize: number = 5;
    private currentPage: number = 0;

    constructor(public translate: TranslateService,
                public databaseService: ODatabaseService,
                public serviceNotifications: ServiceNotifications) {
    }

    ngOnInit() {
        this.getSizeClass(this.className)
            .then(size => {
                if (this.currentPage * this.pageSize < size) {
                    let skip = this.currentPage * this.pageSize;
                    let limit = this.pageSize;

                    this.createNewDatasource(skip, limit, true);
                } else {
                    let lastRows = size - this.currentPage * this.pageSize;

                    if (lastRows) {
                        let skip = this.currentPage * this.pageSize;
                        let limit = lastRows;

                        this.createNewDatasource(skip, limit, true);
                    }
                }
            });
    }

    first() {
        this.setCurrentPage(0);

        let skip = this.currentPage * this.pageSize;
        let limit = this.pageSize;

        this.createNewDatasource(skip, limit);
    }

    last() {
        this.getSizeClass(this.className)
            .then(size => {
                let remainderRows = size % this.pageSize;
                this.setCurrentPage(Math.floor(size / this.pageSize));

                if (remainderRows) {
                    let skip = this.currentPage * this.pageSize;
                    let limit = remainderRows;

                    this.createNewDatasource(skip, limit);
                } else {
                    let skip = this.currentPage * this.pageSize;
                    let limit = this.pageSize;

                    this.createNewDatasource(skip, limit);
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

    getLastRows() {
        if (this.rowsThisPage.length !== this.pageSize) {
            return this.rowsThisPage.length;
        } else {
            this.pageSize
        }
    }

    createNewDatasource(skip, limit, init?: boolean) {
        let sql = "select * from %s SKIP %s LIMIT %s";

        this.databaseService.query(sprintf(sql, this.className, skip, limit))
            .then((res: Response) => {
                this.rowsThisPage = res.json().result;

                init ? this.initRowData.emit(this.rowsThisPage) : this.rowData.emit(this.rowsThisPage);
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
}
