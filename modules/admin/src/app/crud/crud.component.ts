import {Component} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {LoadingRouterOutlet} from "../common/loadingRouterOutlet";

@Component({
    selector: 'crud',
    template: require('./crud.html'),
    styles: [
        require('./crud.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        LoadingRouterOutlet,
        MD_CARD_DIRECTIVES,
        MdCard
    ],
    pipes: [TranslatePipe],
})

export class Crud {

    constructor(public translate:TranslateService,
                public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
    }

}
