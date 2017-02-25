import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../../component-fixture";
import {OneToManyComponent, OneToManyModule} from "./one-to-many.component";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../test/stub/config.service";
import {Link} from "../../entity.model";

describe('Component: OneToManyComponent', () => {
    let componentFixture: ComponentHelper<OneToManyComponent> =
        new ComponentHelper<OneToManyComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OneToManyModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(OneToManyComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.link = new Link('http://...');
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the create button', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.create-button')).toBeDefined();
        });
    }));

    it('should get resources', async(() => {
        let data = {
            _embedded: [
                {
                    property1: 'property1',
                    property2: 'property2'
                },
                {
                    property1: 'property1',
                    property2: 'property2'
                }
            ]
        };

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.getResources(new Link('http://...'))
            .subscribe(res => {
                expect(res[0].property1).toEqual('property1');
                expect(res[0].property2).toEqual('property2');
            });
    }));
});
