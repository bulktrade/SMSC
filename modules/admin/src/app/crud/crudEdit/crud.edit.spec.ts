import {
    inject,
    addProviders
} from '@angular/core/testing';
import { CrudEdit } from "./crud.edit.component";
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { Location } from "@angular/common";

class MockLocation {};

describe('Crud Edit', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudEdit,
            { provide: Location, useClass: MockLocation }
        ]);
    });

    it('should be defined grid options', inject([ CrudEdit ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));

    it('should be location', inject([ CrudEdit ], (crudEdit) => {
        expect(!!crudEdit.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ CrudEdit ], (crudEdit) => {
        expect(crudEdit.model.columnDefs).toBeDefined();
    }));

    it('should be rowData', inject([ CrudEdit ], (crudEdit) => {
        expect(crudEdit.model.rowData).toBeDefined();
    }));

});
