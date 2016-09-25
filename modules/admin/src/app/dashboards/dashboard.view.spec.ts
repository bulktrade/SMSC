import { inject, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { HttpModule } from "@angular/http";
import { DashboardView } from "./dashboard.view.component";
import { DropdownDirective } from "ng2-bootstrap/ng2-bootstrap";
import { OrderBy } from "./sorts/orderby";
import { TranslateService, TranslateLoader } from "ng2-translate/ng2-translate";
import { DashboardService } from "./dashboardService";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { CrudService } from "../crud/crud.service";
import { Router } from "@angular/router";
import { ODatabaseService } from "../orientdb/orientdb.service";
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
                GridService,
                { provide: Router, useClass: MockLocation },
                { provide: Location, useClass: MockLocation },
                CrudService
            ],
            directives: [
                DropdownDirective
            ],
            pipes: [OrderBy],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined boxes', inject([ DashboardView ], (box) => {
        expect(box.boxes).toBeDefined();
    }));

    it('should be defined boxes list', inject([ DashboardView ], (box) => {
        expect(box.boxesArr).toBeDefined();
    }));
});
