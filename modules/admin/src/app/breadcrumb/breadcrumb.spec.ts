import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http } from "@angular/http";
import { Breadcrumb } from "./breadcrumb.component";
import { BreadcrumbService } from "./breadcrumb.service";
import { RouterModule } from "@angular/router";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";

describe('Breadcrumb', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CRUD_PROVIDERS,
                Breadcrumb,
                BreadcrumbService
            ],
            imports: [
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
                    deps: [Http]
                }),
                HttpModule,
                RouterModule
            ]
        });
    });

    it('loading spinner should be true', inject([Breadcrumb], (breadcrumb) => {
        expect(!!breadcrumb.translate).toEqual(true);
    }));

});
