import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class BreadcrumbService {
    public name:string;
    public childs:Array<any>;

    constructor(public router:Router,
                public route:ActivatedRoute) {
        this.init();
    }

    init() {
        let paths = [];
        let path = '';
        this.childs = new Array();

        paths = this.router.url.split('/');

        this.router.url.split('/').forEach(() => {
            paths.forEach((ph, item) => {
                if (item) {
                    path += '/' + ph;
                }
            });

            let nameChild = paths[paths.length - 1];

            if (nameChild === '') {
                nameChild = this.route.component['name'];
            }

            this.childs.push({
                'name': nameChild,
                'router': path,
            });
            path = '';
            paths = paths.splice(0, paths.length - 1);
        });

        if (this.childs.length) {
            this.childs = this.childs.splice(0, this.childs.length - 1).reverse();
            this.name = this.childs[this.childs.length - 1].name;
        }

    }

    navigateTo(router) {
        this.router.navigateByUrl(router);
    }
}
