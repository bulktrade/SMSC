import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

import {UserService} from "./user.service";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {User} from "./user.model";

describe('Service:  UserService', () => {
    let mockBackend, service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                UserService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        })
    });

    beforeEach(inject([UserService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('should retrieve the logged user', () => {
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toEqual(RequestMethod.Get);
            let response = new ResponseOptions({body: <User>{}});
            c.mockRespond(new Response(response));
        });
        service.getLoggedUser().subscribe();
    });
});
