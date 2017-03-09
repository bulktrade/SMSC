import {TestBed, async, inject} from "@angular/core/testing";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
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

    it('should have `<p-panel>` and `<form>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-panel')).toBeTruthy();
            expect(componentFixture.element.querySelector('form')).toBeTruthy();
        });
    }));

    it('submit button name should be `customers.create`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.instance.submitButtonName).toEqual('customers.create');
            expect(componentFixture.element.querySelector('#submit-button').innerText).toEqual('customers.create');
        });
    }));
});
