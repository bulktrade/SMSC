import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { APP_PROVIDERS } from '../app.module';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DashboardService } from './dashboardService';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { CrudService } from '../crud/crud.service';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { GridService } from '../services/grid.service';
import { Observable } from 'rxjs';
import { DashboardBox } from './models/dashboardBox';
import { HTTP_PROVIDERS } from '../common/mock/httpProviders';
import { Router } from '@angular/router';

class MockLocation {}

describe('Dashboard service', () => {
    let boxes;
    let box: DashboardBox;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardService,
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

    it('Get dashboard boxes', inject([DashboardService], (service) => {
        boxes = service.getDashboardBoxes();

        expect(boxes instanceof Observable).toBeTruthy();
    }));

    it('Get dashboard box', inject([DashboardService], (service) => {
        boxes.subscribe((res) => {
            if (res.length > 0) {
                box = res[0];

                let resBox = service.getDashboardBox(box.metaData.rid);

                expect(resBox instanceof Observable).toBeTruthy();
            }
        });
    }));

    it('Update box size', inject([DashboardService], (service) => {
        boxes.subscribe((res) => {
            if (res.length > 0) {
                box = res[0];

                let size: Object = {
                    width: 25,
                    height: 25
                };

                let result = service.updateBoxSize(size, box);

                expect(result instanceof Observable).toBeTruthy();
            }
        });
    }));

    it('Delete box', inject([DashboardService], (service) => {
        boxes.subscribe((res) => {
            if (res.length > 0) {
                box = res[0];

                let result = service.deleteBox(box);

                expect(result instanceof Observable).toBeTruthy();
            }
        });
    }));

    it('Batch update dashboard box', inject([DashboardService], (service) => {
        boxes.subscribe((res) => {
            if (res.length > 0) {
                let result = service.batchUpdateDashboardBox(res);

                expect(result instanceof Observable).toBeTruthy();
            }
        });
    }));
});
