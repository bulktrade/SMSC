import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { GridService } from "../../services/grid.service";

@Component({
    selector: 'crud-linkset',
    template: require('./crud.linkset.html'),
    styleUrls: [
        require('./crud.linkset.scss'),
        require('../common/grid.scss'),
        require('../common/style.scss')
    ],
    providers: []
})

export class CrudLinkset {
    public resolveData: any;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public gridService: GridService) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['linkset'];
        this.crudService.gridOptions.columnDefs = this.resolveData;
    }

    back() {
        this.crudService.previousCrudLevel();
        this.location.back();
    }

    navigateToCreate() {
        this.crudService.setModel({});
        this.router.navigate([this.crudService.parentPath, 'create', this.crudService.getLinkedClass()]);
    }

    navigateToDelete() {
        let id = this.crudService.getSelectedRID(this.crudService.gridOptions);

        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    }

    addLink(gridOptions) {
        let params: any = this.crudService.modifiedRecord.data;

        return this.getLinkset(gridOptions, this.crudService.modifiedRecord.type)
            .then(linkSet => {
                if (this.crudService.modifiedRecord.type === 'LINK') {
                    params[this.crudService.modifiedRecord.modifiedLinkset] = linkSet;
                } else {
                    params[this.crudService.modifiedRecord.modifiedLinkset] = linkSet;
                }

                if (this.crudService.modifiedRecord.from === 'CrudView') {
                    this.crudService.updateRecord(params);
                    this.back();
                } else {
                    this.crudService.model = params;
                    this.back();
                }

            });
    }

    getLinkset(gridOptions, type) {
        let focusedRows = gridOptions.api.getSelectedRows();
        let result = [];

        return this.gridService.getTitleColumns(this.crudService.getLinkedClass())
            .then((columnName) => {
                for (let i = 0; i < focusedRows.length; i++) {
                    switch (type) {
                        case 'LINKSET':
                            result['_' + i] = focusedRows[i]['@rid'];

                            if (focusedRows[i].hasOwnProperty(columnName) &&
                                typeof columnName !== 'undefined') {
                                result.push(focusedRows[i][columnName]);
                            } else {
                                result.push(focusedRows[i]['@rid'])
                            }
                            break;
                        case 'LINK':
                            result[0] = focusedRows[i][columnName];
                            result['rid'] = focusedRows[i]['@rid'];
                            break;
                    }
                }

                result['type'] = type;

                return result;
            });
    }

}
