import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CustomersCrud} from './customers.crud';

require('./customers.scss');

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [],
    providers: [CustomersCrud],
    directives: [ROUTER_DIRECTIVES],
    pipes : [TranslatePipe]
})

@RouteConfig([
    {path: '/edit/:id', component: CustomersCrud,
        name: 'CustomersCrud', useAsDefault: true}
])

export class Customers {

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }

}
