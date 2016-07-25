import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';

import {ODatabaseService} from "../orientdb/orientdb.service";
import {CustomerModel} from "./customers.model";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {provide} from "@angular/core";
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {CustomerUsers} from "./customers.users";

describe('Customer Users', () => {
    beforeEachProviders(() => [
        CustomerUsers,
        HTTP_PROVIDERS,
        provide(ODatabaseService, {
            useFactory: (http: Http) => new ODatabaseService('/orientdb/smsc', http),
            deps: [Http]
        }),
        CustomerModel,
        TranslateService,
        CustomerUsers,
        provide(TranslateLoader, {
            useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
            deps: [Http]
        })
    ]);

    it('should be 2 columns', inject([ CustomerUsers ], (customerUsers) => {
        expect(customerUsers.columnDefs.length).toBe(2);
    }));

});
