import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {ElementRef, provide} from '@angular/core';
import {MCCMNCGrid} from './mccmnc-grid';
import {MockConnection} from '@angular/http/testing';

describe('MCC & MNC', () => {
    // beforeEachProviders(() => [
    //     MCCMNCGrid
    // ]);

    // it('should MCC store', inject([ MCCMNCGrid ], (mccmnc) => {
    //     spyOn(mccmnc, 'MCCStore');
    //     mccmnc.MCCStore();

    //     expect(mccmnc.MCCStore).toBeDefined();
    // }));

    // it('should MNC store', inject([ MCCMNCGrid ], (mccmnc) => {
    //     spyOn(mccmnc, 'MNCStore');
    //     mccmnc.MNCStore();

    //     expect(mccmnc.MNCStore).toBeDefined();
    // }));

});
