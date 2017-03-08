import {Component, NgModule, ViewEncapsulation} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CubeGridModule} from "../cube-grid/cube-grid.component";
import {LoadingRouterOutletService} from "../../../services/loading/loading-router-outlet.service";

@Component({
    selector: 'loading-router-outlet',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
        router-outlet.hide + * {
            display: none;
        }

        .cubeGrid sk-cube-grid,
        .cubeGrid {
            height: 100%;
            width: 100%;
            display: flex;
        }

        .cubeGrid .cube-grid-spinner {
            margin: auto !important;
        }
    `
    ],
    template: `
        <div class="cubeGrid" *ngIf="loadingService.loading"><sk-cube-grid></sk-cube-grid></div>
        <router-outlet [ngClass]="{hide: loadingService.loading}"></router-outlet>
    `
})

export class LoadingRouterOutletComponent {
    constructor(public loadingService: LoadingRouterOutletService) {
    }
}

@NgModule({
    imports: [CommonModule, CubeGridModule, RouterModule],
    exports: [LoadingRouterOutletComponent],
    declarations: [LoadingRouterOutletComponent]
})
export class LoadingRouterOutletModule {
}
