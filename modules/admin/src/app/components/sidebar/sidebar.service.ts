import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ActiveItem} from './directives/active';
import {NgClass, NgFor} from 'angular2/common';
import {AnimateBox} from './directives/animate';
import {SidebarItem} from './sidebaritem';
import {LocalStorage} from '../../../assets/js/angular2-localstorage/WebStorage';
import {DashboardItem} from './navigationitems/dashboarditem/dashboarditem';
import {DynamicTag} from './directives/dynamictag';
import {GSMItem} from './navigationitems/gsmitem/gsmitem';
import {FinancesItem} from './navigationitems/financesitem/financesitem';
import {SettingItem} from './navigationitems/settingitem/settingitem';
import {listItems} from './listNavigationItems';

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
        DashboardItem,
        GSMItem,
        FinancesItem,
        SettingItem,
        NgFor,
        DynamicTag
    ],
    pipes: [TranslatePipe]
})
export class SidebarService {
    @Input() showNav:boolean;
    @LocalStorage()
    public icnGsm:boolean;
    public listItems;

    constructor(public translate: TranslateService,
                public sidebaritem: SidebarItem) {
    }

    ngOnInit() {
        this.listItems = listItems;
    }

}