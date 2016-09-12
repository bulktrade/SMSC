import { Component, OnInit, NgModule, ModuleWithProviders } from "@angular/core";
import { LoadingGridService } from "../services/loading/loadingGrid.service";
import { CrudService } from "../crud/crud.service";
import { CubeGridModule } from "./spinner/cubeGrid/cubeGrid.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'loading-grid',
    template: `
        <sk-cube-grid [isRunning]="service.loading"></sk-cube-grid>
        <ng-content *ngIf="!service.loading"></ng-content>
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

@NgModule({
    imports: [CommonModule, CubeGridModule],
    exports: [LoadingGrid],
    declarations: [LoadingGrid]
})
export class LoadingGridModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoadingGridModule,
            providers: []
        };
    }
}
