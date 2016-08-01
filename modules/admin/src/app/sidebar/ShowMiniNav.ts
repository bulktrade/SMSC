import {LocalStorage} from 'angular2-localstorage/WebStorage';

// save state short navigation after reload page
export class ShowMiniNav {
    @LocalStorage()
    public showNav: boolean;

    constructor() {
    }
}
