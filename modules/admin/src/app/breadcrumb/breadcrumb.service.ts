import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {
    public name: string;
    public childs: Array<any> = [];

    constructor(public router: Router,
                public route: ActivatedRoute) {
        this.chainBreadcrumbItems(this.route);
        this.name = this.childs.length && this.childs[this.childs.length - 1].name ||
            this.route.data['value'].translationKey;
    }

    chainBreadcrumbItems(route: ActivatedRoute) {
        if (route.parent === null) {
            this.childs.reverse();
            return;
        }

        if (route.data['value'].hasOwnProperty('showInBreadcrumb') &&
            route.data['value']['showInBreadcrumb']) {
            this.childs.push({
                'name': route.data['value'].hasOwnProperty('translationKey') ?
                    route.data['value']['translationKey'] : route.component['name'],
                'router': this.generationPathFromRoot(route.pathFromRoot),
            });
        }

        this.chainBreadcrumbItems(route.parent);
    }

    generationPathFromRoot(paths: ActivatedRoute[]): string {
        let path: string = '';

        for (let i = 1; i < paths.length; i++) {
            if (paths[i].routeConfig.path !== '') {
                if (i !== paths.length - 1) {
                    path += paths[i].routeConfig.path + '/';
                } else {
                    path += paths[i].routeConfig.path;
                }
            }
        }

        if (path === '') {
            return '/';
        }

        return path;
    }

    navigateTo(router) {
        this.router.navigateByUrl(router);
    }
}
