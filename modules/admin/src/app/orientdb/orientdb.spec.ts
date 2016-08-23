import { inject, TestBed } from '@angular/core/testing';
import { ODatabaseService } from './orientdb.service';
import { APP_PROVIDERS } from "../index";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { HttpModule } from "@angular/http";

describe('ODatabaseService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined authHttp', inject([ ODatabaseService ], (db) => {
        expect(db.authHttp).toBeDefined();
    }));

    it('evalResponse should be is true', inject([ ODatabaseService ], (db) => {
        expect(db.evalResponse).toBeTruthy();
    }));

});

