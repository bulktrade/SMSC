import { inject } from '@angular/core/testing';
import { addProviders } from "@angular/core/testing";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { CrudMetaData } from "./crudMetaData.components";

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudMetaData
        ]);
    });

    it('should be translate', inject([ CrudMetaData ], (crudMetaData) => {
        expect(!!crudMetaData.translate).toEqual(true);
    }));
});
