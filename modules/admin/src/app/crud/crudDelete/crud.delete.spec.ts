import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { CrudDelete } from "./crud.delete.component";
import { Location } from "@angular/common";
import { HttpModule } from "@angular/http";

class MockLocation {};

describe('Crud Delete', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudDelete,
                { provide: Location, useClass: MockLocation }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudDelete ], (crudDelete) => {
        expect(crudDelete.crudService.gridOptions).toBeDefined();
    }));

});
