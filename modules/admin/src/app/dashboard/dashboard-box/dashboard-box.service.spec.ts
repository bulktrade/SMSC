import {inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";

import {DashboardBoxService} from "./dashboard-box.service";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";

describe('Service: DashboardBoxService', () => {
    let mockBackend, service: DashboardBoxService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardBoxService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        })
    });

    beforeEach(inject([DashboardBoxService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('should retrieve dashboard boxes', () => {
        let responseBody = {
            _embedded: {
                'dashboard-boxes': [
                    {
                        name: 'dashboard',
                        icon: 'fa-rocket'
                    }
                ]
            }
        };
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Get);
            let response = new ResponseOptions({body: responseBody});
            c.mockRespond(new Response(response));
        });
        service.getDashboardBoxes(<any>{_links: {dashboardBoxes: {href: 'http://foo.bar'}}}).subscribe()
    });
});
