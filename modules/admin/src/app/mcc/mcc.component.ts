import {Component, OnInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {TranslateService} from "ng2-translate";

import {MCC} from "./mcc.model";

@Component({
    selector: 'mcc',
    templateUrl: './mcc.component.html',
    styleUrls: [
        './mcc.component.scss',
        '../shared/styles/view.component.scss'
    ]
})
export class MCCComponent implements OnInit {

    public rowData: MCC[] = [];

    public isFiltering: { [inputFieldName: string]: boolean }[] = [];

    public filters: { [colName: string]: string } = {};

    public selectedRows: MCC[] = [];

    public _isMobileDevice: boolean = false;

    public isDeleteWindow: boolean = false;

    public msgs: Message[] = [];

    constructor(public translate: TranslateService) {
        this.rowData = [
            <MCC>{mcc: 'mcc1', code: 'code1', country: 'country1'},
            <MCC>{mcc: 'mcc2', code: 'code2', country: 'country2'}
        ];
    }

    ngOnInit() {
        this.translate.get('MULTIPLE_DELETE_RECORDS')
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
        this._isMobileDevice = this.isMobileDevice(window.innerWidth);
    }

    onPage(event) {
    }

    onEditComplete(event) {
    }

    onSort(event) {
    }

    onMultipleDelete() {
    }

    onFilter(colName: string, inputField) {
        this.filters[colName] = inputField.value;
        this.isFiltering[<string>inputField.name] = true;

        setTimeout(() => this.isFiltering[<string>inputField.name] = false, 500);
    }

    toggleDeleteWindow() {
        this.isDeleteWindow = !this.isDeleteWindow;
    }

    onResize(event) {
        this._isMobileDevice = this.isMobileDevice(event.target.innerWidth);
    }

    isMobileDevice(width: number): boolean {
        return width <= 640;
    }
}
