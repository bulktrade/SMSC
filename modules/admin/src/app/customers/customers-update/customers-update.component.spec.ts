import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, Response, ResponseOptions} from "@angular/http";
import {OneToManyComponent, OneToManyModule} from "./one-to-many.component";
import {ComponentHelper} from "../../shared/component-fixture";
import {CustomersUpdateComponent} from "./customers-update.component";
import {CustomersModule} from "../customers.module";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {Customer} from "../model/customer";

describe('Component: CustomersUpdateComponent', () => {
    let componentFixture: ComponentHelper<CustomersUpdateComponent> =
        new ComponentHelper<CustomersUpdateComponent>(null, null, null, null);
    let mockBackend;
    let customer: Customer = <Customer>{
        country: '',
        city: '',
        companyName: '',
        street: '',
        street2: '',
        postcode: '',
        vatid: '',
        contacts: [],
        users: [],
        parent: <Customer>{},
        _links: {
            self: {
                href: ''
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomersModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersUpdateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.model = <any>{
            _links: {
                parent: {
                    href: ''
                },
                contacts: {
                    href: ''
                },
                users: {
                    href: ''
                }
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the `customers-form`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#customers-form')).toBeDefined();
        });
    }));

    it('submit button name should be `customers.update`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.instance.submitButtonName).toEqual('customers.update');
            expect(componentFixture.element.querySelector('#submit-button').innerText).toEqual('customers.update');
        });
    }));

    it('should get an success message about update new customer', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.onSubmit(customer);

        expect(componentFixture.instance.isLoading).toBeFalsy();
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdateCustomer');
    }));

    it('should get an error if customer was not updated', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(console, 'error');

        componentFixture.instance.onSubmit(customer);

        expect(componentFixture.instance.isLoading).toBeFalsy();
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorUpdateCustomer');
        expect(console.error).toHaveBeenCalledWith(new Response(new ResponseOptions({status: 500})));
    }));
});
