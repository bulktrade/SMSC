import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
    private _prevLeftScroll: number;
    private _prevTopScroll: number;
    private _toggle: boolean = false;
    private _fullScreenMode: boolean = false;

    set sidenav(value) {
        this._toggle = value;
    }

    public get fullScreenMode(): boolean {
        return this._fullScreenMode;
    }

    public set fullScreenMode(value: boolean) {
        this._fullScreenMode = value;
    }

    public toggleSidenav() {
        return this._toggle = !this._toggle;
    }

    get prevLeftScroll(): number {
        return this._prevLeftScroll;
    }

    get toggle(): boolean {
        return this._toggle;
    }

    set toggle(value: boolean) {
        this._toggle = value;
    }

    set prevLeftScroll(value: number) {
        this._prevLeftScroll = value;
    }

    get prevTopScroll(): number {
        return this._prevTopScroll;
    }

    set prevTopScroll(value: number) {
        this._prevTopScroll = value;
    }
}
