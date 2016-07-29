import {Component, ViewEncapsulation} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';

@Component({
    selector: 'crud',
    template: require('./crud.html'),
    styles: [
        require('./crud.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdCard
    ],
    encapsulation: ViewEncapsulation.Native,
    pipes: [TranslatePipe]
})

export class Crud {
    constructor(public translate:TranslateService,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
    }
}
