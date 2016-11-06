import { Component, OnInit, ModuleWithProviders, NgModule, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { MdSelectModule } from '../../common/material/select/select.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule, AlertModule } from 'ng2-bootstrap';
import { GridPaginationModule } from '../directives/grid-pagination/grid-pagination.component';
import { AgGridModule } from 'ag-grid-ng2';
import { LoadingGridModule } from '../../common/loading-grid.component';

@Component({
    selector: 'dynamic-view',
    template: require('./dynamic-view.component.html'),
    styleUrls: [
        require('./dynamic-view.component.scss'),
        require('../common/grid.scss'),
        require('../common/style.scss')
    ],
})
export class DynamicViewComponent implements OnInit {
    @Input('crudClass') crudClass: string;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
    }
}

@NgModule({
    imports: [
        CommonModule,
        MdSelectModule,
        FormsModule,
        DropdownModule,
        TranslateModule,
        GridPaginationModule,
        AlertModule,
        AgGridModule,
        LoadingGridModule
    ],
    exports: [DynamicViewComponent],
    declarations: [DynamicViewComponent]
})
export class DynamicViewModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicViewModule,
            providers: []
        };
    }
}
