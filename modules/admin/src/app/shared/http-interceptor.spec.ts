import {TestBed, inject} from "@angular/core/testing";
import {HTTP_INTERCEPTOR_PROVIDER, HttpInterceptor} from "./http-interceptor";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, Http, HttpModule, ResponseOptions, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";

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
});
