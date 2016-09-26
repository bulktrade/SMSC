import { inject, TestBed } from "@angular/core/testing";
import { Location } from "@angular/common";
import { HttpModule } from "@angular/http";
import { DropdownDirective } from "ng2-bootstrap/ng2-bootstrap";
import { OrderBy } from "./sorts/orderby";
import { TranslateService, TranslateLoader } from "ng2-translate/ng2-translate";
import { DashboardService } from "./dashboardService";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { CrudService } from "../crud/crud.service";
import { Router } from "@angular/router";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { GridService } from "../services/grid.service";
import { DashboardBoxComponent } from "./dashboard.box.component";
import { SidebarService } from "../sidebar/sidebarService";

class MockLocation {};

describe('Dashboard box', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardBoxComponent,
                TranslateService,
                DragulaService,
                DashboardService,
                TranslateLoader,
                ...CRUD_PROVIDERS,
                GridService,
                SidebarService,
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

    it('should be defined config', inject([ DashboardBoxComponent ], (box) => {
        expect(box.config).toBeDefined();
    }));
});
