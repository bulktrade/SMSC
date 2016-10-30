import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router } from '@angular/router';
import { DashboardCrudUpdateComponent } from './dashboard-box-update.component';
import { DashboardService } from '../dashboard.service';
import { CRUD_PROVIDERS } from '../../crud/common/crud-providers';
import { GridService } from '../../services/grid.service';
import { CrudService } from '../../crud/crud.service';

class MockLocation {}

describe('DashboardComponent crud update', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardCrudUpdateComponent,
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

    it('should be defined resolveData', inject([DashboardCrudUpdateComponent], (box) => {
        expect(box.resolveData).toBeDefined();
    }));

    it('should be defined btnName', inject([DashboardCrudUpdateComponent], (box) => {
        expect(box.btnName).toBeDefined();
    }));

    it('should be defined grid options', inject([ DashboardCrudUpdateComponent ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));

    it('should be location', inject([ DashboardCrudUpdateComponent ], (crudEdit) => {
        expect(!!crudEdit.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ DashboardCrudUpdateComponent ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
    }));

    it('should be rowData', inject([ DashboardCrudUpdateComponent ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
    }));
});
