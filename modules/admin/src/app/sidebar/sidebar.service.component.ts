import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from '@angular/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem.component';
import {Navigation} from '../navigation/navigation.component';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav';

declare var Reflect;

@Component({
    selector: 'sidebar',
    template: require('./sidebar.service.html'),
    styleUrls: [
        require('./sidebar.service.scss').toString()
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        SidebarItem,
        NgFor,
        MD_SIDENAV_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})

export class SidebarService {
    public dataNavItems = [];

    constructor(public translate: TranslateService) {
        // this.initDataNavItems();
    }

    ngOnInit() {
    }

    initDataNavItems() {
        let result = [];
        let decoratorValue;

        this.getItemConfig(Navigation).forEach((item) => {
            if (item.submenu) {
                decoratorValue = this.getItemConfig(item.component);

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

    getItemConfig(component) {
        // return Reflect.getMetadata('annotations', component)
        //     .filter(a => {
        //         return a.constructor.name === 'ItemConfig';
        //     });
        return Reflect.getMetadata('annotations', component);
    }
}
