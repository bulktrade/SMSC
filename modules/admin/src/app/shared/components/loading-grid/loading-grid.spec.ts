import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LoadingGridComponent } from "./loading-grid.component";
import { LoadingGridService } from "../../../services/loading/loading-grid.service";

describe('Loading Grid', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoadingGridComponent,
                LoadingGridService
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
