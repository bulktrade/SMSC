import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'dashboard-crud-edit',
    template: '<dynamic-form [formType]="btnName" [columnDefs]="columnDefs"></dynamic-form>'
})
export class DashboardCrudUpdateComponent {
    // public resolveData: EditModel = new EditModel();
    // public btnName: BtnTypes = BtnTypes.UPDATE;
    // public columnDefs: Array<FormPropertyModel> = null;

    // constructor(public router: Router,
    //             public route: ActivatedRoute,
    //             public crudService: CrudService,
    //             public location: Location) {
    //
    // }
    //
    // ngOnInit() {
    //     this.resolveData = this.route.snapshot.data['edit'];
    //
    //     this.columnDefs = this.resolveData.columnDefs;
    //
    //     if (this.resolveData.inputModel) {
    //         this.crudService.setModel(this.resolveData.inputModel);
    //     }
    // }

    onSubmit() {
        // this.crudService.updateRecord(this.crudService.model);
    }

    ngOnDestroy() {
        // this.crudService.multipleSelectValid = false;
        // this.crudService.setModel({});
    }

    /**
     * Back to dashboards
     */
    back() {
        // this.location.back();
    }
}
