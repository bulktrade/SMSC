"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var gridPagination_1 = require('./gridPagination');
var crudProviders_1 = require('../../common/crudProviders');
var app_module_1 = require('../../../app.module');
describe('Grid Pagination', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat(app_module_1.APP_PROVIDERS, [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                gridPagination_1.GridPagination,
                {
                    provide: http_1.Http, useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should go to the first page', testing_1.inject([testing_2.MockBackend, gridPagination_1.GridPagination], function (backend, gp) {
        gp.setCurrentPage(5);
        gp.className = 'GridPagination';
        gp.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: [],
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new http_1.Response(response));
        });
        gp.first();
        expect(gp.getCurrentPage()).toEqual(0);
    }));
    it('should go to the previous page', testing_1.inject([testing_2.MockBackend, gridPagination_1.GridPagination], function (backend, gp) {
        gp.setCurrentPage(5);
        gp.className = 'GridPagination';
        gp.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: []
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new http_1.Response(response));
        });
        gp.previous();
        expect(gp.getCurrentPage()).toEqual(4);
    }));
    it('should get a class size', testing_1.inject([testing_2.MockBackend, gridPagination_1.GridPagination], function (backend, gp) {
        gp.setCurrentPage(5);
        gp.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: []
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new http_1.Response(response));
        });
        gp.getSizeClass('Test')
            .subscribe(function (res) {
            expect(res).toEqual(2);
        });
    }));
    it('should go to the last page', testing_1.inject([testing_2.MockBackend, gridPagination_1.GridPagination], function (backend, gp) {
        gp.className = 'Test';
        gp.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: []
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new http_1.Response(response));
        });
        gp.last();
        expect(gp.getCurrentPage()).toEqual(0);
    }));
    it('should to get a rows data', testing_1.inject([testing_2.MockBackend, gridPagination_1.GridPagination], function (backend, gp) {
        gp.className = 'Test';
        gp.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: []
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new http_1.Response(response));
        });
        spyOn(gp, 'changePageSize');
        gp.changePageSize();
        expect(gp.changePageSize).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=gridPagination.spec.js.map