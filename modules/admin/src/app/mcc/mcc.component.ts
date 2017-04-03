import {Component, OnInit} from "@angular/core";

import {MCC} from "./mcc.model";

@Component({
    selector: 'mcc',
    templateUrl: './mcc.component.html',
    styleUrls: ['./mcc.component.scss']
})
export class MCCComponent implements OnInit {

    public rowData: MCC[] = [];

    public isFiltering: { [inputFieldName: string]: boolean }[] = [];

    public filters: { [colName: string]: string }[] = [];

    public selectedRows: MCC[] = [];

    public _isMobileDevice: boolean = false;

    constructor() {
        this.rowData = [
            <MCC>{mcc: 'mcc', code: 'code', country: 'country'},
            <MCC>{mcc: 'mcc', code: 'code', country: 'country'}
        ];
    }

    ngOnInit() {
        this._isMobileDevice = this.isMobileDevice(window.innerWidth);
    }

    onPage(event) {
    }

    onEditComplete(event) {
    }

    onSort(event) {
    }

    onFilter(colName: string, inputField) {
        this.filters[colName] = inputField.value;
        this.isFiltering[<string>inputField.name] = true;

        setTimeout(() => this.isFiltering[<string>inputField.name] = false, 500);
    }

    onResize(event) {
        this._isMobileDevice = this.isMobileDevice(event.target.innerWidth);
    }

    isMobileDevice(width: number): boolean {
        return width <= 640;
    }
}
