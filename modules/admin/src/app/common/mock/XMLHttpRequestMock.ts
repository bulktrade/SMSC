export class XMLHttpRequestMock {
    private _status: number = 200;
    private _onload;
    private _responseText;

    open(method: string, url: string) {
    }

    send() {
    }

    get responseText() {
        return this._responseText;
    }

    set responseText(value) {
        this._responseText = value;
    }

    set onload(value) {
        value();
        this._onload = value;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }
}
