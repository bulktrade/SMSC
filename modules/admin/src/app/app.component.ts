/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { AppRouterOutlet } from './app.router-outlet';

import { Location } from '@angular/common';

import { Login } from './login';
import { NotFound } from './notfound';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    pipes: [],
    providers: [],
    directives: [AppRouterOutlet],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.scss')
    ],
    template: '<router-outlet></router-outlet>'
})
@Routes([
    { path: '', component: Login },
    { path: '/login', component: Login },
    // { path: '/navigation/...', component: Navigation, as: 'Navigation' },
    { path: '/notfound', component: NotFound },
    { path: '*', component: NotFound }
])
export class App {
    constructor(public router: Router, public location: Location) {
    }

    ngOnInit() {
    }
}
