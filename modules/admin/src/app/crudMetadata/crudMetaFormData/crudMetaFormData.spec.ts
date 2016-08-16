import { inject } from '@angular/core/testing';
import { addProviders } from "@angular/core/testing";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { CrudMetaFormData } from "./crudMetaFormData.component";

describe('CrudMetaFormData', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudMetaFormData
        ]);
    });

    it('should be translate', inject([ CrudMetaFormData ], (crudMetaFormData) => {
        expect(!!crudMetaFormData.translate).toEqual(true);
    }));
});
