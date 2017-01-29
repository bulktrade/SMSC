import { Component, ModuleWithProviders } from '@angular/core';
import { TranslateService, TranslateModule } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.component.html'),
    inputs: [
        'title',
        'description',
        'parents'
    ],
    providers: [],
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent {
    public breadcrumbService: BreadcrumbService;

    constructor(public translate: TranslateService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.breadcrumbService = new BreadcrumbService(this.router, this.route);
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    exports: [
        BreadcrumbComponent
    ],
    declarations: [
        BreadcrumbComponent
    ],
    providers: [
        BreadcrumbService
    ]
})
export class BreadcrumbModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BreadcrumbModule
        };
    }
}
