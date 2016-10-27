import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {
    public name: string;
    public childs: Array<any> = [];

    constructor(public router: Router,
                public route: ActivatedRoute) {
        this.chainBreadcrumbItems(this.route);
        this.name = this.childs[this.childs.length - 1].name || '';
    }

    chainBreadcrumbItems(route: ActivatedRoute) {
        if (route.component['name'] === 'NavigationComponent') {
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

    generationPathFromRoot(paths): string {
        let result: string = '';

        for (let i = 2; i < paths.length; i++) {
            if (paths[i].routeConfig.path !== '') {
                if (i !== paths.length - 1) {
                    result += paths[i].routeConfig.path + '/';
                } else {
                    result += paths[i].routeConfig.path;
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
