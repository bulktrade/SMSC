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

        return this.getLinkset(gridOptions)
            .then(linkSet => {
                if (this.crudService.modifiedRecord.type === 'LINK') {
                    params[this.crudService.modifiedRecord.modifiedLinkset] = linkSet.join().replace(/\[|\]/gi, '');
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

    getLinkset(gridOptions) {
        let focusedRows = gridOptions.api.getSelectedRows();
        let result = [];

        return this.gridService.getTitleColumns(this.crudService.getLinkedClass())
            .then((columnName) => {
                for (let i = 0; i < focusedRows.length; i++) {
                    result['_' + i] = focusedRows[i]['@rid'];

                    if (focusedRows[i].hasOwnProperty(columnName) &&
                        typeof columnName !== 'undefined') {
                        result.push(focusedRows[i][columnName]);
                    } else {
                        result.push(focusedRows[i]['@rid'])
                    }
                }

                return result;
            });
    }

}
