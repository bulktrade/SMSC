import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {crudProviders} from "./common/crudProviders";
import {Crud} from "./crud.component";

describe('Customer View', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        Crud
    ]);

    it('should be defined router', inject([ Crud ], (crud) => {
        expect(crud.router).toBeDefined();
    }));

});
