import { Component, OnInit } from "@angular/core";
import { LoadingGridService } from "../services/loadingGrid.service";
import { CrudService } from "../crud/crud.service";

@Component({
    selector: 'loading-grid',
    template: `
        <sk-cube-grid [isRunning]="service.loadingGridData"></sk-cube-grid>
        <ng-content *ngIf="!service.loadingGridData"></ng-content>
    `
})

export class LoadingGrid implements OnInit {

    constructor(public service:LoadingGridService,
                public crudService: CrudService) {
    }

    ngOnInit():void {
        this.service.start();

        this.crudService.initGridData
            .then((res) => {
                this.service.stop();
            }, (error) => {
                this.service.stop();
            })
    }
}
