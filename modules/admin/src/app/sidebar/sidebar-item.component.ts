import {Component, Input, trigger, style, animate, state, transition} from "@angular/core";

@Component({
    selector: 'sidebar-item',
    templateUrl: './sidebar-item.component.html',
    providers: [],
    animations: [
        trigger('state', [
            state('closed', style({height: 0})),
            state('open', style({height: '*'})),
            transition('closed => open', [animate('200ms ease-out')]),
            transition('open => closed', [animate('200ms ease-out')])
        ]),
    ],
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
    @Input('icon') public icon;

    @Input('path') public path;

    @Input('paramsAsDefault') public paramsAsDefault;

    @Input('nameItem') public nameItem;

    @Input('showInSubNavigation') public showInSubNavigation;

    @Input('submenu') public submenu;

    @Input('toggle') public toggle;
}
