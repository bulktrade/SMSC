import {Directive} from '@angular/core';
import {Location} from '@angular/common';

@Directive({
    selector: '[active-item]',
    exportAs: 'active'
})
export class ActiveItem {
    constructor(public location: Location) {
    }

    isActiveMainItem(path) {
        return this.location.path().indexOf(path.toLowerCase()) !== -1;
    }

    isActiveSubItem(items) {
        let path = '';

        items.forEach(item => {
            path += item + '/';
        });

        path = path.substring(0, path.length - 1);

        return this.location.path() === '/' + path.toLowerCase();
    }

}
