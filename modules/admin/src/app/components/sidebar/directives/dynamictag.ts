import {Directive, ElementRef, DynamicComponentLoader, Input, ComponentRef} from 'angular2/core';
import {DashboardItem} from '../navigationitems/dashboarditem/dashboarditem';
import {GSMItem} from '../navigationitems/gsmitem/gsmitem';
import {FinancesItem} from '../navigationitems/financesitem/financesitem';
import {SettingItem} from '../navigationitems/settingitem/settingitem';

@Directive({
    selector: '[dynamic-tag]',
    providers: []
})
export class DynamicTag {
    @Input('dynamic-tag') directiveName: string;
    @Input('showNav') showNav: boolean;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef) {
    }

    ngOnInit() {
        switch (this.directiveName) {
            case 'Dashboard':
                this.loader.loadNextToLocation(DashboardItem, this.elementRef)
                    .then((compRef:ComponentRef) => {
                        compRef.instance.showNav = this.showNav;
                    });
                break;
            case 'GSM':
                this.loader.loadNextToLocation(GSMItem, this.elementRef);
                break;
            case 'Finances':
                this.loader.loadNextToLocation(FinancesItem, this.elementRef);
                break;
            case 'Setting':
                this.loader.loadNextToLocation(SettingItem, this.elementRef);
                break;
        }
    }
}