import {TestBed, async} from "@angular/core/testing";
import {CustomersViewComponent} from "./customers-view.component";
import {CustomersModule} from "../customers.module";
import {TranslateModule} from "ng2-translate";
import {APP_PROVIDERS} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ComponentHelper} from "../../shared/component-fixture";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
import {SortType} from "../../shared/sort.model";

describe('Component: CustomersViewComponent', () => {
    let componentFixture: ComponentHelper<CustomersViewComponent> =
        new ComponentHelper<CustomersViewComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomersModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [{provide: XHRBackend, useClass: MockBackend}, APP_PROVIDERS]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersViewComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should have `<p-dataTable>` and `<p-paginator>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-dataTable')).toBeTruthy();
            expect(componentFixture.element.querySelector('p-paginator')).toBeTruthy();
        });
    }));

    it('should sort rows by field name', async(() => {
        let event = {
            field: 'country',
            order: 1
        };
        componentFixture.instance.onSort(event);
        expect(componentFixture.instance.sort.orderBy).toEqual('country');
        expect(componentFixture.instance.sort.sortType).toEqual(SortType.ASC);
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
        componentFixture.instance.searchModel[event.filterName] = 'SMSC';
        componentFixture.instance.onFilter(event.column, event.filterName);
        expect(componentFixture.instance.filters['company']).toEqual('SMSC');
    }));
});
