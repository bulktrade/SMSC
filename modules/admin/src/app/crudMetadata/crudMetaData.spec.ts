import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { CrudMetaData } from "./crudMetaData.components";
import { HttpModule } from "@angular/http";

describe('CrudMetaGridData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaData
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudMetaData ], (crudMetaData) => {
        expect(!!crudMetaData.translate).toEqual(true);
    }));
});
