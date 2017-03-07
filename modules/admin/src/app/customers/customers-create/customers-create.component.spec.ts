import {TestBed, async, inject} from "@angular/core/testing";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {CustomersCreateComponent} from "./customers-create.component";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {ConfigService} from "../../config/config.service";

describe('Component: CustomersCreateComponent', () => {
    let componentFixture: ComponentHelper<CustomersCreateComponent> =
        new ComponentHelper<CustomersCreateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomersModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersCreateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have `<p-panel>`, `<form>` and input fields', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-panel')).toBeTruthy();
            expect(componentFixture.element.querySelector('form')).toBeTruthy();
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

    it('submit button name should be `customers.create`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.instance.submitButtonName).toEqual('customers.create');
            expect(componentFixture.element.querySelector('#submit-button').innerText).toEqual('customers.create');
        });
    }));

    it('should get a success message about create new customer', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance.router, 'navigate');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit({id: 1});

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successCreateCustomer');
        expect(componentFixture.instance.router.navigate).toHaveBeenCalledWith(['/customers', 1, 'update']);
    }));

    it('should get an error if customer was not created', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit({id: 1});

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorCreateCustomer');
    }));
});
