import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ComponentHelper} from "../../../shared/component-fixture";
import {ContactsUpdateComponent} from "./contacts-update.component";
import {CustomersContactsModule} from "../customers-contacts.module";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";

describe('Component: ContactsUpdateComponent', () => {
    let componentFixture: ComponentHelper<ContactsUpdateComponent> =
        new ComponentHelper<ContactsUpdateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                CustomersContactsModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {
                    provide: ActivatedRoute,
                    useValue: {params: Observable.of({contactId: 40000}), component: ContactsUpdateComponent}
                },
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(ContactsUpdateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.model = <any>{};
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
            expect(componentFixture.element.querySelector('#salutation')).toBeTruthy();
            expect(componentFixture.element.querySelector('#type')).toBeTruthy();
            expect(componentFixture.element.querySelector('#firstname')).toBeTruthy();
            expect(componentFixture.element.querySelector('#surname')).toBeTruthy();
            expect(componentFixture.element.querySelector('#emailAddress')).toBeTruthy();
            expect(componentFixture.element.querySelector('#phone')).toBeTruthy();
            expect(componentFixture.element.querySelector('#mobilePhone')).toBeTruthy();
            expect(componentFixture.element.querySelector('#fax')).toBeTruthy();
        });
    }));

    it('should get a success message about create new contact', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance.location, 'back');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit(<any>{id: 1, _links: {self: {href: ''}}}, <any>{});

        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdateContact');
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('should get an error if contact was not created', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.controlErrorService, 'formControlErrors');

        componentFixture.instance.onSubmit(<any>{id: 1, _links: {self: {href: ''}}}, <any>{});

        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.controlErrorService.formControlErrors).toHaveBeenCalled();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.isDirectiveCall).toBeFalsy();
        expect(componentFixture.instance.contactId).toEqual(40000);
    }));

    it('.onBack()', async(() => {
        spyOn(componentFixture.instance.location, 'back');
        componentFixture.instance.onBack();
        expect(componentFixture.instance.location.back).toHaveBeenCalled();

        spyOn(componentFixture.instance._onBack, 'emit');
        componentFixture.instance.isDirectiveCall = true;
        componentFixture.instance.onBack();
        expect(componentFixture.instance._onBack.emit).toHaveBeenCalledWith(Action.View);
    }));

    it('.toggleLoading()', async(() => {
        componentFixture.instance.isLoading = false;
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeTruthy();
    }));
});
