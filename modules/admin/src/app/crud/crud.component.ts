import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { LoadingRouterOutlet } from "../common/loadingRouterOutlet";
import { CrudService } from "./crud.service";

@Component({
    selector: 'crud',
    template: require('./crud.html'),
    styles: [
        require('./crud.scss')
    ],
    providers: [],
    directives: [
        LoadingRouterOutlet,
        MD_CARD_DIRECTIVES,
        MdCard
    ],
    pipes: [ TranslatePipe ],
})

export class Crud {

    constructor(public translate:TranslateService,
                public route:ActivatedRoute,
                public router:Router,
                public crudService:CrudService) {
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.crudService.hideAllMessageBoxes();
            }
        });
    }

}
