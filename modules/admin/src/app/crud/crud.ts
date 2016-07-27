import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MdCard, MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {ActivatedRoute} from "@angular/router";

import {CrudService} from "./crud.service";
import {CrudModel} from "./crud.model";

@Component({
    selector: 'crud',
    template: require('./crud.html'),
    styleUrls: [
        require('./crud.scss')
    ],
    providers: [
        CrudService,
        CrudModel
    ],
    directives: [
        ROUTER_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdCard
    ],
    pipes: [TranslatePipe]
})

export class Crud {
    constructor(public translate:TranslateService,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
    }
}
