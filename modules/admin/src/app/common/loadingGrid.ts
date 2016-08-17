import { Component, Input, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { CubeGridComponent } from "./spinner/cubeGrid/cubeGrid.component";
import { CrudService } from "../crud/crud.service";

@Component({
    selector: 'loading-grid',
    directives: [
        ROUTER_DIRECTIVES,
        CubeGridComponent
    ],
    template: `
        <sk-cube-grid [isRunning]="loadingGridData && !this.crudService.dataNotFound"></sk-cube-grid>
        <ng-content *ngIf="!loadingGridData && !this.crudService.dataNotFound"></ng-content>
    `
})

export class LoadingGrid implements OnInit {
    @Input('crudService') crudService:CrudService;
    public loadingGridData = false;

    ngOnInit():void {
        if (!this.crudService.dataNotFound) {
            this.start();
        }

        this.crudService.crud.then(() => {
            this.crudService.initGridData.then(() => {
                this.stop();
            })
        });
    }

    start() {
        this.loadingGridData = true;
    }

    stop() {
        this.loadingGridData = false;
    }
}
