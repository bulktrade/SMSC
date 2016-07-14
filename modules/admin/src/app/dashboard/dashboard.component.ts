import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CORE_DIRECTIVES} from '@angular/common';

require('./dashboard.scss');

@Component({
    selector: 'dashboard',
    providers: [],
    template: require('./dashboard.html'),
    styleUrls: [],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    pipes: [TranslatePipe]
})

@RouteConfig([])

export class Dashboard {

    constructor(public translate: TranslateService) {
    }

}
