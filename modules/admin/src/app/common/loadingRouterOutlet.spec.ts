import { inject, TestBed } from '@angular/core/testing';
import { LoadingRouterOutletComponent } from './loadingRouterOutlet.component';
import { HttpModule } from '@angular/http';
import { LoadingGridService } from '../services/loading/loadingGrid.service';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { LoadingRouterOutletService } from '../services/loading/loadingRouterOutlet.service';

describe('Loading RouterOutlet', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                LoadingRouterOutletService,
                LoadingRouterOutletComponent,
                LoadingGridService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('loading spinner should be true', inject([ LoadingRouterOutletComponent ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.start();

        expect(loadingRouterOutlet.loadingService.loading).toBeTruthy();
    }));

    it('loading spinner should be false', inject([ LoadingRouterOutletComponent ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.stop();

        expect(loadingRouterOutlet.loadingService.loading).toBeFalsy();
    }));

});
