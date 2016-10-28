import { inject, TestBed } from '@angular/core/testing';
import { LoadingRouterOutletComponent } from './loading-router-outlet.component';
import { HttpModule } from '@angular/http';
import { LoadingGridService } from '../services/loading/loading-grid.service';
import { CRUD_PROVIDERS } from '../crud/common/crud-providers';
import { LoadingRouterOutletService } from '../services/loading/loading-router-outlet.service';

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

    it('loading spinner should be true',
        inject([ LoadingRouterOutletComponent ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.start();

        expect(loadingRouterOutlet.loadingService.loading).toBeTruthy();
    }));

    it('loading spinner should be false',
        inject([ LoadingRouterOutletComponent ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.stop();

        expect(loadingRouterOutlet.loadingService.loading).toBeFalsy();
    }));

});
