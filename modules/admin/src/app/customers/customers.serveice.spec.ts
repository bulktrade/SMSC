import {
    beforeEachProviders,
    inject,
    it
} from '@angular/core/testing';

import {CustomerService} from "./customers.service";
import {CustomersCrud} from "./customers.crud";
import {ODatabaseService} from "../orientdb/orientdb.service";
import {CustomerModel} from "./customers.model";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {provide} from "@angular/core";
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {CustomerUsers} from "./customers.users";
import {ActivatedRoute, Router} from "@angular/router";

class MockActivatedRoute {}

describe('Customer Service', () => {
    beforeEachProviders(() => [
        CustomerService,
        HTTP_PROVIDERS,
        provide(ODatabaseService, {
            useFactory: (http: Http) => new ODatabaseService('/orientdb/smsc', http),
            deps: [Http]
        }),
        CustomerModel,
        CustomersCrud,
        TranslateService,
        CustomerUsers,
        provide(TranslateLoader, {
	        useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
	        deps: [Http]
	    }),
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: Router, useClass: MockActivatedRoute}
    ]);

    it('should be 13 columns', inject([ CustomersCrud ], (customerCrud) => {
    	expect(customerCrud.columnDefs.length).toBe(13);
    }));

});
