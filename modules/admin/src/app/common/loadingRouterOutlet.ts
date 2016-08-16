import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { CubeGridComponent } from "./spinner/cubeGrid/cubeGrid.component";

@Component({
    selector: ' loading-router-outlet',
    directives: [
        ROUTER_DIRECTIVES,
        CubeGridComponent
    ],
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
