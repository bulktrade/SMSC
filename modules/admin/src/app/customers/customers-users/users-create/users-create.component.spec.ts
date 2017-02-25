import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../../../shared/component-fixture";
import {UsersCreateComponent} from "./users-create.component";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {UsersModule} from "../customers-users.module";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {CustomerUser} from "../../model/customer-user";

describe('Component: UsersCreateComponent', () => {
    let componentFixture: ComponentHelper<UsersCreateComponent> =
        new ComponentHelper<UsersCreateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                UsersModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(UsersCreateComponent);
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
        let data: CustomerUser = <CustomerUser>{
            username: 'username',
            firstname: "firstname"
        };

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onSubmit(data)
            .subscribe((res: CustomerUser) => {
                expect(res.username).toEqual('username');
                expect(res.firstname).toEqual('firstname');
                expect(componentFixture.instance.isLoading).toBeFalsy();
            });
    }));
});
