import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';

import {CustomersGrid} from './customers-grid';
import {ElementRef} from 'angular2/core';
import {ODatabaseService} from '../../../../Service/OrientDB.service';

describe('CustomersGrid', () => {
    beforeEachProviders(() => [
        CustomersGrid,
        ElementRef,
        ODatabaseService
    ]);

    it('should log store', inject([ CustomersGrid ], (customer) => {
        spyOn(customer, 'mainStore');
        customer.mainStore();

        expect(customer.mainStore).toBeDefined();
    }));

});
