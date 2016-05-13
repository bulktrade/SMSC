import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from 'angular2/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem';
import {Navigation} from '../navigation/navigation';

declare var Reflect;

@Component({
    selector: 'sidebar',
    templateUrl: 'app/components/sidebar/sidebar.service.html',
    styles: [
        require('./sidebar.service.scss')
    ],
    providers: [SidebarItem],
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

    constructor(public translate: TranslateService,
                public sidebaritem: SidebarItem) {
    }

    ngOnInit() {
        this.dataNavItems = this.initDataNavItems();
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
                showInSubNavigation: item.data.showInSubNavigation
            });
        });

        return result;
    }
}