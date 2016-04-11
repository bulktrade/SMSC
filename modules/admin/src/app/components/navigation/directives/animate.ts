import {Directive, ElementRef} from 'angular2/core';
import {AnimationBuilder} from 'angular2/animate';

@Directive({
    selector : '[animate-box]',
    exportAs : 'ab'
})
export class AnimateBox {
    constructor(private _ab: AnimationBuilder, private _e: ElementRef) {
    }

    toggle(isVisible: boolean = false, item: number, showNav: boolean, shortMenu: boolean) {
        let animation = this._ab.css();

        if (showNav) {
            animation.setDuration(0);
        } else {
            animation.setDuration(200);
        }

        if (isVisible) {
            if (shortMenu) {
                animation
                    .setFromStyles({height: '0'})
                    .setToStyles({height: item*44 + 'px'});
            } else {
                animation
                    .setFromStyles({height: '0'})
                    .setToStyles({height: item*35 + 'px'});
            }
        } else {
            if (shortMenu) {
                animation
                    .setFromStyles({height: item*44 + 'px'})
                    .setToStyles({height: '0'})
            } else {
                animation
                    .setFromStyles({height: item*35 + 'px'})
                    .setToStyles({height: '0'})
            }
        }

        animation.start(this._e.nativeElement);
    }

}