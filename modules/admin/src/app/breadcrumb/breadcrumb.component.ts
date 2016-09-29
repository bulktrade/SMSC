import {Component, Injectable, ModuleWithProviders} from '@angular/core';
import {TranslateService, TranslateModule} from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.html'),
    inputs: [
        'title',
        'description',
        'parents'
    ],
    providers: [],
    styleUrls: [
        require('./breadcrumb.scss')
    ]
})

export class Breadcrumb {
    public breadcrumb: BreadcrumbService;

    constructor(public translate: TranslateService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.breadcrumb = new BreadcrumbService(this.router, this.route);
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    exports: [
        Breadcrumb
    ],
    declarations: [
        Breadcrumb
    ],
    providers: [
        BreadcrumbService,
        TranslateService
    ]
})
export class BreadcrumbModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BreadcrumbModule
        };
    }
}
