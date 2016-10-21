import { inject, TestBed } from '@angular/core/testing';
import { LoadingGridComponent } from './loadingGrid.component';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { HttpModule } from '@angular/http';

describe('Loading Grid', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoadingGridComponent,
                ...CRUD_PROVIDERS
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('loading spinner should be true', inject([LoadingGridComponent], (loadingGrid) => {
        loadingGrid.service.start();

        expect(loadingGrid.service.loading).toBeTruthy();
    }));

    it('loading spinner should be false', inject([LoadingGridComponent], (loadingGrid) => {
        loadingGrid.service.stop();

        expect(loadingGrid.service.loading).toBeFalsy();
    }));

});
