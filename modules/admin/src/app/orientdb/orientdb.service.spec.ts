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

    it('should to connect to orientdb', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb/connect/smsc';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.open('test', 'test')
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should return a query result', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb//query/smsc/sql/select%20from%20Customer/20';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.query('select from Customer')
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should execute the command', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.command()
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should create a new user', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb/database/smsc/local/document';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.create('root', '12t')
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should get the metadata', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let path = '/orientdb//database/smsc';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.metadata()
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should return the record informations', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let body = {
            "@rid": "1:1",
            "@class": "Address",
            "street": "Piazza Navona, 1",
            "type": "Residence",
            "city": "#13:0"
        };

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: JSON.stringify(body) });
            c.mockRespond(new Response(response));
        });

        db.load('1:1')
            .then((res:Response) => {
                expect(res.json()[ '@rid' ]).toEqual('1:1');
            });
    }));

    it('should save the record', inject([ MockBackend, Http, ODatabaseService ], (backend:MockBackend, http:Http, db:ODatabaseService) => {
        let obj = JSON.stringify({
            "@rid": "#1:1",
            "@version": "1",
            "@class": "Customer"
        });

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        db.save(obj)
            .then((res:Response) => {
                expect(res.json().result).toEqual('success');
            });
    }));

});

