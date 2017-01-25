import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "ng2-translate/ng2-translate";
import { LoadingGridService } from "../services/loading/loading-grid.service";
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import { BackendService } from "../services/backend/backend.service";
import { SelectItem } from "primeng/components/common/api";
import { RequestOptions, Headers, RequestMethod, Http, URLSearchParams } from "@angular/http";
import { ConfigService } from "../config/config.service";
import "rxjs/Rx";
import * as _ from "lodash";
const clone = require("js.clone");

const CLASS_NAME: string = 'Customer';
const REPOSITORY_NAME: string = 'customers';
const PROJECTION_NAME: string = 'withContactsAndUsers';

@Injectable()
export class CustomersService {
    private apiUrl: string;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public loadingService: LoadingGridService,
                public location: Location,
                public backendService: BackendService,
                public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Returns column definitions for the grid
     * @returns {any}
     */
    getGridColumnDefs() {
        return Observable.create((observer) => {

            this.backendService.getResources('crud-class-meta-data')
                .subscribe(data => {
                    // find the crudClassMetaData by class name
                    let columns = _.find(data['_embedded']['crud-class-meta-data'], (o) => {
                        return o['className'] === CLASS_NAME;
                    });
                    let linkToMetaGridData = columns['_links'].crudMetaGridData.href;

                    this.backendService.getDataByLink(linkToMetaGridData)
                        .subscribe(_data => {
                            let columns = _data['crud-meta-grid-data'];

                            for (let key in columns) {
                                if (columns.hasOwnProperty(key)) {
                                    let currColumn = columns[key];

                                    currColumn.field = currColumn.property;
                                }
                            }

                            // sorted columns in ascending order by 'order' property
                            columns = _.sortBy(columns, ['order']);

                            this.translateColumnDefs(columns, 'headerName')
                                .subscribe(translatedCols => {
                                    observer.next(translatedCols);
                                    observer.complete();
                                });
                        });
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Returns column definitions for the form
     * @return {any}
     */
    getFormColumnDefs() {
        return Observable.create((observer) => {

            this.backendService.getResources('crud-class-meta-data')
                .subscribe(data => {
                    // find the crudClassMetaData by class name
                    let columns = _.find(data['_embedded']['crud-class-meta-data'], (o) => {
                        return o['className'] === CLASS_NAME;
                    });
                    let linkToMetaFormData = columns['_links'].crudMetaFormData.href;

                    this.backendService.getDataByLink(linkToMetaFormData)
                        .subscribe(_data => {
                            let columns = _data['crud-meta-form-data'];

                            // sorted columns in ascending order by 'order' property
                            columns = _.sortBy(columns, ['order']);

                            this.translateColumnDefs(columns, 'headerName')
                                .subscribe(translatedCols => {
                                    observer.next(translatedCols);
                                    observer.complete();
                                });
                        });
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    /**
     * Translates columns and creates the new property with a translated value for the each of column
     * @param columns
     * @param translateProperty
     * @returns {any}
     */
    translateColumnDefs(columns, translateProperty: string) {
        let observableStore = [],
            _columns = clone(columns);

        for (let key in _columns) {
            if (_columns.hasOwnProperty(key)) {
                let columnName = _columns[key].hasOwnProperty('property') ? _columns[key]['property'] : '';

                observableStore.push(this.translate.get(columnName)
                    .subscribe(headerName => {
                        _columns[key][translateProperty] = headerName;
                    }));

            }
        }

        return Observable.create(obs => {
            obs.next(_columns);
            obs.complete();
        });
    }

    /**
     * Generates the 'options' property for the dropdown UI component
     * @param options
     * @returns {SelectItem[]}
     */
    generateOptionsForDropdown(options: string) {
        let _options: string[] = options.split(','),
            _result: SelectItem[] = [];

        _options.forEach(i => {
            _result.push({
                label: i,
                value: i
            })
        });

        return _result;
    }

    /**
     * Creates the new customer
     * @param data
     * @returns {Observable<R>}
     */
    createCustomer(data) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME, requestOptions)
            .map(res => res.json())
    }

    /**
     * Replaces the customer identified by id
     * @param id
     * @param data
     * @returns {Observable<R>}
     */
    updateResource(id: string = '', data) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json());
    }

    /**
     * Removes the customer with id
     * @param id
     * @returns {Observable<R>}
     */
    deleteCustomer(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json());
    }

    /**
     * Retrieves a single customer with the given id
     * @param id
     * @returns {Observable<R>}
     */
    getCustomer(id: string = '') {
        let search = new URLSearchParams();
        search.set('projection', PROJECTION_NAME);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json());
    }

    /**
     * Retrieves a list of all customers with pagination
     * @param page
     * @param size
     * @returns {Observable<R>}
     */
    getCustomers(page?: number, size?: number) {
        let search = new URLSearchParams();

        if (typeof page !== 'undefined' && typeof size !== 'undefined') {
            search.set('page', page + '');
            search.set('size', size + '');
        }

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME, requestOptions)
            .map(res => res.json());
    }
}
