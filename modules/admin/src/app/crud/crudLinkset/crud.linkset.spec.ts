import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { HttpModule } from "@angular/http";
import { CrudLinkset } from "./crud.linkset.component";
import { Location } from "@angular/common";

class MockLocation {};

describe('Crud Linkset', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudLinkset,
                { provide: Location, useClass: MockLocation }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudLinkset ], (crudLinkset) => {
        expect(crudLinkset.crudService.gridOptions).toBeDefined();
    }));

});
