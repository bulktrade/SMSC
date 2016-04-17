import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';
import {MonitoringGrid} from './monitoring-grid';
import {ElementRef} from 'angular2/core';

describe('MonitoringGrid', () => {
    beforeEachProviders(() => [
        MonitoringGrid,
        ElementRef
    ]);

    it('should log store', inject([ MonitoringGrid ], (monitoring) => {
        spyOn(monitoring, 'mainStore');
        monitoring.mainStore();

        expect(monitoring.mainStore).toBeDefined();
    }));

});
