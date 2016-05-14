import {Directive, ElementRef} from 'angular2/core';
import {AnimationBuilder} from 'angular2/animate';

@Directive({
    selector : '[animate-box]',
    exportAs : 'ab'
})
export class AnimateBox {
    constructor(private _ab: AnimationBuilder, private _e: ElementRef) {
    }

    toggle(isVisible: boolean = false, showNav: boolean, navHeight: number) {
        let animation = this._ab.css();
        let thisElement = this._e.nativeElement.childNodes[3];
        let heightChild = thisElement.childNodes[1].clientHeight;
        let item = thisElement.children.length;

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

        animation.start(thisElement);
        if (!isVisible) {
            setTimeout(() => {
                this._e.nativeElement.removeAttribute('style');
            }, 430);
        }

    }

}