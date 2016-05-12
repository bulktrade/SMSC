import {Directive, ElementRef, DynamicComponentLoader, Input} from 'angular2/core';
import {Navigation} from '../../navigation/navigation';

declare var Reflect;

@Directive({
    selector: '[dynamic-tag]',
    providers: []
})
export class DynamicTag {
    @Input('dynamic-tag')
    directiveName:string;

    constructor(private loader:DynamicComponentLoader, private elementRef:ElementRef) {
    }

    ngOnInit() {
        let decoratorValue =  Reflect.getMetadata('annotations', Navigation)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop().configs;

        for (var index = 0; index < decoratorValue.length; index++) {
            if (decoratorValue[index].name === this.directiveName) {
                this.loader.loadNextToLocation(decoratorValue[index].data.component, this.elementRef);
                return;
            }
        }
    }
}
