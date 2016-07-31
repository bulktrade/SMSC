import {Component, Input} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {MdIcon} from "@angular2-material/icon/icon";
import {MdAnchor, MdButton} from "@angular2-material/button/button";

@Component({
    selector: 'multiple-select',
    template: require('./multipleSelect.html'),
    styles: [
        require('./multipleSelect.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdCard,
        MdButton, MdAnchor, MdIcon
    ],
    pipes: [TranslatePipe]
})

export class MultipleSelect {
    @Input('crudService') public crudService:any;
    @Input('title') public title:any;
    public items;

    constructor(public translate:TranslateService,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.crudService.initGridData.then((res) => {
            this.items = [];
            let users = this.crudService.model['users'];

            if (users) {
                users.forEach((item) => {
                    this.items.push({
                        name: item, visible: true
                    });
                });
            }
        });
    }

    removeItem() {
        let users = [];

        this.items.forEach((item) => {
           if (item.visible) {
               users.push(item.name);
           }
        });

        this.crudService.model[this.title] = users;
    }
}
