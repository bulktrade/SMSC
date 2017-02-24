import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../../../shared/component-fixture";
import {UsersDeleteComponent} from "./users-delete.component";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {UsersModule} from "../customers-users.module";

describe('Component: UsersDeleteComponent', () => {
    let componentFixture: ComponentHelper<UsersDeleteComponent> =
        new ComponentHelper<UsersDeleteComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [UsersModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(UsersDeleteComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the cancel button and confirm button', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#cancel-button').innerText).toEqual('CANCEL');
            expect(componentFixture.element.querySelector('#ok-button').innerText).toEqual('OK');
        });
    }));

    it('deleteResource()', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 204});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.deleteResource()
            .subscribe(res => {
                expect(res.status).toEqual(204);
            });
    }));
});
