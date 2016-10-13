import { Component, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ng2-bootstrap';
import { TranslateModule } from 'ng2-translate';

@Component({
    selector: 'no-internet',
    styles: [
        `
        alert {
            text-align: center;
        }
    `
    ],
    template: `
        <alert *ngIf="!toggle" type="danger" dismissible="true">
            {{ 'NO_INTERNET_CONNECTION' | translate }}
        </alert>
        <ng-content *ngIf="toggle"></ng-content>
`
})

export class NoInternet {
    private toggle: boolean = true;

    constructor() {
    }

    ngOnInit() {
        window.addEventListener('offline', () => {
            this.offline();
        }, false);

        window.addEventListener('online', () => {
            this.online();
        }, false);
    }

    offline() {
        this.toggle = false;
    }

    online() {
        this.toggle = true;
    }
}

@NgModule({
    imports: [CommonModule, AlertModule, TranslateModule],
    exports: [NoInternet],
    declarations: [NoInternet]
})
export class NoInternetModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NoInternetModule,
            providers: []
        };
    }
}

