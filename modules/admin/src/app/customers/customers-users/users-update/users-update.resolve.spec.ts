import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {UsersUpdateResolve} from "./users-update.resolve";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {MockBackend} from "@angular/http/testing";
import {CustomersUsersService} from "../customer-user.service";

describe('Resolve: UsersUpdateResolve', () => {
    let usersUpdateResolve: UsersUpdateResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [
                UsersUpdateResolve,
                CustomersUsersService,
                {provide: ConfigService, useClass: ConfigServiceMock},
                {provide: XHRBackend, useClass: MockBackend},
            ]
        });
    });

    beforeEach(inject([UsersUpdateResolve, XHRBackend], (_usersUpdateResolve, _mockBackend) => {
        usersUpdateResolve = _usersUpdateResolve;
        mockBackend = _mockBackend;
    }));

    it('.resolve()', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        usersUpdateResolve.resolve(<any>{params: {customerId: 1}}, <any>{})
            .subscribe(response => {
                expect(response).toBeDefined();
            });
    });
});
