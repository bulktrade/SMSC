import { inject, TestBed } from '@angular/core/testing';
import { ODatabaseService } from './orientdb.service';
import { APP_PROVIDERS } from "../index";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { HttpModule, BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe('ODatabaseService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http, useFactory: (backend:ConnectionBackend,
                                                defaultOptions:BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [ MockBackend, BaseRequestOptions ]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined authHttp', inject([ ODatabaseService ], (db) => {
        expect(db.authHttp).toBeDefined();
    }));

    it('evalResponse should be is true', inject([ ODatabaseService ], (db) => {
        expect(db.evalResponse).toBeTruthy();
    }));

    it('should be defined response of the open', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb/connect/smsc';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.open('test', 'test')
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the query', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb//query/smsc/sql/select%20from%20Customer/20';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.query('select from Customer')
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the command', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.command()
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the create', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb/database/smsc/local/document';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.create('root', '12t')
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the metadata', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb//database/smsc';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.metadata()
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the load', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.load('#1:1')
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

    it('should be defined response of the save', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let obj = JSON.stringify({
            "@rid": "#1:1",
            "@version": "1",
            "@class": "Customer"
        });

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.save(obj)
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

});

