import {
    inject,
    addProviders
} from '@angular/core/testing';
import {App} from "./app.component";
import {TranslateService} from "ng2-translate/ng2-translate";
import {provide} from "@angular/core";

describe('App', () => {
    beforeEach(() => {
        addProviders([
            App,
            provide(TranslateService, {useValue: jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use'])}),
        ]);
    });

    it('should be url', inject([ App ], (app) => {
        let url = 'http://www.smsc.io/';

        expect(app.url).toEqual(url);
    }));
});
