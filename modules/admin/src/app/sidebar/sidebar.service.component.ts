import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from '@angular/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem.component';
import {Navigation} from "../navigation/navigation.component";

declare var Reflect;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/sidebar/sidebar.service.html',
    styles: [
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
}