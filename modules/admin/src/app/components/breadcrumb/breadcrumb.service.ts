import {Component, Injectable} from 'angular2/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Router, Location, ROUTER_DIRECTIVES} from 'angular2/router';
import {Breadcrumb} from './breadcrumb';
@Component({
    selector: 'breadcrumb',
    templateUrl: 'app/components/breadcrumb/breadcrumb.html',
    styles: [
        require('./breadcrumb.scss')
    ],
    inputs: [
        'title',
        'description',
        'parents'
    ],
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    pipes: [TranslatePipe]
})

@Injectable()
export class BreadcrumbService {
    public breadcrumb: Breadcrumb;

    constructor(public translate:TranslateService,
                public router:Router, public location: Location) {
    }

    ngOnInit() {
        this.breadcrumb = new Breadcrumb(this.location);
    }

    navigateTo(url) {
        this.router.navigateByUrl(url);
    }

}