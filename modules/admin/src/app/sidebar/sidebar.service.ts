import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
    public prevLeftScroll: number;
    public prevTopScroll: number;
    private _sidenav;
    private _fullScreenMode: boolean = false;

    set sidenav(value) {
        this._sidenav = value;
    }

    public get fullScreenMode(): boolean {
        return this._fullScreenMode;
    }

    public  set fullScreenMode(value: boolean) {
        this._fullScreenMode = value;
    }

    public closeSidenav(): Promise<void> {
        return this._sidenav.close();
    }

    public toggleSidenav(): Promise<void> {
        return this._sidenav.toggle();
    }
}
