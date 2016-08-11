import {
    inject,
    addProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';
import {APP_PROVIDERS} from "./index";
import {CRUD_PROVIDERS} from "./crud/common/crudProviders";

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        addProviders([
            ...APP_PROVIDERS,
            ...CRUD_PROVIDERS,
            App
        ]);
    });
});
