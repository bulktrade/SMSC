import { inject, TestBed } from '@angular/core/testing';
import { CrudMetaFormDataComponent } from './crud-meta-form-data.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "ng2-translate";

describe('CrudMetaFormDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudMetaFormDataComponent
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        });
    });

    it('should be translate', inject([CrudMetaFormDataComponent], (crudMetaFormData) => {
        expect(!!crudMetaFormData.translate).toEqual(true);
    }));
});
