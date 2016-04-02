import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';
import {ElementRef} from 'angular2/core';
import {MCCMNCGrid} from './mccmnc-grid';

describe('MCC & MNC', () => {
    beforeEachProviders(() => [
        MCCMNCGrid,
        ElementRef
    ]);

    it('should MCC store', inject([ MCCMNCGrid ], (mccmnc) => {
        spyOn(mccmnc, 'MCCStore');
        mccmnc.MCCStore();

        expect(mccmnc.MCCStore).toBeDefined();
    }));

    it('should MNC store', inject([ MCCMNCGrid ], (mccmnc) => {
        spyOn(mccmnc, 'MNCStore');
        mccmnc.MNCStore();

        expect(mccmnc.MNCStore).toBeDefined();
    }));

});
