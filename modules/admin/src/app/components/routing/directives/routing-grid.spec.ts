import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';
import {RoutingGrid} from "./routing-grid";
import {ElementRef} from "angular2/core";

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
