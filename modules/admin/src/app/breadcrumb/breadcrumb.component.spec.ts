import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { RouterModule, UrlTree, NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService, TranslateLoader } from 'ng2-translate';

class MockActivatedRoute {
    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras) {};
    navigate(commands: any[], extras?: NavigationExtras) {};
}

describe('BreadcrumbComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: Router, useClass: MockActivatedRoute },
                BreadcrumbComponent,
                TranslateService,
                TranslateLoader,
                BreadcrumbService
            ],
            imports: [
                TranslateModule.forRoot(),
                HttpModule,
                RouterModule
            ]
        });
    });

    it('should have a translate', inject([BreadcrumbComponent], (breadcrumb) => {
        expect(!!breadcrumb.translate).toEqual(true);
    }));

});
