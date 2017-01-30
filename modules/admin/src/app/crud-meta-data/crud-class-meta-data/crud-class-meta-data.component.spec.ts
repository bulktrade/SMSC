import { inject, TestBed } from '@angular/core/testing';
import { CrudClassMetaDataComponent } from './crud-class-meta-data.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "ng2-translate";

describe('CrudClassMetaDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudClassMetaDataComponent
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        });
    });

    it('should be translate', inject([ CrudClassMetaDataComponent ], (crudClassMetaData) => {
        expect(!!crudClassMetaData.translate).toEqual(true);
    }));
});
