import {Component, NgModule, ViewEncapsulation} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "ng2-translate";
import {Message} from "primeng/components/common/api";
import {MessagesModule} from "primeng/components/messages/messages";

@Component({
    selector: 'no-internet',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
        #no-internet-message .ui-messages-error {
            box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
            margin: 0;
        }
    `
    ],
    template: `
        <p-messages id="no-internet-message" *ngIf="!toggle" [value]="msgs" [closable]="false"></p-messages>
        <ng-content *ngIf="toggle"></ng-content>
`
})
export class NoInternetComponent {
    public toggle: boolean = true;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        this.translate.get('NO_INTERNET_CONNECTION')
            .subscribe(detail => {
                this.msgs.push({severity: 'error', detail: detail});
            });

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
    imports: [CommonModule, TranslateModule, MessagesModule],
    exports: [NoInternetComponent],
    declarations: [NoInternetComponent]
})
export class NoInternetModule {
}

