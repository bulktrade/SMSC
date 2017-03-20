import {Injectable} from "@angular/core";
import {SidebarModel} from "./sidebar.model";
import {Router, Route} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import * as _ from "lodash";

@Injectable()
export class SidebarService {

    constructor(public router: Router) {
    }

    getSidebarItems(): SidebarModel[] {
        let sidebarItems: SidebarModel[] = [];
        let navigationRoutes: Route[] = <Route[]>_.filter(this.router.config,
            (route) => route.component === NavigationComponent)[0]['children'];

        navigationRoutes.forEach((route: Route) => {
            let sidebarItem: SidebarModel = <SidebarModel>{
                name: route.hasOwnProperty('data') ? route.data.translationKey : '',
                path: route.path ? '/' + route.path : '/',
                icon: route.hasOwnProperty('data') ? route.data.icon : '',
                showInNavigation: route.hasOwnProperty('data') ? route.data.showInNavigation : false
            };
            sidebarItems.push(sidebarItem);
        });

        return sidebarItems;
    }
}
