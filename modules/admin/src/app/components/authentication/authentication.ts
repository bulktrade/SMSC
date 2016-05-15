import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Routes, Router} from '@angular/router';
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
@Routes([
    // @todo Fix it
    // { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login },
    { path: '/navigation/...', component: Navigation },
    { path: '/notfound', component: NotFound },
])

export class Authentication {
    constructor(
        public router: Router,
        public location: Location
    ) {
        // @todo Fix it
        // router.recognize(location.path()).then((instruction: Instruction) => {
        //     if (!instruction) {
        //         router.recognize('/notfound').then((instruction: Instruction) => {
        //             router.navigateByInstruction(instruction, true);
        //         });
        //     }
        // });
    }
}