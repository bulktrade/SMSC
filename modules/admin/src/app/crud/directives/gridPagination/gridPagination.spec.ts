import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { GridPagination } from "./gridPagination";
import { CRUD_PROVIDERS } from "../../common/crudProviders";
import { APP_PROVIDERS } from "../../../index";

describe('Grid Pagination', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                BaseRequestOptions,
                MockBackend,
                GridPagination,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                                                defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [MockBackend, BaseRequestOptions]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should go to the first page', inject([MockBackend, GridPagination], (backend: MockBackend, gp: GridPagination) => {
        gp.setCurrentPage(5);

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new Response(response));
        });

        gp.first()
            .then((res) => {
                expect(res).toBeDefined();
                expect(gp.getCurrentPage()).toEqual(0);
            });
    }));

    it('should go to the previous page', inject([MockBackend, GridPagination], (backend: MockBackend, gp: GridPagination) => {
        gp.setCurrentPage(5);

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new Response(response));
        });

        gp.previous()
            .then((res) => {
                expect(res).toBeDefined();
                expect(gp.getCurrentPage()).toEqual(4);
            });
    }));

    it('should get a class size', inject([MockBackend, GridPagination], (backend: MockBackend, gp: GridPagination) => {
        gp.setCurrentPage(5);

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new Response(response));
        });

        gp.getSizeClass('Test')
            .then((res) => {
                expect(res).toEqual(2);
            });
    }));

    it('should go to the last page', inject([MockBackend, GridPagination], (backend: MockBackend, gp: GridPagination) => {
        gp.className = 'Test';

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "[]"}' });
            c.mockRespond(new Response(response));
        });

        gp.last()
            .then((res) => {
                expect(gp.getCurrentPage()).toEqual(0);
            });
    }));

});

