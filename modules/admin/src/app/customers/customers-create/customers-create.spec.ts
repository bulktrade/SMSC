import {TestBed, async} from "@angular/core/testing";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
import {CustomersCreateComponent} from "./crud-create.component";
import {CUSTOMERS_ROUTE_PROVIDER} from "../customers-routing.module";

describe('Component: CustomersCreateComponent', () => {
    let componentFixture: ComponentHelper<CustomersCreateComponent> =
        new ComponentHelper<CustomersCreateComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomersModule,
                RouterTestingModule.withRoutes(CUSTOMERS_ROUTE_PROVIDER),
                TranslateModule.forRoot()
            ],
            providers: [{provide: XHRBackend, useClass: MockBackend}, APP_PROVIDERS]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersCreateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should have `<p-panel>` and `<form>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-panel')).toBeTruthy();
            expect(componentFixture.element.querySelector('form')).toBeTruthy();
        });
    }));
});
