import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from 'angular2/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem';

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

    constructor(public translate: TranslateService,
                public sidebaritem: SidebarItem) {
        console.log(this.sidebaritem.dataNavItems);

    }

    ngOnInit() {
    }
}