import { Component, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CubeGridModule } from "./spinner/cubeGrid/cubeGrid.component";

@Component({
    selector: ' loading-router-outlet',
    template: `
        <router-outlet *ngIf="!loading" (activate)="stop()" (deactivate)="start()"></router-outlet>
        <sk-cube-grid [isRunning]="loading"></sk-cube-grid>
    `
})

export class LoadingRouterOutlet {
    public loading = false;

    start() {
        this.loading = true;
    }

    stop() {
        this.loading = false;
    }
}

@NgModule({
    imports: [CommonModule, CubeGridModule, RouterModule],
    exports: [LoadingRouterOutlet],
    declarations: [LoadingRouterOutlet]
})
export class LoadingRouterOutletModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoadingRouterOutletModule,
            providers: []
        };
    }
}
