import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { GridPropertyModel } from '../model/grid-property';

@Component({
    selector: 'crud-view',
    template: '<dynamic-view [crudClass]="crudService.getClassName()"></dynamic-view>',
    styleUrls: [],
    providers: [],
})

export class CrudViewComponent {
    public resolveData: Array<GridPropertyModel> = [];

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        // sets crud class name
        this.crudService.setClassName(this.route.parent.parent.data['value']['crudClass']);
        // sets path from root component
        this.crudService.setParentPath(this.route.parent.parent.snapshot.pathFromRoot);

        this.resolveData = this.route.snapshot.data['view'];
        this.crudService.gridOptions.columnDefs = this.resolveData;
        this.crudService.gridOptions.rowData = [];

        // adds additional columns
        this.crudService.addColumn(this.crudService.gridOptions);

        this.crudService.resetCrudLevels();
    }

    navigateToCreate() {
        this.crudService.setModel({});
        this.router.navigate([this.crudService.parentPath,
            'create', this.crudService.getClassName()]);
    }

    navigateToDelete() {
        let id = this.crudService.getSelectedRID(this.crudService.gridOptions);

        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    }
}
