import {
    inject,
    addProviders
} from '@angular/core/testing';
import { LoadingRouterOutlet } from "./loadingRouterOutlet";

describe('Loading RouterOutlet', () => {
    beforeEach(() => {
        addProviders([
            LoadingRouterOutlet
        ]);
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
