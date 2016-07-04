import {Directive, ElementRef} from '@angular/core';
// import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';

@Directive({
    selector : '[animate-box]',
    exportAs : 'ab'
})
export class AnimateBox {
    constructor(/*private _ab: AnimationBuilder, private _e: ElementRef*/) {
    }

    toggle(isVisible: boolean = false, showNav: boolean, navHeight?: number) {
        // let heightChild, item, thisElement = this._e.nativeElement;
        // let animation = this._ab.css();

        // if (showNav) {
        //     animation.setDuration(0);
        // } else {
        //     animation.setDuration(200);
        // }

        // if (navHeight === undefined) {
        //     thisElement = this._e.nativeElement.childNodes[4];

        //     if (this._e.nativeElement.childNodes[4].tagName === 'UL') {
        //         heightChild = thisElement.childNodes[2].clientHeight;
        //     } else {
        //         return;
        //     }

        //     item = thisElement.children.length;

        //     if (isVisible) {
        //         animation
        //             .setFromStyles({height: '0'})
        //             .setToStyles({height: heightChild * item + 'px'});
        //     } else {
        //         animation
        //             .setFromStyles({height: heightChild * item + 'px'})
        //             .setToStyles({height: '0'});
        //     }
        // } else {
        //     if (!isVisible) {
        //         animation
        //             .setFromStyles({height: '0'})
        //             .setToStyles({height: navHeight + 'px'});
        //     } else {
        //         animation
        //             .setFromStyles({height: navHeight + 'px'})
        //             .setToStyles({height: '0'});
        //     }

        // }

        // animation.start(thisElement);
        // if (!isVisible) {
        //     setTimeout(() => {
        //         this._e.nativeElement.removeAttribute('style');
        //     }, 430);
        // }

    }

}
