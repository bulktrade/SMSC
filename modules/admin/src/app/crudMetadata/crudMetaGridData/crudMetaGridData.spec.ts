import { inject } from '@angular/core/testing';
import { addProviders } from "@angular/core/testing";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { CrudMetaGridData } from "./crudMetaGridData.component";

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudMetaGridData
        ]);
    });

    it('should be translate', inject([ CrudMetaGridData ], (crudMetaGridData) => {
        expect(!!crudMetaGridData.translate).toEqual(true);
    }));
});
