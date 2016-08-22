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

    it('should be location', inject([ CrudCreate ], (crudCreate) => {
        expect(!!crudCreate.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.model.columnDefs).toBeDefined();
    }));

    it('should be rowData', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.model.rowData).toBeDefined();
    }));

});
