import {Directive} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Directive({
    selector: '[active-item]',
    exportAs: 'active'
})
export class ActiveItem {
    constructor(public router:Router, public location:Location) {
    }

    isActiveMainItem(path) {
        return this.location.path().indexOf(path.toLowerCase()) !== -1;
    }

    isActiveSubDashboard(path) {
        return this.location.path() === '/navigation/dashboard/' + path;
    }

    isActiveSubGSM(path) {
        return this.location.path() === '/navigation/gsm/' + path;
    }

}