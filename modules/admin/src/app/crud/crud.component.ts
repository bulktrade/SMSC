import {Component} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {NavigationInterceptor} from "../common/navigationInterceptor";
import {CubeGridComponent} from "../common/spinner/cubeGrid/cubeGrid.component";

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
        MdCard,
        CubeGridComponent
    ],
    pipes: [TranslatePipe],
})

export class Crud {

    constructor(public translate:TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public navigationInterceptor: NavigationInterceptor) {
    }

    ngOnInit() {
        this.router.events.subscribe((event:any):void => {
            this.navigationInterceptor.intercept(event);
        });
    }

}
