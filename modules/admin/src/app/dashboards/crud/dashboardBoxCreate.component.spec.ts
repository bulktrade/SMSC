import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router } from '@angular/router';
import { CrudService } from '../../crud/crud.service';
import { GridService } from '../../services/grid.service';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { DashboardService } from '../dashboard.service';
import { DashboardCrudCreateComponent } from './dashboardBoxCreate.component';

class MockLocation {}

describe('DashboardComponent crud create', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardCrudCreateComponent,
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
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined resolveData', inject([DashboardCrudCreateComponent], (box) => {
        expect(box.resolveData).toBeDefined();
    }));

    it('should be defined btnName', inject([DashboardCrudCreateComponent], (box) => {
        expect(box.btnName).toBeDefined();
    }));
});
