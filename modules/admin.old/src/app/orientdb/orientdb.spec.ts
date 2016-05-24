import {
    it,
    describe
} from '@angular/core/testing';

// Load the implementations that should be tested
import { ODatabaseService } from './orientdb.service';
import { Mock } from '../common';

describe('ODatabaseService', () => {

    beforeEach(() => {
        this.db = Mock.mock(new ODatabaseService('http://localhost:3000/orientdb/smsc'));
    });

    it('open OrientDB', () => {
        this.db.open('admin', 'admin');

        expect(this.db.open).toHaveBeenCalled();
    });

    it('query to OrientDB', () => {
        this.db.query('select from OUser');

        expect(this.db.query).toHaveBeenCalled();
    });

    it('create user', () => {
        this.db.create('test', '4862');

        expect(this.db.create).toHaveBeenCalled();
    });

    it('loads a record from the record ID', () => {
        this.db.load('12:0');

        expect(this.db.load).toHaveBeenCalled();
    });

    it('metadata', () => {
        this.db.metadata();

        expect(this.db.metadata).toHaveBeenCalled();
    });

    it('save', () => {
        this.db.save();

        expect(this.db.save).toHaveBeenCalled();
    });

    it('indexPut', () => {
        this.db.indexPut();

        expect(this.db.indexPut).toHaveBeenCalled();
    });

});

