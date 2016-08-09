import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {crudProviders} from "../common/crudProviders";
import {CrudEdit} from "./crud.edit";

describe('Customer Edit', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        CrudEdit,
    ]);

    it('should be defined grid options', inject([ CrudEdit ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));

    it('name button should be is update', inject([ CrudEdit ], (crudEdit) => {
        let buttonName = 'Update';
        expect(crudEdit.btnName).toEqual(buttonName);
    }));

});
