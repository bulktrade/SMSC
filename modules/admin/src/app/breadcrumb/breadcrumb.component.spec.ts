import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { RouterModule } from '@angular/router';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';

describe('BreadcrumbComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CRUD_PROVIDERS,
                BreadcrumbComponent,
                BreadcrumbService
            ],
            imports: [
                HttpModule,
                RouterModule
            ]
        });
    });

    it('loading spinner should be true', inject([BreadcrumbComponent], (breadcrumb) => {
        expect(!!breadcrumb.translate).toEqual(true);
    }));

});
