import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "./common/crudProviders";
import { Crud } from "./crud.component";
import { HttpModule } from "@angular/http";

describe('Crud', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                Crud
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined router', inject([ Crud ], (crud) => {
        expect(crud.router).toBeDefined();
    }));

});