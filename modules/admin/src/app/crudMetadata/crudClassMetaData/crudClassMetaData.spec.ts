import { inject, TestBed } from '@angular/core/testing';
import { CrudClassMetaData } from "./crudClassMetaData.component";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { HttpModule } from "@angular/http";

describe('CrudClassMetaData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudClassMetaData
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudClassMetaData ], (crudClassMetaData) => {
        expect(!!crudClassMetaData.translate).toEqual(true);
    }));
});
