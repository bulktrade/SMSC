import { Component, Injectable } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { Breadcrumb } from "./breadcrumb.service";

require('./breadcrumb.scss');

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.html'),
    inputs: [
        'title',
        'description',
        'parents'
    ],
    directives: [],
    providers: [],
    pipes: [ TranslatePipe ]
})

@Injectable()
export class BreadcrumbService {
    public breadcrumb:Breadcrumb;

    constructor(public translate:TranslateService,
                public router:Router) {
    }

    ngOnInit() {
        this.breadcrumb = new Breadcrumb(this.router);
    }
}
