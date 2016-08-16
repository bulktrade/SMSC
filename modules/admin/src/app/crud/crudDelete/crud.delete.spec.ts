import {
    inject,
    addProviders
} from '@angular/core/testing';
import {CRUD_PROVIDERS} from "../common/crudProviders";
import {CrudDelete} from "./crud.delete.component";

describe('Crud Delete', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudDelete
        ]);
    });

    it('should be defined grid options', inject([ CrudDelete ], (crudDelete) => {
        expect(crudDelete.crudService.gridOptions).toBeDefined();
    }));

});
