import {async, inject, TestBed} from "@angular/core/testing";
import {CustomersViewComponent} from "./customers-view.component";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {ConfigService} from "../../config/config.service";
import {Action} from "../../shared/components/one-to-many/one-to-many.model";

describe('Component: CustomersViewComponent', () => {
    let componentFixture: ComponentHelper<CustomersViewComponent> =
        new ComponentHelper<CustomersViewComponent>(null, null, null, null);
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
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersViewComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('.onRowExpand()', async(() => {
        componentFixture.instance.onRowExpand({data: {id: 1}});
        expect(componentFixture.instance.contactsModel[1])
            .toEqual(jasmine.objectContaining({propertyName: 'contacts', action: Action.View, entity: null}));
        expect(componentFixture.instance.usersModel[1])
            .toEqual(jasmine.objectContaining({propertyName: 'users', action: Action.View, entity: null}));
    }));
});
