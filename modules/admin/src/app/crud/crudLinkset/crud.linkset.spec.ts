import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {CrudLinkset} from "./crud.linkset";
import {crudProviders} from "../common/crudProviders";


describe('Customer Linkset', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        CrudLinkset,
    ]);

    it('should be defined grid options', inject([ CrudLinkset ], (crudLinkset) => {
        expect(crudLinkset.gridOptions).toBeDefined();
    }));

});
