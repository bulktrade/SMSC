import {
    inject,addProviders
} from '@angular/core/testing';
import {CRUD_PROVIDERS} from "../common/crudProviders";
import {CrudView} from "./crud.view.component";

describe('Crud View', () => {
    beforeEach(() => {
        addProviders([
            ...CRUD_PROVIDERS,
            CrudView
        ]);
    });

    it('should be defined grid options', inject([ CrudView ], (crudView) => {
        expect(crudView.crudService.gridOptions).toBeDefined();
    }));

});
