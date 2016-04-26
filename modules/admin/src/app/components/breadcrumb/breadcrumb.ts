import {Childs} from './childs';
import {Location} from 'angular2/router';
import {Injectable} from 'angular2/core';

@Injectable()
export class Breadcrumb {
    public name: string;
    public childs: Childs[];

    constructor(location: Location) {
        this.init(location);
    }

    init(location) {
        let rootPath = location.path();
        this.name = rootPath.split('/')[rootPath.split('/').length-1];

        this.childs = this.initChilds(location);
    }

    initChilds(location) {
        let result = [];
        let arrPath;
        let linkPath = '/';

        if (location.path().split('/').length > 3) {
            arrPath = location.path().split('/').splice(1, location.path().split('/').length-2);
        } else  {
            arrPath = location.path().split('/').splice(1, location.path().split('/').length-1);
        }

        while (arrPath.length) {
            arrPath.forEach((item) => {
               linkPath += item + '/';
            });

            result.push({name: arrPath[arrPath.length-1], link: linkPath});

            arrPath = arrPath.splice(0, arrPath.splice.length-2);
        }

        return result;
    }
}