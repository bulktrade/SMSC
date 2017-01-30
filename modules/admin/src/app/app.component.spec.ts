import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { HttpModule } from '@angular/http';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                App
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
