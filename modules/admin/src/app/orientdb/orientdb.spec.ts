import {
    inject,
    addProviders
} from '@angular/core/testing';
import { ODatabaseService } from './orientdb.service';
import {APP_PROVIDERS} from "../index";
import {CRUD_PROVIDERS} from "../crud/common/crudProviders";

describe('ODatabaseService', () => {

    beforeEach(() => {
        addProviders([
            ...APP_PROVIDERS,
            ...CRUD_PROVIDERS
        ]);
    });

    it('should be defined authHttp', inject([ ODatabaseService ], (db) => {
        expect(db.authHttp).toBeDefined();
    }));

    it('evalResponse should be is true', inject([ ODatabaseService ], (db) => {
        expect(db.evalResponse).toBeTruthy();
    }));

});

