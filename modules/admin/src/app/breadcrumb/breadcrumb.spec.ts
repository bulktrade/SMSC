import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { Breadcrumb } from "./breadcrumb.component";
import { BreadcrumbService } from "./breadcrumb.service";
import { RouterModule } from "@angular/router";
import { CRUD_PROVIDERS } from "../crud/common/crudProviders";

describe('Breadcrumb', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CRUD_PROVIDERS,
                Breadcrumb,
                BreadcrumbService
            ],
            imports: [
                HttpModule,
                RouterModule
            ]
        });
    });

    it('loading spinner should be true', inject([Breadcrumb], (breadcrumb) => {
        expect(!!breadcrumb.translate).toEqual(true);
    }));

});
