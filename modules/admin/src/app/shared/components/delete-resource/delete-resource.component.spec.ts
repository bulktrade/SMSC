import {async, inject, TestBed} from "@angular/core/testing";
import {ActivatedRoute} from "@angular/router";
import {MockBackend} from "@angular/http/testing";
import {Http, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {Observable} from "rxjs";

import {DeleteResourceComponent, DeleteResourceModule} from "./delete-resource.component";
import {ComponentHelper} from "../../component-fixture";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../test/stub/config.service";
import {APP_PROVIDERS} from "../../../app.module";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {CrudRepositoryService} from "../../crud-repository.spec";

describe('Component: DeleteResourceComponent', () => {
    let componentFixture: ComponentHelper<DeleteResourceComponent> =
        new ComponentHelper<DeleteResourceComponent>(null, null, null, null);
    let mockBackend, service: CrudRepositoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DeleteResourceModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ActivatedRoute, useValue: {params: Observable.of({customerId: 40000})}},
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

        componentFixture.fixture = TestBed.createComponent(DeleteResourceComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([CrudRepositoryService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('should delete the resource', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance, 'onBack');
        componentFixture.instance.crudRepository = service;

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'SUCCESS_DELETE_RESOURCE');
        expect(componentFixture.instance.onBack).toHaveBeenCalled();
    }));

    it('should emit the onDeleteResource event', () => {
        spyOn(componentFixture.instance.onDeleteResource, 'emit');
        componentFixture.instance.id = 1;
        componentFixture.instance.custom = true;
        componentFixture.instance.deleteResource();
        expect(componentFixture.instance.onDeleteResource.emit).toHaveBeenCalledWith(componentFixture.instance.id);
    });

    it('should get an error while deleting the resource', async(() => {
        componentFixture.instance.crudRepository = service;
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance.crudRepository, 'deleteResourceById').and
            .returnValues(Observable.create(o => {
                o.error(false);
                o.complete()
            }));

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'ERROR_DELETE_RESOURCE');
    }));

    it('.onBack()', async(() => {
        spyOn(componentFixture.instance.location, 'back');
        componentFixture.instance.onBack();
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.message = 'foo';
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.msgs[0].severity).toEqual('warn');
        expect(componentFixture.instance.msgs[0].detail).toEqual('foo');
    }));
});
