import {TestBed, async, inject} from "@angular/core/testing";
import {CustomersViewComponent} from "./customers-view.component";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {SortType} from "../../shared/sort.model";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {ConfigService} from "../../config/config.service";
import {Action} from "../../shared/components/one-to-many/one-to-many.model";

describe('Component: CustomersViewComponent', () => {
    let componentFixture: ComponentHelper<CustomersViewComponent> =
        new ComponentHelper<CustomersViewComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomersModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersViewComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have `<p-dataTable>` and `<p-paginator>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-dataTable')).toBeTruthy();
            expect(componentFixture.element.querySelector('p-paginator')).toBeTruthy();
        });
    }));

    it('should sort rows by field name', async(() => {
        componentFixture.instance.onSort({field: 'country', order: 1});
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.ASC);
        componentFixture.instance.onSort({field: 'country', order: -1});
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.DESC);
    }));

    it('should get rows with pagination', async(() => {
        let event = {
            page: 0,
            rows: 10
        };
        componentFixture.instance.onPaginate(event);
        expect(componentFixture.instance.pagination.number).toEqual(0);
        expect(componentFixture.instance.pagination.size).toEqual(10);
    }));

    it('should get rows with filter', async(() => {
        let event = {
            column: 'company',
            filterName: 'globalFilter'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 204, body: {}});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.searchModel[event.filterName] = 'SMSC';
        componentFixture.instance.onFilter(event.column, event.filterName);
        expect(componentFixture.instance.filters['company']).toEqual('SMSC');
    }));

    it('should delete selected customers', async(() => {
        let data = <any>{
            _links: {
                self: {
                    href: ''
                }
            },
            _embedded: {
                customers: []
            },
            page: {
                totalElements: 10
            }
        };
        componentFixture.instance.selectedRows = [data];
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 204, body: data});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.onDeleteCustomers()
            .subscribe(res => {
                expect(res).toBeDefined();
            });
    }));

    it('.onRowExpand()', async(() => {
        componentFixture.instance.onRowExpand({data: {id: 1}});
        expect(componentFixture.instance.contactsModel[1])
            .toEqual(jasmine.objectContaining({propertyName: 'contacts', action: Action.View, entity: null}));
        expect(componentFixture.instance.usersModel[1])
            .toEqual(jasmine.objectContaining({propertyName: 'users', action: Action.View, entity: null}));
    }));

    it('.onEditComplete() - successful response', async(() => {
        spyOn(componentFixture.instance, 'setRowData');
        spyOn(componentFixture.instance.notifications, 'createNotification');
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });

        componentFixture.instance.onEditComplete(<any>{data: {_links: {self: {href: ''}}}});
        expect(componentFixture.instance.setRowData).toHaveBeenCalled();
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdateCustomer');
    }));

    it('.onEditComplete() - error response', async(() => {
        spyOn(componentFixture.instance, 'setRowData');
        spyOn(componentFixture.instance.notifications, 'createNotification');
        mockBackend.connections.subscribe(connection => {
            connection.mockError(new Error());
        });

        componentFixture.instance.onEditComplete(<any>{data: {_links: {self: {href: ''}}}});
        expect(componentFixture.instance.setRowData).toHaveBeenCalled();
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorUpdateCustomer');
    }));
});
