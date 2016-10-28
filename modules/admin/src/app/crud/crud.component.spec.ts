import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from './common/crud-providers';
import { CrudComponent } from './crud.component';
import { HttpModule } from '@angular/http';

describe('CrudComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined router', inject([CrudComponent], (crud) => {
        expect(crud.router).toBeDefined();
    }));

});
