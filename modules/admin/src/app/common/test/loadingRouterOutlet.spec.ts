import { inject, TestBed } from '@angular/core/testing';
import { LoadingRouterOutlet } from "../loadingRouterOutlet";
import { HttpModule } from "@angular/http";
import { LoadingRouterOutletService } from "../../services/loading/loadingRouterOutlet.service";

describe('Loading RouterOutlet', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoadingRouterOutlet,
                LoadingRouterOutletService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('loading spinner should be true', inject([ LoadingRouterOutlet ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.start();

        expect(loadingRouterOutlet.loadingService.loading).toBeTruthy();
    }));

    it('loading spinner should be false', inject([ LoadingRouterOutlet ], (loadingRouterOutlet) => {
        loadingRouterOutlet.loadingService.stop();

        expect(loadingRouterOutlet.loadingService.loading).toBeFalsy();
    }));

});
