import { inject, TestBed } from '@angular/core/testing';
import { CrudUpdate } from './crudUpdate.component';
import { CRUD_PROVIDERS } from '../common/crudProviders';
import { Location } from '@angular/common';
import { HttpModule } from '@angular/http';

class MockLocation {};

describe('Crud Edit', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudUpdate,
                { provide: Location, useClass: MockLocation }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudUpdate ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));

    it('should be location', inject([ CrudUpdate ], (crudEdit) => {
        expect(!!crudEdit.location).toEqual(true);
    }));

    it('should be columnDefs', inject([ CrudUpdate ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
    }));

    it('should be rowData', inject([ CrudUpdate ], (crudEdit) => {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
    }));

});
