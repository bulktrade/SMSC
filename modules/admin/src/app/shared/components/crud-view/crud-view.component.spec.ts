import {async, inject, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {Http, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {TranslateModule, TranslateService} from "ng2-translate";

import {ComponentHelper} from "../../component-fixture";
import {CrudViewComponent} from "./crud-view.component";
import {ActivatedRoute} from "@angular/router";
import {ControlErrorService} from "../../../services/control-error";
import {NotificationService} from "../../../services/notification-service";
import {Component, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {CrudRepositoryService} from "../../crud-repository.spec";
import {ConfigService} from "../../../config/config.service";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigServiceMock} from "../../test/stub/config.service";
import {FormsModule} from "@angular/forms";
import {SortType} from "../../sort.model";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'test-crud-view',
    template: ''
})
class TestCrudViewComponent extends CrudViewComponent<any> {
    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public crudRepositoryService: CrudRepositoryService,
                public controlErrorService: ControlErrorService,
                public notification: NotificationService,
                @Inject(DOCUMENT) public document) {
        super(translate, route, crudRepositoryService, controlErrorService, notification, document);
    }
}

describe('Component: CrudViewComponent', () => {
    let componentFixture: ComponentHelper<TestCrudViewComponent> =
        new ComponentHelper<TestCrudViewComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {
                    provide: CrudRepositoryService,
                    useFactory: (http: Http, configService: ConfigService) => {
                        return new CrudRepositoryService(http, configService)
                    },
                    deps: [Http, ConfigService]
                },
                ControlErrorService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ],
            declarations: [TestCrudViewComponent]
        });

        componentFixture.fixture = TestBed.createComponent(TestCrudViewComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.route.snapshot.data = {
            view: {
                _embedded: {
                    data: []
                },
                page: {
                    totalElements: 10
                }
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should sort ascending', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {_embedded: {mcc: []}}});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onSort({field: 'country', order: 1});
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.ASC);
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should sort descending', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {_embedded: {mcc: []}}});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onSort({field: 'country', order: -1});
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.DESC);
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should get an error while sorting', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('error'));
        });

        componentFixture.instance.onSort({field: 'country', order: -1});
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.DESC);
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should retrieve rows with pagination', async(() => {
        let event = {page: 0, rows: 10};
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({
                body: {
                    _embedded: {
                        mcc: []
                    },
                    page: {
                        totalElements: 10
                    }
                }
            });
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.onPaginate(event);
        expect(componentFixture.instance.pagination.number).toEqual(0);
        expect(componentFixture.instance.pagination.size).toEqual(10);
        expect(componentFixture.instance.pagination.totalElements).toEqual(10);
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should get an error while retrieve rows with pagination', async(() => {
        let event = {page: 0, rows: 10};
        spyOn(componentFixture.instance, 'toggleLoading');
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('error'));
        });

        componentFixture.instance.onPaginate(event);
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
    }));

    it('should filter out rows', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({
                body: {
                    _embedded: {
                        mcc: []
                    },
                    page: {
                        totalElements: 10
                    }
                }
            });
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.onFilter('country', {value: 'Ukraine', name: 'country'});
        expect(componentFixture.instance.filters['country']).toEqual('Ukraine');
    }));

    it('should get an error while filtering out rows', async(() => {
        mockBackend.connections.subscribe(connection => connection.mockError(new Error('error')));
        componentFixture.instance.onFilter('company', {value: 'SMSC', name: 'company'});
    }));

    it('should delete selected rows', async(() => {
        componentFixture.instance.selectedRows = [<any>{mcc: 1, code: 2, country: 'Ukraine'}];
        componentFixture.instance.rowData = [
            <any>{mcc: 1, code: 2, country: 'Ukraine'},
            <any>{mcc: 3, code: 3, country: 'Ukraine'}
        ];
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance, 'toggleDeleteWindow');
        spyOn(componentFixture.instance.crudRepositoryService, 'deleteResource').and.returnValue(Observable.of(true));

        componentFixture.instance.onMultipleDelete();

        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'SUCCESS_DELETE_RESOURCE');
        expect(componentFixture.instance.toggleDeleteWindow).toHaveBeenCalled();
    }));

    it('should get an error while deleting selected rows', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        componentFixture.instance.selectedRows = [<any>{mcc: 1, code: 2, country: 'Ukraine'}];
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error('error'));
        });
        componentFixture.instance.onMultipleDelete();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'ERROR_DELETE_RESOURCE');
    }));

    it('.onEditComplete() - successful response', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {mcc: 1, code: 2, country: 'Ukraine'}});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.onEditComplete(<any>{data: {_links: {self: {href: ''}}}});
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'SUCCESS_UPDATE_RESOURCE');
    }));

    it('.onEditComplete() - error response', async(() => {
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance.controlErrorService, 'gridControlErrors');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {foo: 'bar'}});
            connection.mockError(new Response(response));
        });
        componentFixture.instance.onEditComplete(<any>{data: {_links: {self: {href: ''}}}});
        expect(componentFixture.instance.controlErrorService.gridControlErrors).toHaveBeenCalled();
    }));

    it('.onResize()', async(() => {
        spyOn(componentFixture.instance, 'getTableHeaderHeight');
        spyOn(componentFixture.instance, 'getTableBodyHeight');
        spyOn(componentFixture.instance, 'isMobileDevice');
        componentFixture.instance.onResize({target: {innerWidth: 600}});
        expect(componentFixture.instance.getTableBodyHeight).toHaveBeenCalled();
        expect(componentFixture.instance.getTableHeaderHeight).toHaveBeenCalled();
        expect(componentFixture.instance.isMobileDevice).toHaveBeenCalledWith(600);
    }));

    it('should retrieve the row data', () => {
        expect(componentFixture.instance.getRowData()).toBeDefined();
    });

    it('should retrieve the number of mcc', () => {
        expect(componentFixture.instance.getNumberResources()).toEqual(10);
    });

    it('.isMobileDevice()', () => {
        expect(componentFixture.instance.isMobileDevice(600)).toBeTruthy();
    });

    it('.toggleDeleteWindow()', () => {
        componentFixture.instance.isDeleteWindow = false;
        componentFixture.instance.toggleDeleteWindow();
        expect(componentFixture.instance.isDeleteWindow).toBeTruthy();
    });

    it('.toggleLoading()', () => {
        componentFixture.instance.isLoading = true;
        spyOn(componentFixture.instance, 'ngAfterViewInit');
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeFalsy();
        expect(componentFixture.instance.ngAfterViewInit).toHaveBeenCalled();
    });
});
