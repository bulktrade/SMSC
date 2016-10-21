import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { ColumnDefsModel } from '../model/columnDefs';
import { LinksetProperty } from '../model/linksetProperty';

@Component({
    selector: 'crud-view',
    template: require('./crudView.component.html'),
    styleUrls: [
        require('./crudView.component.scss'),
        require('../common/grid.scss'),
        require('../common/style.scss')
    ],
    providers: [],
})

export class CrudViewComponent {
    public resolveData: ColumnDefsModel = null;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['view'];
        this.crudService.gridOptions.columnDefs = this.resolveData.grid;
        this.crudService.gridOptions.rowData = [];
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

    clickOnCell(event) {
        if (event.colDef.type === 'LINK' ||
            event.colDef.type === 'LINKSET') {
            this.crudService.setLinkedClass(event.colDef.linkedClass);
            let linsetProperty: LinksetProperty = {
                name: event.colDef.property,
                type: event.colDef.type,
                bingingProperties: event.colDef.bingingProperties,
                data: event.data
            };

            this.crudService.navigateToLinkset(linsetProperty);
        }
    }
}
