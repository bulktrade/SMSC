import {Directive, ElementRef} from 'angular2/core';
import {AnimationBuilder} from 'angular2/animate';

@Directive({
    selector : '[animate-box]',
    exportAs : 'ab'
})
export class AnimateBox {
    constructor(private _ab: AnimationBuilder, private _e: ElementRef) {
    }

    toggle(isVisible: boolean = false, item: number, showNav: boolean, navHeight: number) {
        let animation = this._ab.css();
        let heightChild = this._e.nativeElement.firstChild.parentNode.childNodes[1].clientHeight;

        if (showNav) {
            animation.setDuration(0);
        } else {
            animation.setDuration(200);
        }

        if (navHeight === undefined) {
            if (isVisible) {
                animation
                    .setFromStyles({height: '0'})
                    .setToStyles({height: heightChild * item + 'px'});
            } else {
                animation
                    .setFromStyles({height: heightChild * item + 'px'})
                    .setToStyles({height: '0'})
            }
        } else {
            if (!isVisible) {
                animation
                    .setFromStyles({height: '0'})
                    .setToStyles({height: navHeight + 'px'});
            } else {
                animation
                    .setFromStyles({height: navHeight + 'px'})
                    .setToStyles({height: '0'})
            }

        }

        animation.start(this._e.nativeElement);
        if (/*navHeight !== undefined &&*/ !isVisible) {
            setTimeout(() => {
                this._e.nativeElement.removeAttribute('style');
            }, 430);
        }

    }

}