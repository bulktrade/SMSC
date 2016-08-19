import {
    inject,
    addProviders
} from '@angular/core/testing';
import { CrudCreate } from "./crud.create.component";
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { Location } from "@angular/common";

class MockLocation {};

describe('Crud Create', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudCreate,
            { provide: Location, useClass: MockLocation }
        ]);
    });

    it('should be defined grid options', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.crudService.gridOptions).toBeDefined();
    }));

    it('name button should be is create', inject([ CrudCreate ], (crudCreate) => {
        let buttonName = 'Create';
        expect(crudCreate.btnName).toEqual(buttonName);
    }));

});
