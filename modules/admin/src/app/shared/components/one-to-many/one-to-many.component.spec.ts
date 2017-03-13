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
import {Action, OneToMany} from "./one-to-many.model";

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
        componentFixture.instance.property = 'customer';
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

    it('.onBack()', async(() => {
        spyOn(componentFixture.instance._onBack, 'emit');
        componentFixture.instance.onBack();
        expect(componentFixture.instance._onBack.emit)
            .toHaveBeenCalledWith(new OneToMany(componentFixture.instance.property, Action.View));
    }));

    it('.onCreate()', async(() => {
        spyOn(componentFixture.instance._onCreate, 'emit');
        componentFixture.instance.onCreate();
        expect(componentFixture.instance._onCreate.emit)
            .toHaveBeenCalledWith(new OneToMany(componentFixture.instance.property, Action.Create));
    }));

    it('.onUpdate()', async(() => {
        spyOn(componentFixture.instance._onUpdate, 'emit');
        componentFixture.instance.onUpdate({});
        expect(componentFixture.instance._onUpdate.emit)
            .toHaveBeenCalledWith(new OneToMany(componentFixture.instance.property, Action.Update, {}));
    }));

    it('.onDelete()', async(() => {
        spyOn(componentFixture.instance._onDelete, 'emit');
        componentFixture.instance.onDelete({});
        expect(componentFixture.instance._onDelete.emit)
            .toHaveBeenCalledWith(new OneToMany(componentFixture.instance.property, Action.Delete, {}));
    }));

    it('.ngOnInit() - successful response', async(() => {
        let data = {
            _embedded: {
                customers: [
                    {
                        property1: 'property1'
                    }
                ]
            }
        };
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: data});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.resources).toEqual(jasmine.objectContaining([
            {
                property1: 'property1'
            }
        ]));
    }));

    it('.ngOnInit() - error response', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('not found'));
        });
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should toggle the loading', async(() => {
        componentFixture.instance.isLoading = false;
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeTruthy();
    }));
});
