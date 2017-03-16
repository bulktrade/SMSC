import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {ContactsUpdateResolve} from "./contacts-update.resolve";
import {CustomersContactsService} from "../customer-contact.service";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {MockBackend} from "@angular/http/testing";

describe('Resolve: ContactsUpdateResolve', () => {
    let contactsUpdateResolve: ContactsUpdateResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [
                ContactsUpdateResolve,
                CustomersContactsService,
                {provide: ConfigService, useClass: ConfigServiceMock},
                {provide: XHRBackend, useClass: MockBackend},
            ]
        });
    });

    beforeEach(inject([ContactsUpdateResolve, XHRBackend], (_contactsUpdateResolve, _mockBackend) => {
        contactsUpdateResolve = _contactsUpdateResolve;
        mockBackend = _mockBackend;
    }));

    it('.resolve()', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        contactsUpdateResolve.resolve(<any>{params: {customerId: 1}}, <any>{})
            .subscribe(response => {
                expect(response).toBeDefined();
            });
    });
});
