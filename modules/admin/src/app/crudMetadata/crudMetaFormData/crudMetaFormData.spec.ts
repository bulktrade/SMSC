import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { CrudMetaFormData } from "./crudMetaFormData.component";
import { HttpModule } from "@angular/http";

describe('CrudMetaFormData', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                CrudMetaFormData
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be translate', inject([ CrudMetaFormData ], (crudMetaFormData) => {
        expect(!!crudMetaFormData.translate).toEqual(true);
    }));
});
