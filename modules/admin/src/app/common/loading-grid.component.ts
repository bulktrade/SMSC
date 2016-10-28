import { Component, OnInit, NgModule, ModuleWithProviders } from '@angular/core';
import { LoadingGridService } from '../services/loading/loading-grid.service';
import { CubeGridModule } from './spinner/cube-grid/cube-grid.component';
import { CommonModule } from '@angular/common';

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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoadingGridModule,
            providers: []
        };
    }
}
