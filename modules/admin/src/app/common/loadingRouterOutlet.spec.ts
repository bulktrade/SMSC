import {
    inject,
    addProviders
} from '@angular/core/testing';
import { LoadingGrid } from "./loadingGrid";

describe('Loading Grid', () => {
    beforeEach(() => {
        addProviders([
            LoadingGrid
        ]);
    });

    it('loading spinner should be true', inject([ LoadingGrid ], (loadingGrid) => {
        loadingGrid.start();

        expect(loadingGrid.loadingGridData).toBeTruthy();
    }));

    it('loading spinner should be false', inject([ LoadingGrid ], (loadingGrid) => {
        loadingGrid.stop();

        expect(loadingGrid.loadingGridData).toBeFalsy();
    }));

});
