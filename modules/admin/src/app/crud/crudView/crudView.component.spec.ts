import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from '../common/crudProviders';
import { CrudViewComponent } from './crudView.component';
import { HttpModule } from '@angular/http';

describe('CrudComponent View', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudViewComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudViewComponent ], (crudView) => {
        expect(crudView.crudService.gridOptions).toBeDefined();
    }));

});
