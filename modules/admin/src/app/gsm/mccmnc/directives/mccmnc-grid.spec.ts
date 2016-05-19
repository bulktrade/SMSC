import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/core/testing';
import {ElementRef, provide} from '@angular/core';
import {MCCMNCGrid} from './mccmnc-grid';
import {MockApplicationRef} from '@angular/core/testing';

describe('MCC & MNC', () => {
    beforeEachProviders(() => [
        MCCMNCGrid,
        provide(ElementRef, { useValue: new MockApplicationRef() }),
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
