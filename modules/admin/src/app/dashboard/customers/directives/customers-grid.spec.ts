import {
    it,
    inject,
    beforeEachProviders
} from '@angular/core/testing';

import {CustomersGrid} from './customers-grid';
import {ElementRef, provide} from '@angular/core';
import {ODatabaseService} from '../../../orientdb/orientdb.service';
import {MockConnection} from '@angular/http/testing';

describe('CustomersGrid', () => {
    // beforeEachProviders(() => [
    //     CustomersGrid,
    //     provide(ElementRef, { useValue: new MockConnection() }),
    //     provide(ODatabaseService, {
    //         useFactory: () => new ODatabaseService('http://localhost:3000/orientdb/smsc')
    //     })
    // ]);

    // it('should log store', inject([ CustomersGrid ], (customer) => {
    //     spyOn(customer, 'mainStore');
    //     customer.mainStore();

    //     expect(customer.mainStore).toBeDefined();
    // }));

});
