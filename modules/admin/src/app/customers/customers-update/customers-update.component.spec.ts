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

describe('Component: CustomersUpdateComponent', () => {
    let componentFixture: ComponentHelper<CustomersUpdateComponent> =
        new ComponentHelper<CustomersUpdateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomersModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
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
                    href: ''
                },
                contacts: {
                    href: ''
                },
                users: {
                    href: ''
                }
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the `customers-form`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#customers-form')).toBeDefined();
        });
    }));

    it('should get resources', async(() => {
        let data: Customer = <Customer>{
            vatid: '1234',
            country: 'Ukraine',
            _links: {
                self: {
                    href: ''
                }
            }
        };

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onSubmit(data)
            .subscribe(res => {
                expect(res.vatid).toEqual('1234');
                expect(res.country).toEqual('Ukraine');
            });
    }));
});
