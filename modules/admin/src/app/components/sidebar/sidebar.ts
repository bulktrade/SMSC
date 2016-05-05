import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass} from 'angular2/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem';
import {LocalStorage} from '../../../assets/js/angular2-localstorage/WebStorage';

@Component({
    selector: 'sidebar',
    templateUrl: 'app/components/sidebar/sidebar.html',
    styles: [
        require('./sidebar.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        Sidebar,
        SidebarItem
    ],
    pipes: [TranslatePipe]
})
export class Sidebar {
    @Input() showNav:boolean;
    @LocalStorage()
    public icnDsh:boolean;
    @LocalStorage()
    public icnGsm:boolean;

    constructor(public translate: TranslateService, public router: Router) {
    }

    ngOnInit() {
    }

}