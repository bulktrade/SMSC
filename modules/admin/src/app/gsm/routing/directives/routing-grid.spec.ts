import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/core/testing';
import {RoutingGrid} from './routing-grid';
import {ElementRef, provide} from '@angular/core';
import {MockApplicationRef} from '@angular/core/testing';

describe('RoutingGrid', () => {
    beforeEachProviders(() => [
        RoutingGrid,
        provide(ElementRef, { useValue: new MockApplicationRef() }),
    ]);

    it('should log store', inject([ RoutingGrid ], (routing) => {
        spyOn(routing, 'mainStore');
        routing.mainStore();

        expect(routing.mainStore).toBeDefined();
    }));

});
