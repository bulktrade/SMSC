import {Component, Input} from "@angular/core";

@Component({
    selector: 'sk-cube-grid',
    styles: [
        require('./cubeGrid.scss')
    ],
    template: require('./cubeGrid.html')
})

export class CubeGridComponent {
    @Input()
    public delay:number = 0;

    @Input()
    public backgroundColor:string = '#009688';

    @Input()
    public isRunning:boolean = true;

}
