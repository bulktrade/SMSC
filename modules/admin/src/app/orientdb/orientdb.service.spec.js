"use strict";
var testing_1 = require('@angular/core/testing');
var orientdb_service_1 = require('./orientdb.service');
var crudProviders_1 = require('../crud/common/crudProviders');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var app_module_1 = require('../app.module');
describe('ODatabaseService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat(app_module_1.APP_PROVIDERS, [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
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
    it('should be defined authHttp', testing_1.inject([orientdb_service_1.ODatabaseService], function (db) {
        expect(db.authHttp).toBeDefined();
    }));
    it('evalResponse should be is true', testing_1.inject([orientdb_service_1.ODatabaseService], function (db) {
        expect(db.evalResponse).toBeTruthy();
    }));
    it('should to connect to orientdb', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        var path = '/orientdb/connect/smsc';
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.open('test', 'test')
            .then(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should return a query result', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        var path = '/orientdb/query/smsc/sql/select%20from%20Customer/20';
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.query('select from Customer')
            .subscribe(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should execute the command', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.command()
            .then(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should create a new user', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.create('root', '12t')
            .subscribe(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should get the metadata', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        var path = '/orientdb/database/smsc';
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.metadata()
            .then(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should return the record informations', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        var body = {
            '@rid': '1:1',
            '@class': 'Address',
            'street': 'Piazza Navona, 1',
            'type': 'Residence',
            'city': '#13:0'
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: JSON.stringify(body) });
            c.mockRespond(new http_1.Response(response));
        });
        db.load('1:1')
            .then(function (res) {
            expect(res.json()['@rid']).toEqual('1:1');
        });
    }));
    it('should save the record', testing_1.inject([testing_2.MockBackend, http_1.Http, orientdb_service_1.ODatabaseService], function (backend, http, db) {
        var obj = JSON.stringify({
            '@rid': '#1:1',
            '@version': '1',
            '@class': 'Customer'
        });
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        db.save(obj)
            .subscribe(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
});
//# sourceMappingURL=orientdb.service.spec.js.map