import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class BreadcrumbService {
    public name:string;
    public childs:Array<any>;

    constructor(public router:Router,
                public route:ActivatedRoute) {
        this.childs = new Array();
        this.name = this.route.component['name'];
        this.chainBreadcrumbItems(this.route);
    }

    chainBreadcrumbItems(route:ActivatedRoute) {
        if (route.component['name'] === 'Navigation') {
            return;
        }

        this.childs.push({
            'name': route.component['name'],
            'router': this.chainPaths(route.pathFromRoot),
        });

        this.chainBreadcrumbItems(route.parent);
    }

    chainPaths(paths): string {
        let result:string = '';

        for (let item = 2; item < paths.length; item++) {
            if (paths[item].routeConfig.path !== '') {
                if (item !== paths.length - 1) {
                    result += paths[item].routeConfig.path + '/';
                } else {
                    result += paths[item].routeConfig.path;
                }
            }
        }

        if (result === '') {
            return '/';
        }

        return result;
    }

    navigateTo(router) {
        this.router.navigateByUrl(router);
    }
}
