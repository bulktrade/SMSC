import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from '@angular/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import {LocalStorage} from '../../assets/js/angular2-localstorage/WebStorage';
import {Navigation} from "../navigation/navigation.component";

declare var Reflect;

@Component({
    selector: 'sidebar-item',
    templateUrl: 'app/components/sidebar/sidebaritem.html',
    styles: [
        require('./sidebaritem.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        NgFor
    ],
    pipes: [TranslatePipe]
})
export class SidebarItem {
    public dataNavItems = [];
    public store = localStorage;

    @LocalStorage() public icnDsh:boolean;
    @LocalStorage() public icnGsm:boolean;

    @Input('icon') public icon;
    @Input('nameItem') nameItem;
    @Input('showInSubNavigation') showInSubNavigation;
    
    constructor(public translate:TranslateService, public showmininav:ShowMiniNav) {
        this.dataNavItems = this.initDataNavItems();
    }

    ngOnInit() {
        console.log(this['icnDs']);
    }

    initDataNavItems() {
        let result = [];

        let decoratorValue = Reflect.getMetadata('annotations', Navigation)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop().configs;

        decoratorValue.forEach((item) => {
            result.push({
                name: item.name,
                icon: item.data.icon,
                showInSubNavigation: item.data.showInSubNavigation
            });
        });

        return result;
    }

    getStorageItem(item) {
        if (localStorage.getItem(item) === null) {
            return undefined;
        } else {
            return localStorage.getItem(item) === 'true' ? true : false;
        }
    }

}
