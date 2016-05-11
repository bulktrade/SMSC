import {Directive, ElementRef, DynamicComponentLoader, Input} from 'angular2/core';
import {SidebarService} from '../sidebar.service';

declare var Reflect;

@Directive({
    selector: '[dynamic-tag]',
    providers: []
})
export class DynamicTag {
    @Input('dynamic-tag')
    directiveName:string;
    @Input('showNav')
    showNav:boolean;

    constructor(private loader:DynamicComponentLoader, private elementRef:ElementRef) {
    }

    ngOnInit() {
        let decoratorValue = Reflect.getMetadata("NavigationConfig", SidebarService);

        for (var index = 0; index < decoratorValue.length; index++) {
            if (decoratorValue[index].name === this.directiveName) {
                this.loader.loadNextToLocation(decoratorValue[index].component, this.elementRef);
                return;
            }
        }
    }
}
