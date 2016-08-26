import { Component, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from "@angular/router";
import { EventEmitter } from "@angular/common/src/facade/async";
import { Location } from "@angular/common";
import { CrudService } from "../crud.service";

@Component({
    selector: 'multiple-select',
    template: require('./multipleSelect.html'),
    styles: [
        require('./multipleSelect.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
    ],
    pipes: [TranslatePipe],
    outputs: ['isRequired']
})

export class MultipleSelect {
    @Input('property') public property: any;
    @Input('rowSelectionLinkset') rowSelectionLinkset: string;

    public isRequired = new EventEmitter();
    public requiredSymb = ' ';
    public ridItems = [];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public crudService: CrudService) {
    }

    ngOnInit() {
        if (this.property.required) {
            this.requiredSymb += '*';
        }

        this.crudService.initGridData.then(() => {
            this.crudService.rowSelectionLinkset = this.rowSelectionLinkset;
            let linkset = [];

            if (this.crudService.model[this.property.property]) {
                linkset = (Array.isArray(this.crudService.model[this.property.property]) ?
                    this.crudService.model[this.property.property] : this.crudService.model[this.property.property].split(','));
            }

            if (linkset) {
                linkset.forEach((item) => {
                    if (item) {
                        this.ridItems.push({
                            name: item, visible: true
                        });
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
            } else if (this.property.required) {
                this.isRequired.emit(true);
            } else {
                this.isRequired.emit(false);
            }
        });
    }

    removeItem(): void {
        this.crudService.addingFormValid = false;
        let linkset = Array.isArray(this.crudService.model[this.property.property]) ?
            this.crudService.model[this.property.property] : this.crudService.model[this.property.property].split(',');
        let titleColumns = [];
        let model = [];

        for (let i in this.ridItems) {
            if (this.ridItems[i].visible) {
                model.push(linkset[i]);
                titleColumns.push(this.ridItems[i].name);
            }
        }

        if (this.property.required) {
            if (linkset.length) {
                this.isRequired.emit(false);
            } else {
                this.isRequired.emit(true);
            }
        } else {
            this.isRequired.emit(false);
        }

        this.crudService.model[this.property.property] = model;
        this.crudService.titleColumns[this.property.property] = titleColumns;
        this.crudService.isActiveLinkset = this.property.property;
    }

    clearAll(): void {
        this.resetParams();

        this.crudService.addingFormValid = true;
        this.crudService.isActiveLinkset = this.property.property;
    }

    addLinkset(): void {
        this.resetParams();
        this.crudService.addingFormValid = false;
        this.crudService.setLinkedClass(this.property.linkedClass);

        this.crudService.setModifiedRecord({
            data: this.crudService.model,
            modifiedLinkset: this.property.property,
            type: this.property.type,
            from: this.route.component['name']
        });

        this.navigateToLinkset();
    }

    resetParams(): void {
        this.crudService.titleColumns[this.property.property] = [];
        this.crudService.model[this.property.property] = [];
        this.crudService.titleColumns = [];
        this.ridItems = [];
    }

    navigateToLinkset() {
        this.router.navigateByUrl(this.crudService.parentPath + '/linkset');
    }
}
