import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/testing';
import {RoutingGrid} from './routing-grid';
import {ElementRef} from '@angular/core';

describe('RoutingGrid', () => {
    beforeEachProviders(() => [
        RoutingGrid,
        ElementRef
    ]);

    it('should log store', inject([ RoutingGrid ], (routing) => {
        spyOn(routing, 'mainStore');
        routing.mainStore();

        expect(routing.mainStore).toBeDefined();
    }));

});
