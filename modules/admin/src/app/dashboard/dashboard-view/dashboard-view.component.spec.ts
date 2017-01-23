import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view.component';
import { DashboardService } from '../dashboard.service';
import { CRUD_PROVIDERS } from '../../crud/common/crud-providers';
import { GridService } from '../../services/grid.service';
import { APP_PROVIDERS } from '../../app.module';
import { HTTP_PROVIDERS } from '../../common/mock/http-providers';
import { CrudService } from '../../crud/crud.service';
import { DashboardList } from '../models/dashboard-list';
import { DashboardListItem } from '../models/dashboard-list-item';
import { DashboardBox } from '../models/dashboard-box';
import { DashboardResizeConfig } from '../models/dashboard-resize-config';
import { BoxResize } from '../models/dashboard-box-enum';

class MockLocation {
}

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

    let box;

    it('Init box classes', inject([DashboardViewComponent], (box) => {
        box.dashboardService.getDashboardBoxes().subscribe((res) => {
            this.boxesCss = new DashboardList<string>();
            this.boxes = new DashboardListItem<DashboardBox>();
            this.boxes.merge(res);
            box = res[0];
            // this.updateClasses();
        });
    }));

    it('Box resize', inject([DashboardViewComponent], (boxView) => {
        boxView.dashboardService.getDashboardBoxes().subscribe((res) => {
            let box: DashboardBox = res[0];

            let config: DashboardResizeConfig = {
                type: BoxResize.WIDTH,
                width: 25,
                height: 25,
                chart: null
            }

            boxView.resizeBox(config, 0, box);
        });
    }))

    it('should be defined CSS boxes', inject([DashboardViewComponent], (box) => {
        expect(box.boxesCss).toBeDefined();
    }));

    it('should be defined boxes list', inject([DashboardViewComponent], (box) => {
        expect(box.boxes).toBeDefined();
    }));

    it('Get box class name', inject([DashboardViewComponent], (box) => {
        expect(box.getBoxClass(25, 'chart')).toBeDefined('chart-m');
    }));

    it('Update classes', inject([DashboardViewComponent], (boxView) => {
        boxView.updateClasses();
    }));
});
