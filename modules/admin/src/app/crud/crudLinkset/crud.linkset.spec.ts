import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../common/crudProviders";
import { CrudView } from "./crud.view.component";
import { HttpModule } from "@angular/http";

describe('Crud View', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudView
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined grid options', inject([ CrudView ], (crudView) => {
        expect(crudView.crudService.gridOptions).toBeDefined();
    }));

});
