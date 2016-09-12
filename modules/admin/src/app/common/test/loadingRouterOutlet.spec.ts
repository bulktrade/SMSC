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
        loadingRouterOutlet.start();

        expect(loadingRouterOutlet.loading).toBeTruthy();
    }));

    it('loading spinner should be false', inject([ LoadingRouterOutlet ], (loadingRouterOutlet) => {
        loadingRouterOutlet.stop();

        expect(loadingRouterOutlet.loading).toBeFalsy();
    }));

});
