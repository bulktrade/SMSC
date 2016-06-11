import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from '@angular/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem.component';
import {Navigation} from '../navigation/navigation.component';

declare var Reflect;

@Component({
    selector: 'sidebar',
    template: require('./sidebar.service.html'),
    styleUrls: [
        require('./sidebar.service.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        SidebarItem,
        NgFor
    ],
    pipes: [TranslatePipe]
})

export class SidebarService {
    public dataNavItems = [];

    constructor(public translate: TranslateService) {
        this.initDataNavItems();
    }

    ngOnInit() {
    }

    initDataNavItems() {
        let result = [];
        let decoratorValue;

        this.getRouteConfig(Navigation).forEach((item) => {
            if (item.path.substring(item.path.length - 3, item.path.length) === '...') {
                decoratorValue = this.getRouteConfig(item.component);

                decoratorValue.forEach((subItem) => {
                    result.push({
                        name: subItem.name,
                        icon: subItem.data.icon
                    });
                });
            }

            if (result.length === 0) {
                result = undefined;
            }

            this.dataNavItems.push({
                name: item.name,
                icon: item.data.icon,
                toggle: item.data.toggle,
                submenu: result,
                showInSubNavigation: item.data.showInSubNavigation
            });

            result = [];
        });
    }

    getRouteConfig(component) {
        return Reflect.getMetadata('annotations', component)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop().configs;
    }
}
