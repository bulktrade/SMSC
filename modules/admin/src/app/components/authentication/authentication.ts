import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Login} from '../login/login'
import {Navigation} from '../navigation/navigation'

@Component({
    selector: 'auth-app',
    templateUrl: 'app/components/authentication/authentication.html',
    providers: [],
    directives: [LoggedInRouterOutlet],
    pipes: []
})
@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, name: 'Login', useAsDefault: true},
    { path: '/navigation/...', component: Navigation, name: 'Navigation'},
])

export class Authentication {
    constructor(public router: Router) {
    }
}