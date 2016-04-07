import {Component} from 'angular2/core';
import {RouteConfig, Router, Location, Instruction} from 'angular2/router';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Login} from '../login/login'
import {Navigation} from '../navigation/navigation'
import {NotFound} from '../notfound/notfound'

@Component({
    selector: 'auth-app',
    templateUrl: 'app/components/authentication/authentication.html',
    providers: [],
    directives: [LoggedInRouterOutlet],
    pipes: []
})
@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, as: 'Login'},
    { path: '/navigation/...', component: Navigation, as: 'Navigation'},
    { path: '/notfound', component: NotFound, as: 'NotFound'},
])

export class Authentication {
    constructor(
        public router: Router,
        public location: Location
    ) {
        router.recognize(location.path()).then((instruction: Instruction) => {
            if (!instruction) {
                router.recognize('/notfound').then((instruction: Instruction) => {
                    router.navigateByInstruction(instruction, true);
                });
            }
        });
    }
}