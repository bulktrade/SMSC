import {Component} from 'angular2/core';
import {MCCMNCGrid} from './directives/mccmnc-grid';

@Component({
    selector: 'mccmnc',
    templateUrl: 'app/components/mccmnc/mccmnc.html',
    styleUrls: ['app/components/mccmnc/mccmnc.css'],
    providers: [],
    directives: [MCCMNCGrid],
    pipes: []
})
export class MCCMNC {

    constructor() {}

    ngOnInit() {

    }

}