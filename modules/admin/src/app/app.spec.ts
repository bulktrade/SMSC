import { inject, TestBed } from '@angular/core/testing';
import { App } from "./app.component";
import { TranslateService } from "ng2-translate/ng2-translate";
import { provide } from "@angular/core";
import { HttpModule } from "@angular/http";

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                App,
                provide(TranslateService, { useValue: jasmine.createSpyObj('TranslateService', [ 'setDefaultLang', 'use' ]) }),
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
