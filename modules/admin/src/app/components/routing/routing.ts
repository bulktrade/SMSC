import {Component} from 'angular2/core';
import {RoutingGrid} from './directives/routing-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'routing',
    templateUrl: 'app/components/routing/routing.html',
    styles: [
        require('./routing.scss'),
        require('../../../assets/css/theme/breadcrumb.scss')
    ],
    providers: [],
    directives: [RoutingGrid],
    pipes: [TranslatePipe]
})
export class Routing {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}