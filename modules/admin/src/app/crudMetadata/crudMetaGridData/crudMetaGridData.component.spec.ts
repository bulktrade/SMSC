import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { CrudMetaGridDataComponent } from './crudMetaGridData.component';
import { HttpModule } from '@angular/http';

describe('CrudMetaGridDataComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaGridDataComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([CrudMetaGridDataComponent], (crudMetaGridData) => {
        expect(!!crudMetaGridData.translate).toEqual(true);
    }));
});
