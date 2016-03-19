"use strict";
import 'rxjs/add/operator/map'
import {Injectable} from 'angular2/core';
import {Request} from './Request';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ODatabase {
    private request;
    private databaseUrl;
    private databaseName;
    private encodedDatabaseName;
    private databaseInfo;
    private commandResult;
    private commandResponse;
    private errorMessage;
    private evalResponse;
    private parseResponseLink;
    private removeObjectCircleReferences;
    private urlPrefix;
    private urlSuffix;

    constructor(databasePath: string) {
        this.databaseUrl = "";
        this.databaseName = "";
        this.encodedDatabaseName = "";
        this.databaseInfo = null;
        this.commandResult = null;
        this.commandResponse = null;
        this.errorMessage = null;
        this.evalResponse = true;
        this.parseResponseLink = true;
        this.removeObjectCircleReferences = true;
        this.urlPrefix = "/";
        this.urlSuffix = "";
        this.request = new Request();

        if (databasePath) {
            var pos = databasePath.indexOf('orientdb_proxy', 8); // JUMP HTTP
            if (pos > -1) {
                pos = databasePath.indexOf('/', pos); // END OF PROXY
            } else {
                pos = databasePath.indexOf('/', 8);
            }

            if (pos > -1) {
                this.databaseUrl = databasePath.substring(0, pos + 1);
                this.databaseName = databasePath.substring(pos + 1);
            } else {
                this.databaseUrl = databasePath;
                this.databaseName = null;
            }

            if (this.databaseName != null && this.databaseName.indexOf('/') > -1) {
                this.encodedDatabaseName = "";
                var parts = this.databaseName.split('/');
                for (var p in parts) {
                    if (!parts.hasOwnProperty(p)) {
                        continue;
                    }

                    if (this.encodedDatabaseName.length > 0) {
                        this.encodedDatabaseName += '$';
                    }

                    this.encodedDatabaseName += parts[p];
                }
            } else {
                this.encodedDatabaseName = this.databaseName;
            }
        }
    }

    open(userName?, userPass?, authProxy?, type?) {
        if (userName == null) {
            userName = '';
        }

        if (userPass == null) {
            userPass = '';
        }

        if (authProxy != null && authProxy != '') {
            this.urlPrefix = this.databaseUrl + authProxy + "/";
        } else {
            this.urlPrefix = this.databaseUrl;
        }

        if (type == null || type == '') {
            type = 'GET';
        }

        this.request.basicAuth(userName, userPass);

        return this.request.httpRequest({
            url: this.urlPrefix + 'database/' + this.encodedDatabaseName + this.urlSuffix,
            type: "get"
        })
            .then(
                res => {
                    this.setErrorMessage(null);
                        if(res) {
                            this.setDatabaseInfo(this.transformResponse(res));
                        }
                    return this.getDatabaseInfo();
                },
                error => {
                    this.setDatabaseInfo(null);
                    this.setErrorMessage('Connect error: ' + error.responseText);
                }
            )
    }

    query(iQuery?, iLimit?, iFetchPlan?,
          successCallback?, errorCallback?) {

        if (iLimit == null || iLimit == '') {
            iLimit = '20';
        }

        var url = 'query/' + this.encodedDatabaseName + '/sql/' + encodeURIComponent(iQuery) + '/' + iLimit;

        if (iFetchPlan != null && iFetchPlan != '') {
            url += '/' + encodeURIComponent(iFetchPlan);
        }

        return this.request.httpRequest({
            url: this.urlPrefix + url + this.urlSuffix,
            type: "get"
        })
            .then(res => {
                this.setErrorMessage(null);
                this.handleResponse(res);
                if (successCallback) {
                    successCallback(this.commandResult);
                }
                return successCallback instanceof Function ? null : this.getCommandResult();
            }).catch(error => {
                this.handleResponse(null);
                this.setErrorMessage('Query error: ' + error.responseText);
                if (errorCallback) {
                    errorCallback(this.errorMessage);
                }
            });
    }

    close() {
        if (this.databaseInfo != null) {
            return this.request.httpRequest({
                url: this.urlPrefix + 'disconnect' + this.urlSuffix,
                type: "get"
            })
                .then(res => {
                    this.handleResponse(res);
                    this.setErrorMessage(null);
                    return this.getCommandResult();
                }).catch(error => {
                    this.handleResponse(null);
                    this.setErrorMessage('Command response: '
                        + error.responseText);
                });
        }

        this.databaseInfo = null;
    }

    handleResponse(iResponse) {
        if (typeof iResponse != 'object') {
            iResponse = this.UTF8Encode(iResponse);
        }

        this.setCommandResponse(iResponse);

        if (iResponse != null) {
            this.setCommandResult(this.transformResponse(iResponse));
        } else {
            this.setCommandResult(null);
        }
    }

    UTF8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for ( var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    transformResponse(msg) {
        if (this.getEvalResponse()) {
            var returnValue;
            if (msg.length > 0 && typeof msg != 'object') {
                returnValue = JSON.parse(msg);
            } else {
                returnValue = msg;
            }

            if (this.getParseResponseLinks()) {
                return this.parseConnections(returnValue);
            } else {
                return returnValue;
            }
        } else {
            return msg;
        }
    }

    parseConnections(obj) {
        if (typeof obj == 'object') {
            var linkMap = {
                "foo": 0
            };

            linkMap = this.createObjectsLinksMap(obj, linkMap);
            if (linkMap["foo"] == 1) {
                linkMap = this.putObjectInLinksMap(obj, linkMap);
                if (linkMap["foo"] == 2) {
                    obj = this.getObjectFromLinksMap(obj, linkMap);
                }
            }
        }

        return obj;
    }

    createObjectsLinksMap(obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            var value = obj[field];
            if (typeof value == 'object') {
                this.createObjectsLinksMap(value, linkMap);
            } else {
                if (typeof value == 'string') {
                    if (value.length > 0 && value.charAt(0) == '#') {
                        if (!linkMap.hasOwnProperty(value)) {
                            linkMap["foo"] = 1;
                            linkMap[value] = null;
                        }
                    }
                }
            }
        }
        return linkMap;
    }

    getObjectFromLinksMap = function (obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }

            var value = obj[field];
            if (typeof value == 'object') {
                this.getObjectFromLinksMap(value, linkMap);
            } else {
                if (field != '@rid' && value.length > 0
                    && value.charAt(0) == '#' && linkMap[value] != null) {
                    obj[field] = linkMap[value];
                }
            }
        }
        return obj;
    }

    putObjectInLinksMap = function (obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }

            var value = obj[field];
            if (typeof value == 'object') {
                this.putObjectInLinksMap(value, linkMap);
            } else {
                if (field == '@rid' && value.length > 0
                    && linkMap.hasOwnProperty(value)
                    && linkMap[value] === null) {
                    linkMap["foo"] = 2;
                    linkMap[value] = obj;
                }
            }
        }
        return linkMap;
    }

    removeCircleReferences(obj, linkMap) {
        linkMap = this.removeCircleReferencesPopulateMap(obj, linkMap);
        if (obj != null && typeof obj == 'object' && !Array.isArray(obj)) {
            if (obj['@rid'] != null && obj['@rid']) {
                var rid = this.getRidWithPound(obj['@rid']);
                linkMap[rid] = rid;
            }
        }
        this.removeCircleReferencesChangeObject(obj, linkMap);
    }

    getRidWithPound = function (rid) {
        if (rid.indexOf('#', 0) > -1) {
            return rid;
        } else {
            return '#' + rid;
        }
    }

    removeCircleReferencesPopulateMap = function (obj, linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            var value = obj[field];
            if (value != null && typeof value == 'object' && !Array.isArray(value)) {
                if (value['@rid'] != null && value['@rid']) {
                    var rid = this.getRidWithPound(value['@rid']);
                    if (linkMap[rid] == null || !linkMap[rid]) {
                        linkMap[rid] = value;
                    }

                    linkMap = this.removeCircleReferencesPopulateMap(value,
                        linkMap);
                }
            } else if (value != null && typeof value == 'object'
                && Array.isArray(value)) {
                for (var i in value) {
                    if (!value.hasOwnProperty(i)) {
                        continue;
                    }
                    var arrayValue = value[i];
                    if (arrayValue != null && typeof arrayValue == 'object') {
                        if (arrayValue['@rid'] != null && arrayValue['@rid']) {
                            var rid = this.getRidWithPound(arrayValue['@rid']);
                            if (linkMap[rid] == null || !linkMap[rid]) {
                                linkMap[rid] = arrayValue;
                            }
                        }
                        linkMap = this.removeCircleReferencesPopulateMap(
                            arrayValue, linkMap);
                    }
                }
            }
        }
        return linkMap;
    }

    removeCircleReferencesChangeObject(obj,
                                       linkMap) {
        for (var field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            var value = obj[field];
            if (value != null && typeof value == 'object' && !Array.isArray(value)) {
                var inspectObject = true;
                if (value['@rid'] != null && value['@rid']) {
                    var rid = this.getRidWithPound(value['@rid']);
                    if (linkMap[rid] != null && linkMap[rid]) {
                        var mapValue = linkMap[rid];
                        if (typeof mapValue == 'object') {
                            linkMap[rid] = rid;
                        } else {
                            obj[field] = mapValue;
                            inspectObject = false;
                        }
                    }
                }
                if (inspectObject) {
                    this.removeCircleReferencesChangeObject(value, linkMap);
                }
            } else if (value != null && typeof value == 'object'
                && Array.isArray(value)) {
                for (var i in value) {
                    if (!value.hasOwnProperty(i)) {
                        continue;
                    }
                    var arrayValue = value[i];
                    if (typeof arrayValue == 'object') {
                        var inspectObject = true;
                        if (arrayValue['@rid'] != null && arrayValue['@rid']) {
                            var rid = this.getRidWithPound(arrayValue['@rid']);
                            if (linkMap[rid] != null && linkMap[rid]) {
                                var mapValue = linkMap[rid];
                                if (typeof mapValue == 'object') {
                                    linkMap[rid] = rid;
                                } else {
                                    value[i] = mapValue;
                                    inspectObject = false;
                                }
                            }
                        }
                        if (inspectObject) {
                            this.removeCircleReferencesChangeObject(arrayValue,
                                linkMap);
                        }
                    }
                }
            }
        }
    }

    private handleError(error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getUserName() {
        if (!this.databaseInfo) {
            return null;
        }

        return this.databaseInfo.currentUser;
    }

    create(userName?, userPass?, type?,
                      databaseType?) {
        if (userName == null)
            userName = '';

        if (userPass == null)
            userPass = '';

        if (databaseType == null)
            databaseType = 'document';

        this.urlPrefix = this.databaseUrl;

        if (type == null || type == '') {
            type = 'local';
        }

        return this.request.httpRequest({
            url: this.urlPrefix + 'database/' + this.encodedDatabaseName + '/'
            + type + '/' + databaseType + this.urlSuffix,
            type: "post",
            userName: userName,
            userPass: userPass,
        })
            .then(res => {
                this.setErrorMessage(null);
                this.setDatabaseInfo(this.transformResponse(res));
                return this.getDatabaseInfo();
            }).catch(error => {
                this.setErrorMessage('Connect error: ' + error.responseText);
                this.setDatabaseInfo(null);
            });
    }

    metadata() {
        return this.request.httpRequest({
            url: this.urlPrefix + 'database/' + this.encodedDatabaseName
            + this.urlSuffix,
            type: "get"
        })
            .then(res => {
                this.setErrorMessage(null);
                this.setDatabaseInfo(this.transformResponse(res));
                return this.getDatabaseInfo();
            }).catch(error => {
                this.setErrorMessage('Connect error: ' + error.responseText);
                this.setDatabaseInfo(null);
            });
    }

    load(iRID?, iFetchPlan?) {
        if (this.databaseInfo == null) {
            this.open();
        }

        if (iFetchPlan != null && iFetchPlan != '') {
            iFetchPlan = '/' + iFetchPlan;
        } else {
            iFetchPlan = '';
        }

        if (iRID && iRID.charAt(0) == '#') {
            iRID = iRID.substring(1);
        }

        iRID = encodeURIComponent(iRID);

        return this.request.httpRequest({
            url: this.urlPrefix + 'document/' + this.encodedDatabaseName + '/'
            + iRID + iFetchPlan + this.urlSuffix,
            type: "get",
        })
            .then(res => {
                this.setErrorMessage(null);
                this.handleResponse(res);
                return this.getCommandResult();
            }).catch(error => {
                this.handleResponse(null);
                this.setErrorMessage('Query error: ' + error.responseText);
            });
    }

    save(obj?, errorCallback?, successCallback?) {
        if (this.databaseInfo == null) {
            this.open();
        }

        var rid = obj['@rid'];
        var methodType = rid == null || rid == '-1:-1' ? 'POST' : 'PUT';
        if (this.removeObjectCircleReferences && typeof obj == 'object') {
            this.removeCircleReferences(obj, {});
        }

        var url = this.urlPrefix + 'document/' + this.encodedDatabaseName;
        if (rid) {
            url += '/' + encodeURIComponent(rid);
        }

        return  this.request.httpRequest({
            url: url + this.urlSuffix,
            type: methodType,
            body: JSON.parse(obj)
        })
            .then(res => {
                this.setErrorMessage(null);
                this.setCommandResponse(res);
                this.setCommandResult(res);
                if (successCallback) {
                    successCallback(res);
                }
                return this.getCommandResult();
            }).catch(error => {
                this.handleResponse(null);
                this.setErrorMessage('Save error: ' + error.responseText);
                if (errorCallback) {
                    errorCallback(error.responseText);
                }
            });
    }

    indexPut(iIndexName?, iKey?, iValue?) {
        if (this.databaseInfo == null) {
            this.open();
        }

        var req = this.urlPrefix + 'index/' + this.encodedDatabaseName + '/'
            + iIndexName + "/" + iKey;

        var content;
        if (typeof iValue == "object") {
            content = JSON.parse(iValue);
        }
        else {
            req += "/" + iValue;
            content = null;
        }

        return this.request.httpRequest({
            url: req + this.urlSuffix,
            type: "put"
        })
            .then(res => {
                this.setErrorMessage(null);
                return this.getCommandResult();
            }).catch(error => {
                this.handleResponse(null);
                this.setErrorMessage('Index put error: ' + error.responseText);
            });
    }

    getDatabaseInfo() {
        return this.databaseInfo;
    }

    setDatabaseInfo(iDatabaseInfo) {
        this.databaseInfo = iDatabaseInfo;
    }

    getCommandResult() {
        return this.commandResult;
    }

    setCommandResult(iCommandResult) {
        this.commandResult = iCommandResult;
    }

    setCommandResponse(iCommandResponse) {
        this.commandResponse = iCommandResponse;
    }

    setErrorMessage(iErrorMessage) {
        this.errorMessage = iErrorMessage;
    }

    getEvalResponse() {
        return this.evalResponse;
    }

    getParseResponseLinks() {
        return this.parseResponseLink;
    }
}