import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { APP_PROVIDERS } from '../app.module';
import { DashboardViewComponent } from './dashboard-view.component';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DashboardService } from './dashboard.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { CrudService } from '../crud/crud.service';
import { CRUD_PROVIDERS } from '../crud/common/crud-providers';
import { GridService } from '../services/grid.service';
import { HTTP_PROVIDERS } from '../common/mock/http-providers';
import { Router } from '@angular/router';

class MockLocation {}

describe('DashboardComponent view', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardViewComponent,
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

    it('should be defined CSS boxes', inject([DashboardViewComponent], (box) => {
        expect(box.boxesCss).toBeDefined();
    }));

    it('should be defined boxes list', inject([DashboardViewComponent], (box) => {
        expect(box.boxes).toBeDefined();
    }));

    it('Get box class name', inject([DashboardViewComponent], (box) => {
        expect(box.getBoxClass(25, 'chart')).toBeDefined('chart-m');
    }));
});
