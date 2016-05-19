import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {MonitoringGrid} from './monitoring-grid';
import {ElementRef, provide} from '@angular/core';
import {MockApplicationRef} from '@angular/core/testing';

describe('MonitoringGrid', () => {
    beforeEachProviders(() => [
        MonitoringGrid,
        provide(ElementRef, { useValue: new MockApplicationRef() })
    ]);

    it('should log store', inject([ MonitoringGrid, ElementRef ], (monitoring) => {
        spyOn(monitoring, 'mainStore');
        monitoring.mainStore();

        expect(monitoring.mainStore).toBeDefined();
    }));

});
