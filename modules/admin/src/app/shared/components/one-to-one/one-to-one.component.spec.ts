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
import {OneToOneComponent, OneToOneModule} from "./one-to-one.component";
import {CustomersService} from "../../../customers/customer.service";

describe('Component: OneToOneComponent', () => {
    let componentFixture: ComponentHelper<OneToOneComponent> =
        new ComponentHelper<OneToOneComponent>(null, null, null, null);
    let mockBackend, customersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OneToOneModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(OneToOneComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.link = new Link('http://...');
    });

    beforeEach(inject([XHRBackend, CustomersService], (_mockBackend, _customersService) => {
        mockBackend = _mockBackend;
        customersService = _customersService;
    }));

    it('.ngOnInit() - successful response', async(() => {
        let data = {
            _embedded: {customers: []},
            property1: 'property1',
            property2: 'property2'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.id = 1;
        componentFixture.instance.hideOwn = true;
        componentFixture.instance.subEntityService = customersService;

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.model).toBeDefined();
        expect(componentFixture.instance.resources).toBeDefined();
    }));

    it('.ngOnInit() - error response (404)', async(() => {
        let data = {
            _embedded: {customers: []},
            property1: 'property1',
            property2: 'property2'
        };
        mockBackend.connections.subscribe(connection => {
            connection.mockError({status: 404});
        });
        componentFixture.instance.id = 1;
        componentFixture.instance.hideOwn = true;
        componentFixture.instance.subEntityService = customersService;

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.model).toEqual(jasmine.objectContaining({}));
    }));

    it('.ngOnInit() - error response (500)', async(() => {
        let data = {
            _embedded: {customers: []},
            property1: 'property1',
            property2: 'property2'
        };
        mockBackend.connections.subscribe(connection => {
            connection.mockError({status: 500});
        });
        componentFixture.instance.id = 1;
        componentFixture.instance.hideOwn = true;
        componentFixture.instance.subEntityService = customersService;
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.notifications.createNotification['calls'].argsFor(0))
            .toEqual(['error', 'ERROR', 'customers.errorUpdate']);
        expect(componentFixture.instance.notifications.createNotification['calls'].argsFor(1))
            .toEqual(['error', 'ERROR', 'customers.notFound']);
    }));

    it('should get resources', async(() => {
        let data = {
            _embedded: [],
            property1: 'property1',
            property2: 'property2'
        };

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.getResource(new Link('http://...'))
            .subscribe(res => {
                expect(res.property1).toEqual('property1');
                expect(res.property2).toEqual('property2');
            });
    }));

    it('should get the model by schema `ID <companyName>, <country>`', async(() => {
        let model = {
            id: 1,
            companyName: 'companyName',
            country: 'country'
        };
        componentFixture.instance.renderProperties = ['companyName', 'country'];
        expect(componentFixture.instance.getModelBySchema(model)).toEqual('1 companyName, country');
    }));

    it('should remove relationship - successful response', async(() => {
        let model = {
            id: 1,
            companyName: 'companyName',
            country: 'country'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: model});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.mainEntityService = customersService;
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.removeRelationship();

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdate');
    }));

    it('should remove relationship - error response', async(() => {
        let model = {
            id: 1,
            companyName: 'companyName',
            country: 'country'
        };
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('not found'));
        });
        componentFixture.instance.mainEntityService = customersService;
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.removeRelationship();

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorUpdate');
    }));

    it('should remove relationship - successful response', async(() => {
        let model = {
            id: 1,
            username: 'user',
            firstname: 'userName',
            _links: {
                self: {
                    href: 'http://...'
                }
            }
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: model});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.mainEntityService = customersService;
        componentFixture.instance.propertyName = 'customer';
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.onSelectResource(model);

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdate');
    }));

    it('should remove relationship - error response', async(() => {
        let model = {
            id: 1,
            username: 'user',
            firstname: 'userName',
            _links: {
                self: {
                    href: 'http://...'
                }
            }
        };
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('not found'));
        });
        componentFixture.instance.mainEntityService = customersService;
        componentFixture.instance.propertyName = 'customer';
        spyOn(componentFixture.instance.notifications, 'createNotification');

        componentFixture.instance.onSelectResource(model);

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorUpdate');
    }));

    it('should get all resources with `hideOwn` to displaying in the dropdown', async(() => {
        let data = {
            _embedded: {
                customers: [
                    {
                        id: 1,
                        property: 'property1'
                    },
                    {
                        id: 2,
                        property: 'property2'
                    }
                ]
            }
        };
        componentFixture.instance.id = 1;
        componentFixture.instance.hideOwn = true;
        componentFixture.instance.subEntityService = customersService;

        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onDropdownClick()
            .subscribe(res => {
                expect(res.length).toEqual(1);
                expect(res[0].id).toEqual(2);
                expect(res[0].property).toEqual('property2');
            });
    }));

    it('should filtering resources', async(() => {
        componentFixture.instance.resources = [
            {
                id: 1,
                country: 'Ukraine'
            },
            {
                id: 2,
                country: 'Germany'
            }
        ];
        componentFixture.instance.subEntityService = customersService;

        componentFixture.instance.filterResources({query: '1'});
        expect(componentFixture.instance.filteredResources.length).toEqual(1);
        expect(componentFixture.instance.filteredResources[0].id).toEqual(1);
        expect(componentFixture.instance.filteredResources[0].country).toEqual('Ukraine');

        componentFixture.instance.filterResources({query: 'Germ'});
        expect(componentFixture.instance.filteredResources.length).toEqual(1);
        expect(componentFixture.instance.filteredResources[0].id).toEqual(2);
        expect(componentFixture.instance.filteredResources[0].country).toEqual('Germany');
    }));
});
