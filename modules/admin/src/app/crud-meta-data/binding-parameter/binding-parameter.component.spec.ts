import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crud-providers';
import { HttpModule } from '@angular/http';
import { MetaDataPropertyBindingParameterComponent } from './binding-parameter.component';

describe('MetaDataPropertyBindingParameterComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                MetaDataPropertyBindingParameterComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([MetaDataPropertyBindingParameterComponent],
        (metaDataPropertyBindingParameter) => {
            expect(!!metaDataPropertyBindingParameter.translate).toEqual(true);
        }));
});
