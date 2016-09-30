'use strict';
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var ODatabaseService = (function () {
    function ODatabaseService(databaseUrl, databaseName, authHttp) {
        this.authHttp = authHttp;
        this.authorization = null;
        this.getObjectFromLinksMap = function (obj, linkMap) {
            for (var field in obj) {
                if (!obj.hasOwnProperty(field)) {
                    continue;
                }
                var value = obj[field];
                if (typeof value === 'object') {
                    this.getObjectFromLinksMap(value, linkMap);
                }
                else {
                    if (field !== '@rid' && value.length > 0
                        && value.charAt(0) === '#' && linkMap[value] !== undefined) {
                        obj[field] = linkMap[value];
                    }
                }
            }
            return obj;
        };
        this.putObjectInLinksMap = function (obj, linkMap) {
            for (var field in obj) {
                if (!obj.hasOwnProperty(field)) {
                    continue;
                }
                var value = obj[field];
                if (typeof value === 'object') {
                    this.putObjectInLinksMap(value, linkMap);
                }
                else {
                    if (field === '@rid' && value.length > 0
                        && linkMap.hasOwnProperty(value)
                        && linkMap[value] === undefined) {
                        linkMap.foo = 2;
                        linkMap[value] = obj;
                    }
                }
            }
            return linkMap;
        };
        this.getRidWithPound = function (rid) {
            if (rid.indexOf('#', 0) > -1) {
                return rid;
            }
            else {
                return '#' + rid;
            }
        };
        this.removeCircleReferencesPopulateMap = function (obj, linkMap) {
            for (var field in obj) {
                if (!obj.hasOwnProperty(field)) {
                    continue;
                }
                var value = obj[field];
                if (value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
                    if (value['@rid'] !== undefined && value['@rid']) {
                        var rid = this.getRidWithPound(value['@rid']);
                        if (linkMap[rid] === undefined || !linkMap[rid]) {
                            linkMap[rid] = value;
                        }
                        linkMap = this.removeCircleReferencesPopulateMap(value, linkMap);
                    }
                }
                else if (value !== undefined && typeof value === 'object'
                    && Array.isArray(value)) {
                    for (var i in value) {
                        if (!value.hasOwnProperty(i)) {
                            continue;
                        }
                        var arrayValue = value[i];
                        if (arrayValue !== undefined && typeof arrayValue === 'object') {
                            if (arrayValue['@rid'] !== undefined && arrayValue['@rid']) {
                                var rid = this.getRidWithPound(arrayValue['@rid']);
                                if (linkMap[rid] === undefined || !linkMap[rid]) {
                                    linkMap[rid] = arrayValue;
                                }
                            }
                            linkMap = this.removeCircleReferencesPopulateMap(arrayValue, linkMap);
                        }
                    }
                }
            }
            return linkMap;
        };
        this.databaseUrl = databaseUrl;
        this.databaseName = databaseName;
        this.encodedDatabaseName = encodeURI(databaseName);
        this.databaseInfo = undefined;
        this.commandResult = undefined;
        this.commandResponse = undefined;
        this.errorMessage = undefined;
        this.evalResponse = true;
        this.parseResponseLink = true;
        this.removeObjectCircleReferences = true;
        this.urlPrefix = this.databaseUrl + '/';
        this.urlSuffix = '';
    }
    ODatabaseService.prototype.batchRequest = function (data) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: http_1.RequestMethod.Post,
            body: data
        });
        return Rx_1.Observable.create(function (observer) {
            _this.authHttp.request(_this.urlPrefix + 'batch/' + _this.encodedDatabaseName
                + _this.urlSuffix, requestOptions)
                .subscribe(function (res) {
                _this.setErrorMessage(undefined);
                _this.handleResponse(res);
                observer.next(res);
                observer.complete();
            }, function (error) {
                _this.setErrorMessage('Command error: ' + error.responseText);
                observer.error(error);
                observer.complete();
            });
        });
    };
    ;
    /**
     *
     * ### Example
     *
     * Content: { "transaction" : , "operations" : [ { "type" : "" }* ] }
     *
     * let operations: Array<operations> = [{
     *      "type": BatchType.UPDATE,
     *      "record": {
     *          "@rid": "#14:122",
     *          "name": "Luca",
     *          "vehicle": "Car"
     *      }
     *  }, {
     *      "type": BatchType.DELETE,
     *      "record": {
     *          "@rid": "#14:100"
     *      }
     *  }, {
     *      "type": BatchType.CREATE,
     *      "record": {
     *          "@class": "City",
     *          "name": "Venice"
     *      }
     *  }]
     *
     * batch(options);
     *
     *
     * for more information look here http://orientdb.com/docs/2.1/OrientDB-REST.html
     *
     */
    ODatabaseService.prototype.batch = function (operations) {
        var batch = {
            transaction: true,
            operations: operations
        };
        batch.operations.forEach(function (item) {
            for (var i in item.record) {
                if (Array.isArray(item.record[i])) {
                    if (item.record[i]['type'] === 'LINKSET') {
                        for (var k = 0; k < item.record[i]['length']; k++) {
                            item.record[i][k] = item.record[i]['_' + k];
                        }
                    }
                    else if (item.record[i]['type'] === 'LINK') {
                        item.record[i] = item.record[i]['rid'];
                    }
                }
            }
        });
        return this.batchRequest(JSON.stringify(batch));
    };
    ODatabaseService.prototype.getInfoClass = function (className) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-Type': 'application/json'
        });
        return this.authHttp.get(this.urlPrefix + 'class/' + this.encodedDatabaseName
            + '/' + className, headers)
            .toPromise()
            .then(function (res) {
            _this.setErrorMessage(undefined);
            _this.handleResponse(res);
            return Promise.resolve((_this.getCommandResponse()));
        }, function (error) {
            _this.setErrorMessage('Command error: ' + error.responseText);
            return Promise.reject(error);
        });
    };
    ODatabaseService.prototype.executeCommand = function (iCommand, iLanguage, iLimit, iFetchPlan) {
        return this.command(iCommand, iLanguage, iLimit, iFetchPlan);
    };
    ;
    ODatabaseService.prototype.command = function (iCommand, iLanguage, iLimit, iFetchPlan) {
        var _this = this;
        if (this.databaseInfo === undefined) {
            this.open();
        }
        if (!iLanguage) {
            iLanguage = 'sql';
        }
        if (!iLimit) {
            iLimit = -1;
        }
        if (iFetchPlan === undefined || iFetchPlan === '') {
            iFetchPlan = '';
        }
        else {
            iFetchPlan = '/' + encodeURIComponent(iFetchPlan);
        }
        iCommand = encodeURIComponent(iCommand);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: http_1.RequestMethod.Post
        });
        return new Promise(function (resolve, reject) {
            _this.authHttp.request(_this.urlPrefix + 'command/' + _this.encodedDatabaseName + '/' +
                iLanguage + '/' + iCommand + '/' + iLimit + iFetchPlan +
                _this.urlSuffix, requestOptions)
                .toPromise()
                .then(function (res) {
                _this.setErrorMessage(undefined);
                _this.handleResponse(res);
                resolve(_this.getCommandResponse());
            }, function (error) {
                _this.handleResponse(undefined);
                _this.setErrorMessage('Command error: ' + error.responseText);
            });
        });
    };
    ;
    ODatabaseService.prototype.open = function (userName, userPass, authProxy, type) {
        var _this = this;
        if (userName === undefined) {
            userName = '';
        }
        if (userPass === undefined) {
            userPass = '';
        }
        if (authProxy !== undefined && authProxy !== '') {
            this.urlPrefix = this.databaseUrl + authProxy + '/';
        }
        else {
            this.urlPrefix = this.databaseUrl.substring(this.databaseUrl.length - 1, this.databaseUrl.length) !== '/' ? this.databaseUrl + '/' : this.databaseUrl;
        }
        if (type === undefined) {
            type = http_1.RequestMethod.Get;
        }
        this.authorization = 'Basic ' + btoa(userName + ':' + userPass);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authorization,
            'X-Requested-With': 'XMLHttpRequest'
        });
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: type
        });
        return new Promise(function (resolve, reject) {
            _this.authHttp.request(_this.urlPrefix + 'connect/' +
                _this.encodedDatabaseName + _this.urlSuffix, type === http_1.RequestMethod.Get ? headers : requestOptions)
                .toPromise()
                .then(function (res) {
                if (res) {
                    _this.setDatabaseInfo(_this.transformResponse(res));
                    resolve(_this.getDatabaseInfo());
                }
                else {
                    _this.authorization = null;
                    reject(new Error('no response'));
                }
            }, function (error) {
                _this.authorization = null;
                reject(new Error('Connect error: ' + error.responseText));
            });
        });
    };
    /**
     *
     * @param iQuery
     * @param iLimit
     * @param iFetchPlan
     * @returns {Observable<Response>}
     */
    ODatabaseService.prototype.query = function (iQuery, iLimit, iFetchPlan) {
        if (iLimit === undefined || iLimit === '') {
            iLimit = '20';
        }
        var url = 'query/' + this.encodedDatabaseName + '/sql/'
            + encodeURIComponent(iQuery) + '/' + iLimit;
        if (iFetchPlan !== undefined && iFetchPlan !== '') {
            url += '/' + encodeURIComponent(iFetchPlan);
        }
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.authHttp.get(this.urlPrefix + url + this.urlSuffix, headers);
    };
    ODatabaseService.prototype.close = function () {
        var _this = this;
        if (this.databaseInfo !== undefined) {
            var headers_1 = new http_1.Headers({
                'Content-Type': 'application/json'
            });
            return new Promise(function (resolve, reject) {
                _this.authHttp.get(_this.urlPrefix + 'disconnect' + _this.urlSuffix, headers_1)
                    .toPromise()
                    .then(function (res) {
                    _this.handleResponse(res);
                    _this.setErrorMessage(undefined);
                    resolve(_this.getCommandResult());
                }, function (error) {
                    _this.handleResponse(undefined);
                    _this.setErrorMessage('Command response: '
                        + error.responseText);
                });
            });
        }
        this.databaseInfo = undefined;
    };
    ODatabaseService.prototype.handleResponse = function (iResponse) {
        if (typeof iResponse !== 'object') {
            iResponse = this.UTF8Encode(iResponse);
        }
        this.setCommandResponse(iResponse);
        if (iResponse !== undefined) {
            this.setCommandResult(this.transformResponse(iResponse));
        }
        else {
            this.setCommandResult(undefined);
        }
    };
    ODatabaseService.prototype.UTF8Encode = function (str) {
        var pattern = str.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < pattern.length; n++) {
            var c = pattern.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    ODatabaseService.prototype.transformResponse = function (msg) {
        if (this.getEvalResponse()) {
            var returnValue = void 0;
            if (msg.length > 0 && typeof msg !== 'object') {
                returnValue = JSON.parse(msg);
            }
            else {
                returnValue = msg;
            }
            if (this.getParseResponseLinks()) {
                return this.parseConnections(returnValue);
            }
            else {
                return returnValue;
            }
        }
        else {
            return msg;
        }
    };
    ODatabaseService.prototype.parseConnections = function (obj) {
        if (typeof obj === 'object') {
            var linkMap = {
                'foo': 0
            };
            linkMap = this.createObjectsLinksMap(obj, linkMap);
            if (linkMap.foo === 1) {
                linkMap = this.putObjectInLinksMap(obj, linkMap);
                if (linkMap.foo === 2) {
                    obj = this.getObjectFromLinksMap(obj, linkMap);
                }
            }
        }
        return obj;
    };
    ODatabaseService.prototype.createObjectsLinksMap = function (obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            var value = obj[field];
            if (typeof value === 'object') {
                this.createObjectsLinksMap(value, linkMap);
            }
            else {
                if (typeof value === 'string') {
                    if (value.length > 0 && value.charAt(0) === '#') {
                        if (!linkMap.hasOwnProperty(value)) {
                            linkMap.foo = 1;
                            linkMap[value] = undefined;
                        }
                    }
                }
            }
        }
        return linkMap;
    };
    ODatabaseService.prototype.removeCircleReferences = function (obj, linkMap) {
        linkMap = this.removeCircleReferencesPopulateMap(obj, linkMap);
        if (obj !== undefined && typeof obj === 'object' && !Array.isArray(obj)) {
            if (obj['@rid'] !== undefined && obj['@rid']) {
                var rid = this.getRidWithPound(obj['@rid']);
                linkMap[rid] = rid;
            }
        }
        this.removeCircleReferencesChangeObject(obj, linkMap);
    };
    ODatabaseService.prototype.removeCircleReferencesChangeObject = function (obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            var value = obj[field];
            if (value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
                var inspectObject = true;
                if (value['@rid'] !== undefined && value['@rid']) {
                    var rid = this.getRidWithPound(value['@rid']);
                    if (linkMap[rid] !== undefined && linkMap[rid]) {
                        var mapValue = linkMap[rid];
                        if (typeof mapValue === 'object') {
                            linkMap[rid] = rid;
                        }
                        else {
                            obj[field] = mapValue;
                            inspectObject = false;
                        }
                    }
                }
                if (inspectObject) {
                    this.removeCircleReferencesChangeObject(value, linkMap);
                }
            }
            else if (value !== undefined && typeof value === 'object'
                && Array.isArray(value)) {
                for (var i in value) {
                    if (!value.hasOwnProperty(i)) {
                        continue;
                    }
                    var arrayValue = value[i];
                    if (typeof arrayValue === 'object') {
                        var inspectObject = true;
                        if (arrayValue['@rid'] !== undefined && arrayValue['@rid']) {
                            var rid = this.getRidWithPound(arrayValue['@rid']);
                            if (linkMap[rid] !== undefined && linkMap[rid]) {
                                var mapValue = linkMap[rid];
                                if (typeof mapValue === 'object') {
                                    linkMap[rid] = rid;
                                }
                                else {
                                    value[i] = mapValue;
                                    inspectObject = false;
                                }
                            }
                        }
                        if (inspectObject) {
                            this.removeCircleReferencesChangeObject(arrayValue, linkMap);
                        }
                    }
                }
            }
        }
    };
    ODatabaseService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ODatabaseService.prototype.getUserName = function () {
        if (!this.databaseInfo) {
            return undefined;
        }
        return this.databaseInfo.currentUser;
    };
    ODatabaseService.prototype.create = function (userName, userPass, type, databaseType) {
        var _this = this;
        if (userName === undefined)
            userName = '';
        if (userPass === undefined)
            userPass = '';
        if (databaseType === undefined)
            databaseType = 'document';
        this.urlPrefix = this.databaseUrl;
        if (type === undefined || type === '') {
            type = 'local';
        }
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +
                btoa(userName + ':' + userPass)
        });
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: http_1.RequestMethod.Post
        });
        return Rx_1.Observable.create(function (observer) {
            _this.authHttp.request(_this.urlPrefix + 'database/' + _this.encodedDatabaseName + '/' +
                type + '/' + databaseType + _this.urlSuffix, requestOptions)
                .subscribe(function (res) {
                _this.setErrorMessage(undefined);
                _this.setDatabaseInfo(_this.transformResponse(res));
                observer.next(res);
                observer.complete();
            }, function (err) {
                _this.setErrorMessage('Connect error: ' + err.responseText);
                _this.setDatabaseInfo(undefined);
                observer.error(err);
                observer.complete();
            });
        });
    };
    ODatabaseService.prototype.metadata = function () {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return new Promise(function (resolve, reject) {
            _this.authHttp.get(_this.urlPrefix + 'database/' + _this.encodedDatabaseName
                + _this.urlSuffix, headers)
                .toPromise()
                .then(function (res) {
                _this.setErrorMessage(undefined);
                _this.setDatabaseInfo(_this.transformResponse(res));
                resolve(_this.getDatabaseInfo());
            }, function (error) {
                _this.setErrorMessage('Connect error: ' + error.responseText);
                _this.setDatabaseInfo(undefined);
            });
        });
    };
    ODatabaseService.prototype.load = function (iRID, iFetchPlan) {
        var _this = this;
        if (this.databaseInfo === undefined) {
            this.open();
        }
        if (iFetchPlan !== undefined && iFetchPlan !== '') {
            iFetchPlan = '/' + iFetchPlan;
        }
        else {
            iFetchPlan = '';
        }
        if (iRID && iRID.charAt(0) === '#') {
            iRID = iRID.substring(1);
        }
        iRID = encodeURIComponent(iRID);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.authHttp.get(this.urlPrefix + 'document/' + this.encodedDatabaseName + '/'
            + iRID + iFetchPlan + this.urlSuffix, headers)
            .toPromise()
            .then(function (res) {
            _this.setErrorMessage(undefined);
            _this.handleResponse(res);
            return Promise.resolve(_this.getCommandResult());
        }, function (error) {
            _this.handleResponse(undefined);
            _this.setErrorMessage('Query error: ' + error.responseText);
            return Promise.reject(error);
        });
    };
    ODatabaseService.prototype.save = function (obj, errorCallback, successCallback) {
        var _this = this;
        if (this.databaseInfo === undefined) {
            this.open();
        }
        var rid = obj['@rid'];
        var methodType = rid === undefined || rid === '-1:-1' ? 'POST' : 'PUT';
        if (this.removeObjectCircleReferences && typeof obj === 'object') {
            this.removeCircleReferences(obj, {});
        }
        var url = this.urlPrefix + 'document/' + this.encodedDatabaseName;
        if (rid) {
            url += '/' + encodeURIComponent(rid);
        }
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var body = JSON.stringify(JSON.parse(obj));
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: methodType,
            body: body
        });
        return Rx_1.Observable.create(function (observer) {
            _this.authHttp.request(url + _this.urlSuffix, requestOptions)
                .subscribe(function (res) {
                _this.setErrorMessage(undefined);
                _this.setCommandResponse(res);
                _this.setCommandResult(res);
                if (successCallback) {
                    successCallback(res);
                }
                observer.next(_this.getCommandResult());
                observer.complete();
            }, function (error) {
                _this.handleResponse(undefined);
                _this.setErrorMessage('Save error: ' + error.responseText);
                if (errorCallback) {
                    errorCallback(error.responseText);
                }
                observer.error(_this.getCommandResult());
                observer.complete();
            });
        });
    };
    ODatabaseService.prototype.indexPut = function (iIndexName, iKey, iValue) {
        var _this = this;
        if (this.databaseInfo === undefined) {
            this.open();
        }
        var req = this.urlPrefix + 'index/' + this.encodedDatabaseName + '/'
            + iIndexName + '/' + iKey;
        var content;
        if (typeof iValue === 'object') {
            content = JSON.parse(iValue);
        }
        else {
            req += '/' + iValue;
            content = undefined;
        }
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var requestOptions = new http_1.RequestOptions({
            headers: headers,
            method: http_1.RequestMethod.Put
        });
        return Rx_1.Observable.create(function (observer) {
            _this.authHttp.request(req + _this.urlSuffix, requestOptions)
                .subscribe(function (res) {
                _this.setErrorMessage(undefined);
                observer.next(res);
                observer.complete();
            }, function (error) {
                _this.handleResponse(undefined);
                _this.setErrorMessage('Index put error: ' + error.responseText);
                observer.error(error);
                observer.complete();
            });
        });
    };
    ODatabaseService.prototype.getDatabaseInfo = function () {
        return this.databaseInfo;
    };
    ODatabaseService.prototype.setDatabaseInfo = function (iDatabaseInfo) {
        this.databaseInfo = iDatabaseInfo;
    };
    ODatabaseService.prototype.getCommandResult = function () {
        return this.commandResult;
    };
    ODatabaseService.prototype.setCommandResult = function (iCommandResult) {
        this.commandResult = iCommandResult;
    };
    ODatabaseService.prototype.setErrorMessage = function (iErrorMessage) {
        this.errorMessage = iErrorMessage;
    };
    ODatabaseService.prototype.getEvalResponse = function () {
        return this.evalResponse;
    };
    ODatabaseService.prototype.getParseResponseLinks = function () {
        return this.parseResponseLink;
    };
    ODatabaseService.prototype.getCommandResponse = function () {
        return this.commandResponse;
    };
    ODatabaseService.prototype.setCommandResponse = function (iCommandResponse) {
        this.commandResponse = iCommandResponse;
    };
    ODatabaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [String, String, angular2_jwt_1.AuthHttp])
    ], ODatabaseService);
    return ODatabaseService;
}());
exports.ODatabaseService = ODatabaseService;
//# sourceMappingURL=orientdb.service.js.map