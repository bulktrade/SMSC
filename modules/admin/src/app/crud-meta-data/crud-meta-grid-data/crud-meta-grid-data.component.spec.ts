import { inject, TestBed } from '@angular/core/testing';
import { CrudMetaGridDataComponent } from './crud-meta-grid-data.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "ng2-translate";

describe('CrudMetaGridDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudMetaGridDataComponent
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        });
    });

    it('should be translate', inject([CrudMetaGridDataComponent], (crudMetaGridData) => {
        expect(!!crudMetaGridData.translate).toEqual(true);
    }));
});
