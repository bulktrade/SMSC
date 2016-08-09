import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {crudProviders} from "../common/crudProviders";
import {CrudDelete} from "./crud.delete";

describe('Customer Delete', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        CrudDelete
    ]);

    it('should be defined grid options', inject([ CrudDelete ], (crudDelete) => {
        expect(crudDelete.crudService.gridOptions).toBeDefined();
    }));

});
