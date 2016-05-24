import {
    it,
    inject,
    beforeEachProviders,
} from '@angular/core/testing';
import {MonitoringGrid} from './monitoring-grid';
import {ElementRef} from '@angular/core';

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
