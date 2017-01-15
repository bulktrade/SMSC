import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html')
})

export class CrudViewComponent {
    public columnDefs;
    public selectedRows;
    public rowData = [];

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.crudService.resetCrudLevels();
    }

    getColumnDefs() {
        return this.route.snapshot.data['view'];
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
