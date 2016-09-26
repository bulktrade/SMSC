import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { HttpModule } from '@angular/http';
import { MetaDataPropertyBindingParameter } from './metaDataBindingParameter';

describe('MetaDataPropertyBindingParameter', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                MetaDataPropertyBindingParameter
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([MetaDataPropertyBindingParameter],
        (metaDataPropertyBindingParameter) => {
            expect(!!metaDataPropertyBindingParameter.translate).toEqual(true);
        }));
});
