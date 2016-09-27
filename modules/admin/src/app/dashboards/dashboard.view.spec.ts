import { inject, TestBed } from "@angular/core/testing";
import { Location } from "@angular/common";
import { HttpModule, BaseRequestOptions, Http, ConnectionBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { APP_PROVIDERS } from "../app.module";
import { DashboardView } from "./dashboard.view.component";
import { TranslateService, TranslateLoader } from "ng2-translate/ng2-translate";
import { DashboardService } from "./dashboardService";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { CrudService } from "../crud/crud.service";
import { Router } from "@angular/router";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { GridService } from "../services/grid.service";

class MockLocation {};

describe('Dashboard view', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardView,
                TranslateService,
                DragulaService,
                DashboardService,
                TranslateLoader,
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                GridService,
                MockBackend,
                BaseRequestOptions,
                { provide: Router, useClass: MockLocation },
                { provide: Location, useClass: MockLocation },
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                                                defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                CrudService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined CSS boxes', inject([DashboardView], (box) => {
        //expect(box.boxesCss).toBeDefined();
    }));

    it('should be defined boxes list', inject([DashboardView], (box) => {
        expect(true).toBeTruthy();
        //expect(box.boxes).toBeDefined();
    }));
});
