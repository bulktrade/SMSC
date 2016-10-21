import { inject, TestBed } from '@angular/core/testing';
import { CrudClassMetaDataComponent } from './crudClassMetaData.component';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { HttpModule } from '@angular/http';

describe('CrudClassMetaDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudClassMetaDataComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudClassMetaDataComponent ], (crudClassMetaData) => {
        expect(!!crudClassMetaData.translate).toEqual(true);
    }));
});
