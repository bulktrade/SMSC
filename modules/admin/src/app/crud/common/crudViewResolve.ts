import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudService } from "../crud.service";
import { CrudResolve } from "./crudResolve";

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public router:Router,
                public crudService:CrudService) {
        super();
    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        this.crudService.className = route.parent.parent.data[ 'crudClass' ];
        this.crudService.parentPath = state.url;

        this.crudService.initGridData = new Promise((resolve, reject) => {
            this.crudService.getColumnDefs(this.crudService.className, true)
                .then((columnDefs) => {
                    this.crudService.crudModel.columnDefs = columnDefs;
                    this.crudService.gridOptions.columnDefs = columnDefs;
                    this.crudService.addCheckboxSelection(columnDefs, this.crudService.gridOptions);
                }, (error) => {
                    this.crudService.dataNotFound = true;
                    this.crudService.errorMessage = 'orientdb.dataNotFound';
                })
                .then(() => {
                    // init the row data
                    this.crudService.getStore(this.crudService.className)
                        .then((store) => {
                            if (!store.length) {
                                this.crudService.isInfoMessage = true;
                                this.crudService.infoMessage = 'orientdb.noRows';
                            }

                            this.crudService.gridOptions.rowData = store;
                            this.crudService.setRowData(store, this.crudService.gridOptions);
                            this.crudService.crudModel.rowData = store;
                            resolve();
                        }, (error) => {
                            this.crudService.dataNotFound = true;
                            this.crudService.errorMessage = 'orientdb.dataNotFound';
                            reject(error);
                        });
                });
        });

    }

}
