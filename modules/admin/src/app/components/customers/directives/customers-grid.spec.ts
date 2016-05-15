import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/testing';

import {CustomersGrid} from './customers-grid';
import {ElementRef, provide} from '@angular/core';
import {ODatabaseService} from '../../../../Service/OrientDB.service';

describe('CustomersGrid', () => {
    beforeEachProviders(() => [
        CustomersGrid,
        ElementRef,
        provide(ODatabaseService, {
            useFactory: () => new ODatabaseService('http://localhost:3000/orientdb/smsc'),
        }),
    ]);

    it('should log store', inject([ CustomersGrid ], (customer) => {
        spyOn(customer, 'mainStore');
        customer.mainStore();

        expect(customer.mainStore).toBeDefined();
    }));

});
