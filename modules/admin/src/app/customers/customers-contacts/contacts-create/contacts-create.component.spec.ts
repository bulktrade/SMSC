import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../../../shared/component-fixture";
import {ContactsCreateComponent} from "./contacts-create.component";
import {CustomersContactsModule} from "../customers-contacts.module";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {Contact} from "../../model/contact";

describe('Component: ContactsCreateComponent', () => {
    let componentFixture: ComponentHelper<ContactsCreateComponent> =
        new ComponentHelper<ContactsCreateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomersContactsModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(ContactsCreateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have `<p-panel>` and `<form>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-panel')).toBeTruthy();
            expect(componentFixture.element.querySelector('form')).toBeTruthy();
        });
    }));

    it('onSubmit()', async(() => {
        let data: Contact = <Contact>{
            firstname: 'protractor',
            salutation: "Mr"
        };

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onSubmit(data)
            .subscribe((res: Contact) => {
                expect(res.firstname).toEqual('protractor');
                expect(res.salutation).toEqual('Mr');
            });
    }));
});
