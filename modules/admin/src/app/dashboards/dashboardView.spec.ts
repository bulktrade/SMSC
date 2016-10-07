import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { APP_PROVIDERS } from '../app.module';
import { DashboardView } from './dashboardView.component';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DashboardService } from './dashboardService';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { CrudService } from '../crud/crud.service';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { GridService } from '../services/grid.service';
import { HTTP_PROVIDERS } from '../common/mock/httpProviders';
import { Router } from '@angular/router';

class MockLocation {}

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
                { provide: Router, useClass: MockLocation },
                { provide: Location, useClass: MockLocation },
                ...HTTP_PROVIDERS,
                CrudService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined CSS boxes', inject([DashboardView], (box) => {
        expect(box.boxesCss).toBeDefined();
    }));

    it('should be defined boxes list', inject([DashboardView], (box) => {
        expect(box.boxes).toBeDefined();
    }));

    it('Get box class name', inject([DashboardView], (box) => {
        expect(box.getBoxClass(25, 'chart')).toBeDefined('chart-m');
    }));
});
