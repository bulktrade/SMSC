import { Component } from "@angular/core";

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
