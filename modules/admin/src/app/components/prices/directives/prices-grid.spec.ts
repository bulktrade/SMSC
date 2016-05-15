import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/testing';
import {PricesGrid} from './prices-grid';
import {ElementRef} from '@angular/core';

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
