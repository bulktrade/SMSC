import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home';
import {Login} from './components/login/login';

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/navigation.html',
    styleUrls: ['assets/css/style.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})

@RouteConfig([
    { path: './components/home/home', component: Home, name: 'Home' },
    { path: './components/login/login', component: Login, name: 'Login' },
])

export class Navigation {

    constructor() {}

}