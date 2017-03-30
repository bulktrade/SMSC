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
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {CustomersFormModel} from "../customers-form/customers-form.model";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
            imports: [BrowserAnimationsModule, CustomersModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ActivatedRoute, useValue: {params: Observable.of({customerId: 40000})}},
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
                    href: 'parent'
                },
                contacts: {
                    href: 'contacts'
                },
                users: {
                    href: 'users'
                }
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the `customers-form` and input fields', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#customers-form')).toBeDefined();
            // input fields
            expect(componentFixture.element.querySelector('#companyName')).toBeTruthy();
            expect(componentFixture.element.querySelector('#street')).toBeTruthy();
            expect(componentFixture.element.querySelector('#street2')).toBeTruthy();
            expect(componentFixture.element.querySelector('#postcode')).toBeTruthy();
            expect(componentFixture.element.querySelector('#country')).toBeTruthy();
            expect(componentFixture.element.querySelector('#city')).toBeTruthy();
            expect(componentFixture.element.querySelector('#vatid')).toBeTruthy();
        });
    }));

    it('.toggleLoading()', async(() => {
        componentFixture.instance.isLoading = false;
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeTruthy();
    }));

    it('submit button name should be `customers.update`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.instance.submitButtonName).toEqual('customers.update');
            expect(componentFixture.element.querySelector('#submit-button').innerText).toEqual('customers.update');
        });
    }));

    it('should get a success message about update new customer', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit(new CustomersFormModel(customer, <any>{}));

        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
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
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.controlErrorService, 'formControlErrors');

        componentFixture.instance.onSubmit(new CustomersFormModel(customer, <any>{}));

        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.isLoading).toBeFalsy();
        expect(componentFixture.instance.controlErrorService.formControlErrors).toHaveBeenCalled();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.id).toEqual(40000);
        expect(componentFixture.instance.model._links.parent.href).toEqual('parent');
        expect(componentFixture.instance.model._links.contacts.href).toEqual('contacts');
        expect(componentFixture.instance.model._links.users.href).toEqual('users');
    }));
});
