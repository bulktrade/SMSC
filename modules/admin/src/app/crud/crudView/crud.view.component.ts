import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { AgGridNg2 } from "ag-grid-ng2/main";
import { GridOptions } from "ag-grid/main";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";
import { LoadingGrid } from "../../common/loadingGrid";

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    styles: [
        require('./crud.view.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        AgGridNg2,
        AlertComponent,
        LoadingGrid,
        CrudView
    ],
    pipes: [TranslatePipe]
})

export class CrudView {
    public gridOptions: GridOptions;
    public showLinksetView = false;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.crudService.className = this.route.parent.parent.routeConfig.data['crudClass']; // @todo create method setClassName and use it. Add try and catch and validate if crudClass exists. If not throw exception.
        this.crudService.parentPath = this.router.url; // @todo create method setParentPath and use it.

        this.crudService.initializationGrid(this.crudService.getClassName(), // @todo renmae initializationGrid to initGrid. Put the whole block in an own method.
            (rowData) => {
                this.crudService.gridOptions.rowData = rowData;
                this.crudService.setRowData(rowData, this.crudService.gridOptions);
            },
            (columnDefs) => {
                this.crudService.gridOptions.columnDefs = columnDefs;
                this.crudService.addCheckboxSelection(columnDefs, this.crudService.gridOptions); // @todo rename to addColumnCheckbox
            });

        this.gridOptions = this.crudService.gridOptions;
    }

    goToCreate() { // @todo rename to navigateToCreate
        this.crudService.multiCrud.push({ // @todo work with
            goto: 'formCreate', // @todo rename goto to goTo.
            className: this.crudService.getClassName()
        });

        this.router.navigateByUrl(this.crudService.parentPath + '/create');
    }

    back(addLinkset?: (value) => void) {
        if (this.crudService.multiCrud.length) {
            this.crudService.lastCrudElement = this.crudService.multiCrud.pop();

            if (addLinkset) {
                addLinkset(this.crudService.lastCrudElement)
            }

            this.crudService.linkedClass = this.crudService.lastCrudElement.linkedClass;

            if (this.crudService.lastCrudElement.goto === 'grid') {
                this.showLinksetView = true;
            } else if (this.crudService.lastCrudElement.goto === 'formCreate') {
                this.router.navigateByUrl(this.crudService.parentPath + '/create');
            }

            switch (this.crudService.lastCrudElement.goto) {
                case 'grid':
                    this.showLinksetView = true;
                    break;

                case 'formCreate':
                    this.router.navigateByUrl(this.crudService.parentPath + '/create');
                    break;

                case 'formEdit':
                    this.crudService.isEditForm = true;
                    this.router.navigateByUrl(this.crudService.parentPath + '/edit');
                    break;

                default:
                    break;
            }
        }
    }

    addLink(gridOptions) {
        let focusedRows = gridOptions.api.getSelectedRows();
        let params: any;
        let linkSet = [];

        for (let item = 0; item < focusedRows.length; item++) {
            linkSet.push(focusedRows[item].rid);
        }

        this.back((element) => {
            switch (element.goto) {
                case 'grid':
                    params = element.data;
                    params[element.field] = linkSet;
                    this.crudService.updateRecord(params);
                    break;

                case 'formCreate':
                case 'formEdit':
                    this.crudService.lastCrudElement.model[element.field] = linkSet;
                    break;

                default:
                    break;
            }
        });
    }

    clickOnCell(event) {
        let columnDefs = event.colDef;

        if (columnDefs.type === 'LINK' ||
            columnDefs.type === 'LINKSET') {
            this.crudService.multiCrud.push({
                linkedClass: this.crudService.getClassName(),
                data: event.data,
                field: columnDefs.field,
                goto: 'grid'
            });

            this.crudService.linkedClass = columnDefs.linkedClass;
            this.showLinksetView = true;
        }
    }
}
