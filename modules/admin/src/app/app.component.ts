import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router, Instruction } from '@angular/router-deprecated';

import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import {Location} from '@angular/common';

import { AppState } from './app.service';
import {RouterActive} from "./example/router-active/router-active.directive";
import {AppRouterOutlet} from "./app.router-outlet";
import {NotFound} from "./notfound/notfound.component";
import {Login} from "./login/login.component";

@Component({
    selector: 'app',
    pipes: [TranslatePipe],
    providers: [],
    directives: [RouterActive],
    template: '<router-outlet></router-outlet>',
    styles: [
        require('normalize.css')
    ]
})
@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, as: 'Login'},
    // { path: '/navigation/...', component: Navigation, as: 'Navigation'},
    {path: '/notfound', component: NotFound, as: 'NotFound', useAsDefault: true}
])
export class App {

    constructor(public router: Router,
                public location: Location) {
        router.recognize(location.path()).then((instruction: Instruction) => {
            if (!instruction) {
                router.recognize('/notfound').then((instruction: Instruction) => {
                    console.log('asd');
                    router.navigateByInstruction(instruction, true);
                });
            }
        });
    }


}

