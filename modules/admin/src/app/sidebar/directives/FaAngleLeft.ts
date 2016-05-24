import {Directive} from '@angular/core';

@Directive({
    selector: '[angle-left]',
    exportAs: 'fa-angle-left'
})
export class FaAngleLeft {
    isSubMenu(element) {
        return (' ' + element.children[element.children.length - 1].className + ' ')
                .indexOf(' ' + 'sub-menu-item' + ' ') > -1;
    }
}
