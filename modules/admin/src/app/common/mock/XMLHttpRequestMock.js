"use strict";
var XMLHttpRequestMock = (function () {
    function XMLHttpRequestMock() {
        this._status = 200;
    }
    XMLHttpRequestMock.prototype.open = function (method, url) {
    };
    XMLHttpRequestMock.prototype.send = function () {
    };
    Object.defineProperty(XMLHttpRequestMock.prototype, "responseText", {
        get: function () {
            return this._responseText;
        },
        set: function (value) {
            this._responseText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequestMock.prototype, "onload", {
        set: function (value) {
            value();
            this._onload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLHttpRequestMock.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    return XMLHttpRequestMock;
}());
exports.XMLHttpRequestMock = XMLHttpRequestMock;
//# sourceMappingURL=XMLHttpRequestMock.js.map