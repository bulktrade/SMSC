import {inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";

import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {DashboardBoxTypeService} from "./dashboard-box-type.service";

describe('Service: DashboardBoxTypeService', () => {
    let mockBackend, service: DashboardBoxTypeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardBoxTypeService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        })
    });

    beforeEach(inject([DashboardBoxTypeService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('should retrieve dashboard box type', () => {
        let responseBody = {
            name: 'foo',
            description: 'bar'
        };
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Get);
            let response = new ResponseOptions({body: responseBody});
            c.mockRespond(new Response(response));
        });
        service.getDashboardBoxType(<any>{_links: {dashboardBoxType: {href: 'http://foo.bar'}}}).subscribe()
    });
});
