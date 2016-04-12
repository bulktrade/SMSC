import {Component} from 'angular2/core';
import {RoutingGrid} from './directives/routing-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'routing',
    templateUrl: 'app/components/routing/routing.html',
    styleUrls: ['app/components/routing/routing.css'],
    providers: [],
    directives: [RoutingGrid],
    pipes: [TranslatePipe]
})
export class Routing {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}