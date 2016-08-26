import { inject, TestBed } from '@angular/core/testing';
import { CrudCreate } from "./crud.create.component";
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { Location } from "@angular/common";
import { HttpModule } from "@angular/http";

class MockLocation {};

describe('Crud Create', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudCreate,
                { provide: Location, useClass: MockLocation }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.crudService.gridOptions).toBeDefined();
    }));

    it('should be location', inject([ CrudCreate ], (crudCreate) => {
        expect(!!crudCreate.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
    }));

    it('should be rowData', inject([ CrudCreate ], (crudCreate) => {
        expect(crudCreate.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
    }));

});
