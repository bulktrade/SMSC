import {
    it,
    inject,
    injectAsync,
    describe,
    beforeEachProviders,
    TestComponentBuilder,
    setBaseTestProviders
} from 'angular2/testing';

// Load the implementations that should be tested
import {ODatabase} from './OrientDB';
import {Mock} from "./Mock";

describe('ODatabase', () => {

    beforeEach(() => {
        this.db = Mock.mock(new ODatabase('http://orientdb.127.0.0.1.xip.io/smsc'));
    });

    it('open OrientDB', () => {
        this.db.open('admin', 'admin')
            .then(
                (res) => {
                    expect(res).toBeUndefined();
                }
            );
        //expect(this.db.open).toHaveBeenCalled();
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

