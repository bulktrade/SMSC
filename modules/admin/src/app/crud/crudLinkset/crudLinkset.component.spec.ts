import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../common/crudProviders';
import { HttpModule } from '@angular/http';
import { CrudLinksetComponent } from './crudLinkset.component';
import { Location } from '@angular/common';
import { GridService } from '../../services/grid.service';

class MockLocation {};

describe('CrudComponent Linkset', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudLinksetComponent,
                GridService,
                { provide: Location, useClass: MockLocation }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudLinksetComponent ], (crudLinkset) => {
        expect(crudLinkset.crudService.gridOptions).toBeDefined();
    }));

});
