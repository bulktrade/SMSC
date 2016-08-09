import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';
import {crudProviders} from "../common/crudProviders";
import {CrudView} from "./crud.view";

describe('Customer View', () => {
    beforeEachProviders(() => [
        ...crudProviders,
        CrudView
    ]);

    it('should be defined grid options', inject([ CrudView ], (crudView) => {
        expect(crudView.crudService.gridOptions).toBeDefined();
    }));

});
