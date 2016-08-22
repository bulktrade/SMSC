import {
    inject,
    addProviders
} from '@angular/core/testing';
import { LoadingGrid } from "./loadingGrid";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";

describe('Loading Grid', () => {
    beforeEach(() => {
        addProviders([
            LoadingGrid,
            ...CRUD_PROVIDERS
        ]);
    });

    it('loading spinner should be true', inject([ LoadingGrid ], (loadingGrid) => {
        loadingGrid.service.start();

        expect(loadingGrid.service.loadingGridData).toBeTruthy();
    }));

    it('loading spinner should be false', inject([ LoadingGrid ], (loadingGrid) => {
        loadingGrid.service.stop();

        expect(loadingGrid.service.loadingGridData).toBeFalsy();
    }));

});
