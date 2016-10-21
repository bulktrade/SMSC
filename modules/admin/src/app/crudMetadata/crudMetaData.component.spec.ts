import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';
import { CrudMetaDataComponent } from './crudMetaData.components';
import { HttpModule } from '@angular/http';

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaDataComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudMetaDataComponent ], (crudMetaData) => {
        expect(!!crudMetaData.translate).toEqual(true);
    }));
});
