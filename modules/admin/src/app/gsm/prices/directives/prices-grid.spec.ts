import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {PricesGrid} from './prices-grid';
import {ElementRef, provide} from '@angular/core';
import {MockConnection} from '@angular/http/testing';

describe('PricesGrid', () => {
    // beforeEachProviders(() => [
    //     PricesGrid,
    //     provide(ElementRef, { useValue: new MockConnection() })
    // ]);

    // it('should log store', inject([ PricesGrid ], (prices) => {
    //     spyOn(prices, 'mainStore');
    //     prices.mainStore();

    //     expect(prices.mainStore).toBeDefined();
    // }));

});
