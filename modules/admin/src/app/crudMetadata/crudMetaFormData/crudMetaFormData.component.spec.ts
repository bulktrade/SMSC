import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { CrudMetaFormDataComponent } from './crudMetaFormData.component';
import { HttpModule } from '@angular/http';

describe('CrudMetaFormDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaFormDataComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([CrudMetaFormDataComponent], (crudMetaFormData) => {
        expect(!!crudMetaFormData.translate).toEqual(true);
    }));
});
