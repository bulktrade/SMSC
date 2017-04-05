import {async, inject, TestBed} from "@angular/core/testing";
import {ActivatedRoute} from "@angular/router";
import {MockBackend} from "@angular/http/testing";
import {Response, ResponseOptions, XHRBackend} from "@angular/http";
import {Observable} from "rxjs";

import {DeleteResourceComponent, DeleteResourceModule} from "./delete-resource.component";
import {ComponentHelper} from "../../component-fixture";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../test/stub/config.service";
import {APP_PROVIDERS} from "../../../app.module";

describe('Component: DeleteResourceComponent', () => {
    let componentFixture: ComponentHelper<DeleteResourceComponent> =
        new ComponentHelper<DeleteResourceComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DeleteResourceModule],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ActivatedRoute, useValue: {params: Observable.of({customerId: 40000})}},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(DeleteResourceComponent);
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

    it('should delete the resource', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance, 'onBack');

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successDeleteCustomer');
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
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(console, 'error');

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorDeleteCustomer');
        expect(console.error).toHaveBeenCalledWith(new Response(new ResponseOptions({status: 500})));
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
