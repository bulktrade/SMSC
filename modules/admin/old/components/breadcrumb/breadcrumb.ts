import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class Breadcrumb {
    public name: string;
    public childs: Array<any>;

    constructor(router: Router) {
        this.init(router);
    }

    init(router) {
        this.childs = new Array(0);
        
        this.chainChilds(router);
        this.childs.reverse();
        this.name = this.getName(this.childs[this.childs.length-1]);
    }

    chainChilds(router) {
        if (this.getName(router) === 'Navigation') {
            return;
        }

        this.childs.push(router);
        this.chainChilds(router.parent);
    }

    getName(router) {
        return router.hostComponent.name;
    }

    navigateTo(router) {
        router.navigate([router.hostComponent.name]);
    }
}