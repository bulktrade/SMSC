import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';
import { GridService } from '../../services/grid.service';
import { ColumnDefsModel } from '../model/columnDefs';
import { CrudLevel } from '../model/crudLevel';
import { RouterOutletService } from '../../services/routerOutletService';

@Component({
    selector: 'crud-linkset',
    template: require('./crudLinkset.html'),
    styleUrls: [
        require('./crudLinkset.scss'),
        require('../common/grid.scss'),
        require('../common/style.scss')
    ],
    providers: []
})

export class CrudLinkset {
    public resolveData: ColumnDefsModel = null;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public gridService: GridService,
                public roService: RouterOutletService) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['linkset'];
        this.crudService.gridOptions.columnDefs = this.resolveData.grid;
        this.crudService.gridOptions.rowData = [];
    }

    back() {
        this.crudService.previousCrudLevel();
        this.location.back();
    }

    navigateToCreate() {
        this.crudService.setModel({});
        this.router.navigate([this.crudService.parentPath,
            'create', this.crudService.getLinkedClass()]);
    }

    navigateToDelete() {
        let id = this.crudService.getSelectedRID(this.crudService.gridOptions);

        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    }

    addLink(gridOptions) {
        let className = this.crudService.getLinkedClass();
        let previousCrudLevel: CrudLevel = this.crudService.previousCrudLevel();
        this.crudService.model[previousCrudLevel.linksetProperty.name] = [];
        let params: any = previousCrudLevel.linksetProperty.data;

        return this.getLinkset(gridOptions, previousCrudLevel.linksetProperty.type, className)
            .then(linkSet => {
                params[previousCrudLevel.linksetProperty.name] = linkSet;

                if (this.roService.isPreviousRoute('CrudView')) {
                    this.crudService.updateRecord(params);
                    this.location.back();
                } else {
                    this.crudService.model = params;
                    this.location.back();
                }

            });
    }

    getLinkset(gridOptions, type, className) {
        let focusedRows = gridOptions.api.getSelectedRows();
        let result = [];

        return this.gridService.getTitleColumns(className)
            .then((columnName) => {
                for (let i = 0; i < focusedRows.length; i++) {
                    switch (type) {
                        case 'LINKSET':
                            result['_' + i] = focusedRows[i]['@rid'];

                            if (focusedRows[i].hasOwnProperty(columnName) &&
                                typeof columnName !== 'undefined') {
                                result.push(focusedRows[i][columnName]);
                            } else {
                                result.push(focusedRows[i]['@rid']);
                            }
                            break;
                        case 'LINK':
                            result[0] = focusedRows[i][columnName];
                            result['rid'] = focusedRows[i]['@rid'];
                            break;

                        default:
                            break;
                    }
                }

                result['type'] = type;

                return result;
            });
    }

}
