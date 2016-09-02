import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { CrudService } from "./crud.service";

@Component({
    selector: 'crud',
    template: require('./crud.html'),
    styles: [
        require('./crud.scss')
    ],
    providers: []
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
