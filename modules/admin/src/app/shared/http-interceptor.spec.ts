import {TestBed, inject} from "@angular/core/testing";
import {HTTP_INTERCEPTOR_PROVIDER, HttpInterceptor} from "./http-interceptor";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, Http, HttpModule, ResponseOptions, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";

describe('Service: HttpInterceptor', () => {
    let service: HttpInterceptor, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [HTTP_INTERCEPTOR_PROVIDER, {provide: XHRBackend, useClass: MockBackend}]
        });
    });

    beforeEach(inject([Http, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('.post()', () => {
        spyOn(service, 'intercept');
        spyOn(service, 'getRequestOptionArgs');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        service.post('url', 'body');
        expect(service.intercept).toHaveBeenCalled();
        expect(service.getRequestOptionArgs).toHaveBeenCalled();
    });

    it('.put()', () => {
        spyOn(service, 'intercept');
        spyOn(service, 'getRequestOptionArgs');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        service.put('url', 'body');
        expect(service.intercept).toHaveBeenCalled();
        expect(service.getRequestOptionArgs).toHaveBeenCalled();
    });

    it('.delete()', () => {
        spyOn(service, 'intercept');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        service.delete('url');
        expect(service.intercept).toHaveBeenCalled();
    });

    it('.getRequestOptionArgs()', () => {
        expect(service.getRequestOptionArgs(null).headers.get('Content-Type')).toEqual('application/json');
    });

    it('.getRequestOptionArgs()', () => {
        expect(service.getRequestOptionArgs(null).headers.get('Content-Type')).toEqual('application/json');
    });

    it('.intercept() - status: 401', () => {
        spyOn(service._router, 'navigateByUrl');
        spyOn(service._tokenService, 'resetToken');
        service.intercept(Observable.create(obs => {
            obs.error(new Response(
                new ResponseOptions({status: 401, url: 'http://localhost:8080/rest/repository'})));
            obs.complete();
        })).catch((err) => {
            expect(err).toThrow();
            expect(service._router.navigateByUrl).toHaveBeenCalledWith('/login');
            expect(service._tokenService.resetToken).toHaveBeenCalled();
            return Observable.empty();
        });
    });

    it('.intercept() - status: 500', () => {
        spyOn(service._router, 'navigateByUrl');
        spyOn(service._tokenService, 'resetToken');
        service.intercept(Observable.create(obs => {
            obs.error(new Response(
                new ResponseOptions({status: 500, url: 'http://localhost:8080/rest/repository'})));
            obs.complete();
        })).catch((err) => {
            expect(err.status).toEqual(500);
            return Observable.empty();
        });
    });
});
