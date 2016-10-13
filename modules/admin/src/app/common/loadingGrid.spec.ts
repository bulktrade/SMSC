import { inject, TestBed } from '@angular/core/testing';
import { LoadingGrid } from './loadingGrid.component';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { HttpModule } from '@angular/http';

describe('Loading Grid', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoadingGrid,
                ...CRUD_PROVIDERS
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('loading spinner should be true', inject([LoadingGrid], (loadingGrid) => {
        loadingGrid.service.start();

        expect(loadingGrid.service.loading).toBeTruthy();
    }));

    it('loading spinner should be false', inject([LoadingGrid], (loadingGrid) => {
        loadingGrid.service.stop();

        expect(loadingGrid.service.loading).toBeFalsy();
    }));

});
