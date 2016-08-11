import {
    inject,
    addProviders
} from '@angular/core/testing';
import {CRUD_PROVIDERS} from "../common/crudProviders";
import {CrudEdit} from "./crud.edit";

describe('Crud Edit', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudEdit
        ]);
    });

    it('should be defined grid options', inject([ CrudEdit ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));

    it('name button should be is update', inject([ CrudEdit ], (crudEdit) => {
        let buttonName = 'Update';
        expect(crudEdit.btnName).toEqual(buttonName);
    }));

});
