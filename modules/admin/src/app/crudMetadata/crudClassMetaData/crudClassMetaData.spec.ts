import { inject } from '@angular/core/testing';
import { addProviders } from "@angular/core/testing";
import { CrudClassMetaData } from "./crudClassMetaData.component";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";

describe('CrudClassMetaData', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudClassMetaData
        ]);
    });

    it('should be translate', inject([ CrudClassMetaData ], (crudClassMetaData) => {
        expect(!!crudClassMetaData.translate).toEqual(true);
    }));
});
