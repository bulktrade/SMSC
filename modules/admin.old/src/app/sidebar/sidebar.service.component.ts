import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from '@angular/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem.component';

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
    }

    ngOnInit() {
    }
}