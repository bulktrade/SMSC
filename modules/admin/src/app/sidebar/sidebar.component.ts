import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FaAngleLeft } from './directives/FaAngleLeft';
import { ActiveItem } from './directives/active';
import { NgClass, NgFor } from '@angular/common';
import { AnimateBox } from './directives/animate';
import { SidebarItem } from './sidebaritem.component';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';

declare var Reflect;

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        SidebarItem
    ],
    pipes: [ TranslatePipe ],
    styles: [
        require('./sidebar.scss')
    ]
})

export class Sidebar {
    public dataNavItems = [];

    constructor(public translate:TranslateService,
                public router:Router) {
        this.initDataNavItems(this.router);
    }

    ngOnInit() {
    }

    initDataNavItems(router) {
        let result = [];
        let decoratorValue;

        let routeConfig = router.config;

        routeConfig.forEach((route) => {
            if (route.hasOwnProperty('children')) {
                route.children.forEach((item) => {
                    if (
                        item.hasOwnProperty('data') &&
                        item.data.hasOwnProperty('showInSubNavigation') &&
                        item.data.showInSubNavigation
                    ) {
                        if (item.hasOwnProperty('children')) {
                            decoratorValue = item.children;

                            decoratorValue.forEach((subItem) => {
                                if (
                                    subItem.hasOwnProperty('data') &&
                                    subItem.data.hasOwnProperty('showInSubNavigation') &&
                                    subItem.data.showInSubNavigation
                                ) {
                                    result.push({
                                        name: subItem.component.name.toLowerCase(),
                                        path: subItem.path,
                                        icon: subItem.data.icon
                                    });
                                }
                            });
                        }

                        if (result.length === 0) {
                            result = undefined;
                        }

                        this.dataNavItems.push({
                            name: item.component.name.toLowerCase(),
                            path: item.path ? '/' + item.path : '/',
                            paramsAsDefault: item.data.paramsAsDefault,
                            icon: item.data.icon,
                            toggle: item.data.toggle,
                            submenu: result,
                            showInSubNavigation: item.data.showInSubNavigation
                        });

                        result = [];
                    }
                });
            }

        });
    }
}
