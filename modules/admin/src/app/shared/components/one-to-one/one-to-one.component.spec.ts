import {async, getTestBed, inject, TestBed} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Http, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {ComponentHelper} from "../../component-fixture";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../test/stub/config.service";
// import {Link} from "../../entity.model";
import {OneToOneComponent, OneToOneModule} from "./one-to-one.component";
import {CustomersService} from "../../../customers/customer.service";
import {CrudRepositoryService} from "../../crud-repository.spec";
import {Injector} from "@angular/core";
// import {Observable} from "rxjs";

describe('Component: OneToOneComponent', () => {
    let componentFixture: ComponentHelper<OneToOneComponent> =
        new ComponentHelper<OneToOneComponent>(null, null, null, null);
    let mockBackend, customersService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OneToOneModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
                {
                    provide: CrudRepositoryService,
                    useFactory: (http: Http, configService: ConfigService) => {
                        return new CrudRepositoryService(http, configService)
                    },
                    deps: [Http, ConfigService]
                }
            ]
        });

        injector = getTestBed();

        componentFixture.fixture = TestBed.createComponent(OneToOneComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.name = 'foo';
        componentFixture.instance.crudRepositoryA = injector.get(CrudRepositoryService);
        componentFixture.instance.crudRepositoryB = injector.get(CrudRepositoryService);
        componentFixture.instance.entity = <any>{
            _links: {
                foo: {
                    href: 'http://foo.bar'
                },
                self: {
                    href: 'http://foo.bar'
                }
            }
        };
    });

    beforeEach(inject([XHRBackend, CustomersService], (_mockBackend, _customersService) => {
        mockBackend = _mockBackend;
        customersService = _customersService;
    }));

    it('should retrieve the value', async(() => {
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toBe(RequestMethod.Get);
            let response = new ResponseOptions({body: {_links: {self: {href: 'http://foo.bar'}}}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.retrieveValue();
        expect(componentFixture.instance.value).toEqual('http://foo.bar');
    }));

    it('should retrieve options', async(() => {
        let responseBody = {
            _embedded: {
                data: [
                    {
                        name: 'foo',
                        _links: {self: {href: 'http://foo.bar'}}
                    },
                    {
                        name: 'bar',
                        _links: {self: {href: 'http://foo.bar'}}
                    }
                ]
            }
        };
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toBe(RequestMethod.Get);
            let response = new ResponseOptions({body: responseBody});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.retrieveOptions();
        expect(componentFixture.instance.options[0]).toEqual(jasmine.objectContaining({label: '', value: null}));
        expect(componentFixture.instance.options.length).toBe(3);
    }));

    it('should get an error during retrieving options', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toBe(RequestMethod.Get);
            c.mockError(new Error('not found'));
        });
        componentFixture.instance.retrieveOptions();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'oneToOne.notFound');
    }));

    it('.ngOnInit()', async(() => {
        spyOn(componentFixture.instance, 'retrieveValue');
        spyOn(componentFixture.instance, 'retrieveOptions');
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.retrieveValue).toHaveBeenCalled();
        expect(componentFixture.instance.retrieveOptions).toHaveBeenCalled();
    }));

    it('.onChange()', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        componentFixture.instance.updateResource = true;
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toBe(RequestMethod.Patch);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.onChange({value: 'http://foo.bar'});
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'oneToOne.successUpdate');
    }));

    it('.onChange() - should get an error during updating the resource', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        componentFixture.instance.updateResource = true;
        mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.method).toBe(RequestMethod.Patch);
            c.mockError(new Error('not found'));
        });
        componentFixture.instance.onChange({value: 'http://foo.bar'});
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'oneToOne.errorUpdate');
    }));

    it('.writeValue()', async(() => {
        componentFixture.instance.writeValue('http://foo.bar');
        expect(componentFixture.instance.value).toEqual('http://foo.bar');
    }));

    it('should get label by fields', async(() => {
        let resource = {
            id: 1,
            foo: 'foo',
            bar: 'bar'
        };
        componentFixture.instance.fields = ['foo', 'bar'];
        expect(componentFixture.instance.getLabelByFileds(resource)).toEqual('1 foo, bar');
    }));
});
