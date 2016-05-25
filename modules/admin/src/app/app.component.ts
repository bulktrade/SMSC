import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router, Instruction } from '@angular/router-deprecated';

import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { Location } from '@angular/common';

import { AppRouterOutlet } from './app.router-outlet';
import { NotFound } from './notfound/notfound.component';
import { Login } from './login/login.component';
import { Navigation } from './navigation/navigation.component';

@Component({
    selector: 'app',
    pipes: [TranslatePipe],
    providers: [],
    directives: [AppRouterOutlet],
    template: '<route-outlet></route-outlet>',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.scss')
    ],
    styleUrls: [
        require('bootstrap-loader'), // https://github.com/shakacode/bootstrap-loader
        // require('../vendor/ext-6.0.1/build/classic/theme-crisp/resources/theme-crisp-all.css'),
        require('../vendor/spinkit/cube-grid.css'),
        require('../vendor/iconfont/material-icons.css')
    ]
})
@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, name: 'Login', useAsDefault: true },
    { path: '/navigation/...', component: Navigation, name: 'Navigation' },
    { path: '/notfound', component: NotFound, name: 'NotFound' },
    { path: '*', redirectTo: ['/NotFound'] }
])
export class App {

    constructor(public router: Router,
                public location: Location) {
        router.recognize(location.path()).then((instruction: Instruction) => {
            if (!instruction) {
                router.recognize('/notfound').then((inst: Instruction) => {
                    router.navigateByInstruction(inst, true);
                });
            }
        });
    }

}

