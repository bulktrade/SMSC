import {Component, OnInit, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingGridService} from "../../../services/loading/loading-grid.service";
import {CubeGridModule} from "../cube-grid/cube-grid.component";

@Component({
    selector: 'loading-grid',
    template: `
        <sk-cube-grid [isRunning]='service.loading'></sk-cube-grid>
        <ng-content *ngIf="!service.loading"></ng-content>
    `
})

export class LoadingGridComponent implements OnInit {

    constructor(public service: LoadingGridService) {
    }

    ngOnInit(): void {
    }
}

@NgModule({
    imports: [CommonModule, CubeGridModule],
    exports: [LoadingGridComponent],
    declarations: [LoadingGridComponent]
})
export class LoadingGridModule {
}
