import {Component, Input} from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {MdIcon} from "@angular2-material/icon/icon";
import {MdAnchor, MdButton} from "@angular2-material/button/button";
import { EventEmitter } from "@angular/common/src/facade/async";

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
    pipes: [TranslatePipe],
    outputs: ['isRequired']
})

export class MultipleSelect {
    @Input('crudService') public crudService:any;
    @Input('property') public property:any;
    @Input('rowSelectionLinkset') rowSelectionLinkset:string;

    public isRequired = new EventEmitter();
    public requiredSymb = ' ';
    public items = [];

    constructor(public translate:TranslateService,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.crudService.multileSelect[this.property.field] = this;
        this.init();
    }

    init() {
        this.crudService.initGridData.then(() => {
            this.crudService.rowSelectionLinkset = this.rowSelectionLinkset;
            let linkset = this.crudService.model[this.property.field];

            if (typeof linkset === 'string') {
                linkset = linkset.split(',');
            }

            if (linkset) {
                linkset.forEach((item) => {
                    if (item) {
                        this.items.push({
                            name: item, visible: true
                        });
                    }
                });

                if (this.property.required) {
                    this.requiredSymb += '*';

                    if (linkset.length) {
                        this.isRequired.emit(false);
                    } else {
                        this.isRequired.emit(true);
                    }
                } else {
                    this.isRequired.emit(false);
                }
            } else if (this.property.required) {
                this.requiredSymb += '*';
                this.isRequired.emit(true);
            } else {
                this.isRequired.emit(false);
            }
        });
    }

    removeItem() {
        this.crudService.addingFormValid = false;
        let linkset = [];

        this.items.forEach((item) => {
           if (item.visible) {
               linkset.push(item.name);
           }
        });

        if (this.property.required) {
            if (linkset.length) {
                this.isRequired.emit(false);
            } else {
                this.isRequired.emit(true);
            }
        } else {
            this.isRequired.emit(false);
        }

        this.crudService.model[this.property.field] = linkset;
        this.crudService.isActiveLinkset = this.property.field;
    }

    clearAll() {
        this.crudService.addingFormValid = true;
        this.items = [];
        this.crudService.model[this.property.field] = [];
        this.crudService.isActiveLinkset = this.property.field;
    }

    addLinkset() {
        this.crudService.model[this.property.field] = [];
        this.crudService.showLinksetView = true;
        this.crudService.fieldsValue = this.crudService.model;
        this.crudService.isActiveLinkset = this.property.field;
        this.crudService.linkedClass = this.property.linkedClass;
        this.crudService.addingFormValid = false;
    }
}
