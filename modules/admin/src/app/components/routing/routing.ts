import {Component} from 'angular2/core';
import {RoutingGrid} from './directives/routing-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
    selector: 'routing',
    templateUrl: 'app/components/routing/routing.html',
    styles: [
        require('./routing.scss')
    ],
    providers: [],
    directives: [RoutingGrid, Breadcrumb],
    pipes: [TranslatePipe]
})
export class Routing {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}