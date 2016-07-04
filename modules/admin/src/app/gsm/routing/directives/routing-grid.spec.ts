import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {RoutingGrid} from './routing-grid';
import {ElementRef, provide} from '@angular/core';
import {MockConnection} from '@angular/http/testing';

describe('RoutingGrid', () => {
    // beforeEachProviders(() => [
    //     RoutingGrid,
    //     provide(ElementRef, { useValue: new MockConnection() })
    // ]);

    // it('should log store', inject([ RoutingGrid ], (routing) => {
    //     spyOn(routing, 'mainStore');
    //     routing.mainStore();

    //     expect(routing.mainStore).toBeDefined();
    // }));

});
