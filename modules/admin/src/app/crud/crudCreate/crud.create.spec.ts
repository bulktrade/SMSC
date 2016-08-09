import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {CrudCreate} from "./crud.create";
import {crudProviders} from "../common/crudProviders";

describe('Customer Create', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        CrudCreate,
    ]);

    it('should be defined grid options', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.crudService.gridOptions).toBeDefined();
    }));

    it('name button should be is create', inject([ CrudCreate ], (crudCreate) => {
        let buttonName = 'Create';
        expect(crudCreate.btnName).toEqual(buttonName);
    }));

});
