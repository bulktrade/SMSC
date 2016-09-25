import {Injectable} from '@angular/core';
import { MdSidenav } from "@angular2-material/sidenav";

<<<<<<< Updated upstream
@Injectable()
=======
//@Injectable()
>>>>>>> Stashed changes
export class SidebarService {
    private _sidenav:MdSidenav;
    private _fullScreenMode:boolean = false;

    set sidenav(value:MdSidenav) {
        this._sidenav = value;
    }

    public get fullScreenMode():boolean {
        return this._fullScreenMode;
    }

    public  set fullScreenMode(value:boolean) {
        this._fullScreenMode = value;
    }

    public closeSidenav():Promise<void> {
        return this._sidenav.close();
    }

    public toggleSidenav():Promise<void> {
<<<<<<< Updated upstream
        console.log(this._sidenav);
=======
>>>>>>> Stashed changes
        return this._sidenav.toggle();
    }
}
