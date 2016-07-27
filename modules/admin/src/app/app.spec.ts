import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { App } from './app.component';
import { AppState } from './app.service';

describe('App', () => {
  beforeEachProviders(() => [
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect(app.url).toEqual('http://www.smsc.io/');
  }));

});