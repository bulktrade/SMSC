import {
    inject,
    addProviders
} from '@angular/core/testing';
import { CrudModify } from "./crud.modify.component";
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { Location } from "@angular/common";

class MockLocation {};

describe('Crud Modify', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudModify,
            { provide: Location, useClass: MockLocation }
        ]);
    });

    it('should be defined grid options', inject([ CrudModify ], (crudModify) => {
        expect(crudModify.crudService.gridOptions).toBeDefined();
    }));

    it('should be location', inject([ CrudModify ], (crudModify) => {
        expect(!!crudModify.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ CrudModify ], (crudModify) => {
        expect(crudModify.model.columnDefs).toBeDefined();
    }));

    it('should be rowData', inject([ CrudModify ], (crudModify) => {
        expect(crudModify.model.rowData).toBeDefined();
    }));

});
