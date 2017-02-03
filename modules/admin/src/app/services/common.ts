import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class CommonService {

    constructor() {
    }

    getPathFromRoot(parent: ActivatedRoute[]) {
        let pathFromRoot: string = '/';

        parent.forEach((i: ActivatedRoute) => {
            if (i.routeConfig !== null && i.routeConfig.path !== '') {
                pathFromRoot += i.routeConfig.path + '/';
            }
        });

        return pathFromRoot;
    }

}
