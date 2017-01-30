import { inject, TestBed } from '@angular/core/testing';
import { CrudMetaDataComponent } from './crud-meta-data.components';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "ng2-translate";

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudMetaDataComponent
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        });
    });

    it('should be translate', inject([ CrudMetaDataComponent ], (crudMetaData) => {
        expect(!!crudMetaData.translate).toEqual(true);
    }));
});
