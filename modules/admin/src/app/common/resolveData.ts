import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router} from "@angular/router";
import {Injectable, Inject} from "@angular/core";
import {CrudService} from "../crud/crud.service";
import {GridOptions} from "ag-grid";

@Injectable()
export class ResolveData implements Resolve<any> {

    constructor(public crudService: CrudService,
                public router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.crudService.activeComponent = route.component['name'];
        this.crudService.currPath = route['_urlSegment'].pathsWithParams[0].path;
        this.crudService.setCrudClass(this.router['config']);

        if (this.crudService.activeComponent === 'CrudLinkset') {
            this.crudService.className = this.crudService.linkedClass;
        }

        this.crudService.initGridData = new Promise((resolve, reject) => {
            this.crudService.getColumnDefs(this.crudService.className, true)
                .then((columnDefs) => {
                    this.crudService.crudModel.columnDefs = columnDefs;
                    this.crudService.gridOptions.columnDefs = columnDefs;
                    this.crudService.addCheckboxSelection(columnDefs, this.crudService.gridOptions);
                })
                .then((res) => {
                    // init the row data
                    this.crudService.getStore(this.crudService.className)
                        .then((store) => {
                            this.crudService.gridOptions.rowData = store;
                            this.crudService.crudModel.rowData = store;
                            if (this.crudService.activeComponent === 'CrudEdit') {
                                this.crudService.model = this.crudService.crudModel.rowData[0];
                            }
                            resolve();
                        }, (error) => {
                            this.crudService.dataNotFound = true;
                            this.crudService.errorMessage = 'orientdb.dataNotFound';
                        });
                });
        });

    }

}
