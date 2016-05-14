import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from 'angular2/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import {LocalStorage} from '../../../assets/js/angular2-localstorage/WebStorage';
import {Navigation} from "../navigation/navigation";

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

    @LocalStorage() public icnDsh:boolean;
    @LocalStorage() public icnGsm:boolean;

    @Input('icon') public icon;
    @Input('nameItem') nameItem;
    @Input('showInSubNavigation') showInSubNavigation;
    
    constructor(public translate:TranslateService, public showmininav:ShowMiniNav) {
        this.dataNavItems = this.initDataNavItems();
    }

    ngOnInit() {
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

    test(elem) {
        console.log(elem);
    }

}
