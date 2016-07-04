import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';
import {MonitoringGrid} from './monitoring-grid';
import {ElementRef, provide} from '@angular/core';
import {MockConnection} from '@angular/http/testing';

describe('MonitoringGrid', () => {
    // beforeEachProviders(() => [
    //     MonitoringGrid,
    //     provide(ElementRef, { useValue: new MockConnection() })
    // ]);

    // it('should log store', inject([ MonitoringGrid, ElementRef ], (monitoring) => {
    //     spyOn(monitoring, 'mainStore');
    //     monitoring.mainStore();

    //     expect(monitoring.mainStore).toBeDefined();
    // }));

});
