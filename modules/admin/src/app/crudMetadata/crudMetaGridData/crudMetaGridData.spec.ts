import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { CrudMetaGridData } from "./crudMetaGridData.component";
import { HttpModule } from "@angular/http";

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaGridData
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudMetaGridData ], (crudMetaGridData) => {
        expect(!!crudMetaGridData.translate).toEqual(true);
    }));
});
