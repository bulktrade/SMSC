import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router } from '@angular/router';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    providers: [],
    styleUrls: [
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
