import {Component} from 'angular2/core';
import {RoutingGrid} from "./directives/routing-grid";

@Component({
    selector: 'routing',
    templateUrl: 'app/components/routing/routing.html',
    styleUrls: ['app/components/routing/routing.css'],
    providers: [],
    directives: [RoutingGrid],
    pipes: []
})
export class Routing {

    constructor() {}

    ngOnInit() {

    }

}