import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'ba-card',
    styles: [require('./baCard.scss')],
    templateUrl: './baCard.html',
    encapsulation: ViewEncapsulation.None
})
export class BaCard {
    @Input() title: String;
    @Input() baCardClass: String;
}
