import {inject, TestBed} from "@angular/core/testing";
import {Location} from "@angular/common";
import {HttpModule} from "@angular/http";
import {TranslateService, TranslateLoader} from "ng2-translate/ng2-translate";
import {DashboardService} from "./dashboardService";
import {DragulaService} from "ng2-dragula/ng2-dragula";
import {CrudService} from "../crud/crud.service";
import {Router} from "@angular/router";
import {CRUD_PROVIDERS} from "../crud/common/crudProviders";
import {GridService} from "../services/grid.service";
import {SidebarService} from "../sidebar/sidebarService";
import {DashboardBoxComponent} from "./dashboardBox.component";
import {BaThemeConfigProvider} from "./chart/theme/theme.configProvider";
import webpack = require("webpack");
import {BoxResize} from "./models/dashboardBoxEnum";

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
                CrudService,
                BaThemeConfigProvider
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined config', inject([ DashboardBoxComponent ], (box) => {
        expect(box.config).toBeDefined();
    }));

    it('EventEmitter resize box', inject([DashboardBoxComponent], (box) => {
        box.resizeBox.subscribe((res) => {
            expect(res).toBeDefined();
        });

        box.emitResizeBox({val: 25, type: BoxResize.HEIGHT});
    }));

    it('EventEmitter remove box', inject([DashboardBoxComponent], (box) => {
        box.resizeBox.subscribe((res) => {
            expect(res).toBeDefined();
        });

        box.emitRemoveBox();
    }));

    it('EventEmitter edit box', inject([DashboardBoxComponent], (box) => {
        box.resizeBox.subscribe((res) => {
            expect(res).toBeDefined();
        });

        box.emitEditBox();
    }));
});
