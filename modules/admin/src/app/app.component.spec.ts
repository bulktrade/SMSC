import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { HttpModule } from '@angular/http';
import { CRUD_PROVIDERS } from './crud/common/crudProviders';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                App,
                CRUD_PROVIDERS
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
