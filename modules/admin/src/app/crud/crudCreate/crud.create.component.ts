import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect.component";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { SELECT_DIRECTIVES } from "ng2-select";
import { CrudView } from "../crudView/crud.view.component";
import { Location } from "@angular/common";
import { CrudModel } from "../crud.model";
import { LoadingGrid } from "../../common/loadingGrid";

@Component({
    selector: 'crud-create',
    template: require('../common/form.html'),
    styles: [
        require('../common/form.scss'),
        require('../common/style.scss')
    ],
    providers: [ Location ],
    directives: [
        MultipleSelect,
        CrudView,
        MdCheckbox,
        SELECT_DIRECTIVES,
        BUTTON_DIRECTIVES,
        LoadingGrid
    ],
    pipes: [ TranslatePipe ]
})

export class CrudCreate {
    public btnName:string = 'CREATE';
    public model = new CrudModel([], []);

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router,
                public route:ActivatedRoute,
                public location:Location) {
    }

    ngOnInit() {
        this.crudService.className = this.route.parent.parent.routeConfig.data[ 'crudClass' ];
        this.crudService.parentPath = this.router.url;

        if (!this.crudService.linkedClass) {
            this.crudService.multiCrud.push({
                goto: 'formCreate',
                className: this.crudService.getClassName()
            });
        }

        if (this.crudService.lastCrudElement) {
            this.crudService.model = this.crudService.lastCrudElement.model || {};
            this.crudService.linkedClass = this.crudService.lastCrudElement.className;
        }
        this.crudService.lastCrudElement = null;

        this.crudService.initializationGrid(this.crudService.getClassName(),
            (rowData) => {
                this.model.rowData = rowData;
            },
            (columnDefs) => {
                this.model.columnDefs = columnDefs;
            });
    }

    back() {
        this.crudService.multiCrud.pop();
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.addingFormValid = false;
        this.crudService.isEditForm = false;
        this.crudService.model = {};
    }

    onSubmit() {
        this.crudService.createRecord(this.crudService.model);
    }

}
