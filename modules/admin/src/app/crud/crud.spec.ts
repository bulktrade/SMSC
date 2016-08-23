import {
    inject
} from '@angular/core/testing';
import { CRUD_PROVIDERS } from "./common/crudProviders";
import { Crud } from "./crud.component";
import { addProviders } from "@angular/core/testing/testing";

describe('Crud', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            Crud
        ]);
    });

    it('should be defined router', inject([ Crud ], (crud) => {
        expect(crud.router).toBeDefined();
    }));

});