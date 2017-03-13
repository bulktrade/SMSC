import {Component, Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'sk-cube-grid',
    styleUrls: ['cube-grid.component.scss'],
    templateUrl: './cube-grid.component.html'
})

export class CubeGridComponent {
    @Input()
    public delay: number = 0;

    @Input()
    public backgroundColor: string = '#009688';

    @Input()
    public isRunning: boolean = true;

}

@NgModule({
    imports: [CommonModule],
    exports: [CubeGridComponent],
    declarations: [CubeGridComponent],
})
export class CubeGridModule {
}
