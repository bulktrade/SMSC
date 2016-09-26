import { Component, Input } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Location } from '@angular/common';
import { BtnTypes } from './btn.types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dynamic-form',
    template: require('./form.html'),
    styleUrls: [
        require('./form.scss'),
        require('./style.scss')
    ]
})

export class DynamicForm {
    @Input('btnName')
    public btnName: BtnTypes;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public crudService: CrudService) {
    }

    onSubmit() {
        switch (this.btnName) {
            case BtnTypes.UPDATE:
                this.crudService.updateRecord(this.crudService.model);

                break;
            case BtnTypes.CREATE:
                this.crudService.createRecord(this.crudService.model,
                    this.route.snapshot.params['className']);

                break;

            default:
                break;
        }
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    back() {
        this.location.back();
    }
}
