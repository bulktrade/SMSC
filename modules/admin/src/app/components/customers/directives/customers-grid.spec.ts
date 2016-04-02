import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';
import {ElementRef} from 'angular2/core';
import {CustomersGrid} from './customers-grid';

describe('CustomersGrid', () => {
    beforeEachProviders(() => [
        CustomersGrid,
        ElementRef
    ]);

    it('should log store', inject([ CustomersGrid ], (customer) => {
        spyOn(customer, 'mainStore');
        customer.mainStore();

        expect(customer.mainStore).toBeDefined();
    }));

});
