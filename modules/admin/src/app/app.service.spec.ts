import {AppState} from "./app.service";

describe('Service: AppState', () => {
    let service: AppState = new AppState();

    it('.get()', () => {
        expect(service.get()).toEqual(jasmine.objectContaining({}));
    });

    it('.set()', () => {
        expect(service.set('prop', 'value')).toEqual('value');
    });

    it('._clone()', () => {
        expect(service._clone({})).toEqual(jasmine.objectContaining({}));
    });
});
