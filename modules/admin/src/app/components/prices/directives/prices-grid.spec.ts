import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';
import {PricesGrid} from './prices-grid';
import {ElementRef} from 'angular2/core';

describe('PricesGrid', () => {
    beforeEachProviders(() => [
        PricesGrid,
        ElementRef
    ]);

    it('should log store', inject([ PricesGrid ], (prices) => {
        spyOn(prices, 'mainStore');
        prices.mainStore();

        expect(prices.mainStore).toBeDefined();
    }));

});
