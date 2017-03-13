import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router} from "@angular/router";
import {SidebarModel} from "./sidebar.model";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent {
    public dataNavItems: Array<SidebarModel> = [];

    constructor(public translate: TranslateService,
                public router: Router) {
        this.initDataNavItems(this.router);
    }

    ngOnInit() {
    }

    initDataNavItems(router) {
        let result: Array<SidebarModel> = [];
        let routeConfig = router.config;

        for (let l in routeConfig) {
            if (routeConfig.hasOwnProperty(l)) {
                let route = routeConfig[l];

                if (route.hasOwnProperty('children')) {
                    for (let i in route.children) {
                        if (route.children.hasOwnProperty(i)) {
                            let item = route.children[i];

                            if (
                                item.hasOwnProperty('data') &&
                                item.data.hasOwnProperty('showInSubNavigation') &&
                                item.data.showInSubNavigation
                            ) {
                                if (result.length === 0) {
                                    result = undefined;
                                }

                                let sidebarItem: SidebarModel = {
                                    name: item.data.translationKey.toLowerCase(),
                                    path: item.path ? '/' + item.path : '/',
                                    icon: item.data.icon,
                                    toggle: item.data.toggle,
                                    submenu: result,
                                    showInSubNavigation: item.data.showInSubNavigation
                                };

                                this.dataNavItems.push(sidebarItem);
                                result = [];
                            }
                        }
                    }
                }
            }
        }
    }
}
