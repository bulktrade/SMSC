import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";

@Component({
    selector: 'crud-create',
    template: require('../common/form/form.html'),
    styleUrls: [
        require('../common/form/form.scss'),
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudCreate {
    public resolveData: any;
    public btnName: string = 'CREATE';

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['create'];
        this.crudService.gridOptions.columnDefs = this.resolveData;
    }

    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.createRecord(this.crudService.model, this.route.snapshot.params['className']);
    }

}
