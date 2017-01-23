import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { BackendService } from "../../services/backend/backend.service";
import { CrudViewComponent } from "../crud-view/crud-view.component";
import { CrudViewService } from "../crud-view/crud-view.service";

@Component({
    selector: 'crud-linkset',
    template: require('./crud-linkset.component.html'),
})

export class CrudLinksetComponent extends CrudViewComponent {
    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public backend: BackendService,
                public crudViewService: CrudViewService) {
        super(translate, crudService, router, route, backend, crudViewService);
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.rowData = this.getRowData();

        // get total rows
        this.crudViewService.getCountRows()
            .subscribe(countRows => {
                this.pagination.totalElements = countRows;
            });
    }

    getColumnDefs() {
        return this.route.snapshot.data['linkset'].columnDefs;
    }

    getRowData() {
        return this.route.snapshot.data['linkset'].rowData;
    }
}
