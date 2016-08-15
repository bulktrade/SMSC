import {
    inject,
    addProviders
} from '@angular/core/testing';
import {CrudLinkset} from "./crud.linkset";
import {CRUD_PROVIDERS} from "../common/crudProviders";

describe('Crud Linkset', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudLinkset
        ]);
    });

    it('should be defined grid options', inject([ CrudLinkset ], (crudLinkset) => {
        expect(crudLinkset.gridOptions).toBeDefined();
    }));

});
