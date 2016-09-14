'use strict';

import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { RequestMethod, RequestOptions, Headers, Response } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { Batch } from "./model/batch";
import { Operation } from "./model/operation";

@Injectable()
export class ODatabaseService {
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
    private authorization: String = null;

    constructor(databaseUrl: string, databaseName: string, public authHttp: AuthHttp) {
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

    batchRequest(data): Promise<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post,
            body: data
        });

        return this.authHttp.request(this.urlPrefix + 'batch/' + this.encodedDatabaseName
            + this.urlSuffix,
            requestOptions)
            .toPromise()
            .then(
                res => {
                    this.setErrorMessage(undefined);
                    this.handleResponse(res);
                    return Promise.resolve(res);
                },
                error => {
                    this.setErrorMessage('Command error: ' + error.responseText);
                    return Promise.reject(error);
                });
    };

    /**
     *
     * ### Example
     *
     * Content: { "transaction" : , "operations" : [ { "type" : "" }* ] }
     *
     * The following example deletes record in the current database.
     *
     * let options: Array<Option> = [{
     *      "type": BatchType.Update,
     *      "record": {
     *          "@rid": "#14:122",
     *          "name": "Luca",
     *          "vehicle": "Car"
     *      }
     *  }, {
     *      "type": BatchType.Delete,
     *      "record": {
     *          "@rid": "#14:100"
     *      }
     *  }, {
     *      "type": BatchType.Create,
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

    batch(operations: Array<Operation>): Promise<Response> {
        let batch: Batch = {
            transaction: true,
            operations: operations
        };

        batch.operations.forEach(item => {
            for (let i in item.record) {
                if (Array.isArray(item.record[i])) {
                    for (let form = 0; form < item.record[i]['length']; form++) {
                        item.record[i][form] = item.record[i]['_' + form];
                    }
                }
            }
        });

        return this.batchRequest(JSON.stringify(batch));
    }

    getInfoClass(className) {
        let headers = new Headers({
            'content-Type': 'application/json'
        });

        return this.authHttp.get(this.urlPrefix + 'class/' + this.encodedDatabaseName
            + '/' + className, headers)
            .toPromise()
            .then(
                res => {
                    this.setErrorMessage(undefined);
                    this.handleResponse(res);
                    return Promise.resolve((this.getCommandResponse()));
                },
                error => {
                    this.setErrorMessage('Command error: ' + error.responseText);
                    return Promise.reject(error);
                });
    }

    executeCommand(iCommand?, iLanguage?, iLimit?,
                   iFetchPlan?) {
        return this.command(iCommand, iLanguage, iLimit, iFetchPlan);
    };

    command(iCommand?, iLanguage?, iLimit?,
            iFetchPlan?) {
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
        } else {
            iFetchPlan = '/' + encodeURIComponent(iFetchPlan);
        }

        iCommand = encodeURIComponent(iCommand);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });

        return new Promise((resolve, reject) => {
            this.authHttp.request(this.urlPrefix + 'command/' + this.encodedDatabaseName + '/' +
                iLanguage + '/' + iCommand + '/' + iLimit + iFetchPlan +
                this.urlSuffix,
                requestOptions)
                .toPromise()
                .then(
                    res => {
                        this.setErrorMessage(undefined);
                        this.handleResponse(res);
                        resolve(this.getCommandResponse());
                    },
                    error => {
                        this.handleResponse(undefined);
                        this.setErrorMessage('Command error: ' + error.responseText);
                    });
        });
    };

    open(userName?, userPass?, authProxy?, type?: RequestMethod) {
        if (userName === undefined) {
            userName = '';
        }

        if (userPass === undefined) {
            userPass = '';
        }

        if (authProxy !== undefined && authProxy !== '') {
            this.urlPrefix = this.databaseUrl + authProxy + '/';
        } else {
            this.urlPrefix = this.databaseUrl.substring(this.databaseUrl.length - 1,
                this.databaseUrl.length) !== '/' ? this.databaseUrl + '/' : this.databaseUrl;
        }

        if (type === undefined) {
            type = RequestMethod.Get;
        }

        this.authorization = 'Basic ' + btoa(userName + ':' + userPass);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authorization,
            'X-Requested-With': 'XMLHttpRequest'
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: type
        });

        return new Promise((resolve, reject) => {
            this.authHttp.request(this.urlPrefix + 'connect/' +
                this.encodedDatabaseName + this.urlSuffix,
                type === RequestMethod.Get ? headers : requestOptions)
                .toPromise()
                .then(
                    res => {
                        if (res) {
                            this.setDatabaseInfo(this.transformResponse(res));
                            resolve(this.getDatabaseInfo());
                        } else {
                            this.authorization = null;
                            reject(new Error('no response'));
                        }
                    },
                    error => {
                        this.authorization = null;
                        reject(new Error('Connect error: ' + error.responseText));
                    });
        });
    }

    /**
     *
     * @param iQuery
     * @param iLimit
     * @param iFetchPlan
     * @returns {Promise<T>}
     */
    query(iQuery?, iLimit?, iFetchPlan?) {
        if (iLimit === undefined || iLimit === '') {
            iLimit = '20';
        }

        let url = 'query/' + this.encodedDatabaseName + '/sql/'
            + encodeURIComponent(iQuery) + '/' + iLimit;

        if (iFetchPlan !== undefined && iFetchPlan !== '') {
            url += '/' + encodeURIComponent(iFetchPlan);
        }

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.authHttp.get(this.urlPrefix + url + this.urlSuffix,
            headers)
            .toPromise()
            .then((res: Response) => {
                    return Promise.resolve(res);
                }, (error) => {
                    return Promise.reject(new Error('Query error: ' + error.responseText));
                }
            );
    }

    close() {
        if (this.databaseInfo !== undefined) {

            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            return new Promise((resolve, reject) => {
                this.authHttp.get(this.urlPrefix + 'disconnect' + this.urlSuffix,
                    headers)
                    .toPromise()
                    .then(
                        res => {
                            this.handleResponse(res);
                            this.setErrorMessage(undefined);
                            resolve(this.getCommandResult());
                        },
                        error => {
                            this.handleResponse(undefined);
                            this.setErrorMessage('Command response: '
                                + error.responseText);
                        }
                    );
            });
        }

        this.databaseInfo = undefined;
    }

    handleResponse(iResponse) {
        if (typeof iResponse !== 'object') {
            iResponse = this.UTF8Encode(iResponse);
        }

        this.setCommandResponse(iResponse);

        if (iResponse !== undefined) {
            this.setCommandResult(this.transformResponse(iResponse));
        } else {
            this.setCommandResult(undefined);
        }
    }

    UTF8Encode(str) {
        let pattern = str.replace(/\r\n/g, '\n');
        let utftext = '';

        for (let n = 0; n < pattern.length; n++) {

            let c = pattern.charCodeAt(n);

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
            let returnValue;
            if (msg.length > 0 && typeof msg !== 'object') {
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
        if (typeof obj === 'object') {
            let linkMap = {
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
    }

    createObjectsLinksMap(obj, linkMap) {
        for (let field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            let value = obj[field];
            if (typeof value === 'object') {
                this.createObjectsLinksMap(value, linkMap);
            } else {
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
    }

    getObjectFromLinksMap = function (obj, linkMap) {
        for (let field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }

            let value = obj[field];
            if (typeof value === 'object') {
                this.getObjectFromLinksMap(value, linkMap);
            } else {
                if (field !== '@rid' && value.length > 0
                    && value.charAt(0) === '#' && linkMap[value] !== undefined) {
                    obj[field] = linkMap[value];
                }
            }
        }
        return obj;
    };

    putObjectInLinksMap = function (obj, linkMap) {
        for (let field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }

            let value = obj[field];
            if (typeof value === 'object') {
                this.putObjectInLinksMap(value, linkMap);
            } else {
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

    removeCircleReferences(obj, linkMap) {
        linkMap = this.removeCircleReferencesPopulateMap(obj, linkMap);
        if (obj !== undefined && typeof obj === 'object' && !Array.isArray(obj)) {
            if (obj['@rid'] !== undefined && obj['@rid']) {
                let rid = this.getRidWithPound(obj['@rid']);
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
    };

    removeCircleReferencesPopulateMap = function (obj, linkMap) {
        for (let field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            let value = obj[field];
            if (value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
                if (value['@rid'] !== undefined && value['@rid']) {
                    let rid = this.getRidWithPound(value['@rid']);
                    if (linkMap[rid] === undefined || !linkMap[rid]) {
                        linkMap[rid] = value;
                    }

                    linkMap = this.removeCircleReferencesPopulateMap(value,
                        linkMap);
                }
            } else if (value !== undefined && typeof value === 'object'
                && Array.isArray(value)) {
                for (let i in value) {
                    if (!value.hasOwnProperty(i)) {
                        continue;
                    }
                    let arrayValue = value[i];
                    if (arrayValue !== undefined && typeof arrayValue === 'object') {
                        if (arrayValue['@rid'] !== undefined && arrayValue['@rid']) {
                            let rid = this.getRidWithPound(arrayValue['@rid']);
                            if (linkMap[rid] === undefined || !linkMap[rid]) {
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
    };

    removeCircleReferencesChangeObject(obj,
                                       linkMap) {
        for (let field in obj) {
            if (!obj.hasOwnProperty(field)) {
                continue;
            }
            let value = obj[field];
            if (value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
                let inspectObject = true;
                if (value['@rid'] !== undefined && value['@rid']) {
                    let rid = this.getRidWithPound(value['@rid']);
                    if (linkMap[rid] !== undefined && linkMap[rid]) {
                        let mapValue = linkMap[rid];
                        if (typeof mapValue === 'object') {
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
            } else if (value !== undefined && typeof value === 'object'
                && Array.isArray(value)) {
                for (let i in value) {
                    if (!value.hasOwnProperty(i)) {
                        continue;
                    }
                    let arrayValue = value[i];
                    if (typeof arrayValue === 'object') {
                        let inspectObject = true;
                        if (arrayValue['@rid'] !== undefined && arrayValue['@rid']) {
                            let rid = this.getRidWithPound(arrayValue['@rid']);
                            if (linkMap[rid] !== undefined && linkMap[rid]) {
                                let mapValue = linkMap[rid];
                                if (typeof mapValue === 'object') {
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

    handleError(error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getUserName() {
        if (!this.databaseInfo) {
            return undefined;
        }

        return this.databaseInfo.currentUser;
    }

    create(userName?, userPass?, type?,
           databaseType?) {
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

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +
            btoa(userName + ':' + userPass)
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });

        return new Promise((resolve, reject) => {
            this.authHttp.request(this.urlPrefix + 'database/' + this.encodedDatabaseName + '/' +
                type + '/' + databaseType + this.urlSuffix,
                requestOptions)
                .toPromise()
                .then(
                    res => {
                        this.setErrorMessage(undefined);
                        this.setDatabaseInfo(this.transformResponse(res));
                        resolve(this.getDatabaseInfo());
                    },
                    error => {
                        this.setErrorMessage('Connect error: ' + error.responseText);
                        this.setDatabaseInfo(undefined);
                    }
                );
        });
    }

    metadata() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return new Promise((resolve, reject) => {
            this.authHttp.get(this.urlPrefix + 'database/' + this.encodedDatabaseName
                + this.urlSuffix,
                headers)
                .toPromise()
                .then(
                    res => {
                        this.setErrorMessage(undefined);
                        this.setDatabaseInfo(this.transformResponse(res));
                        resolve(this.getDatabaseInfo());
                    },
                    error => {
                        this.setErrorMessage('Connect error: ' + error.responseText);
                        this.setDatabaseInfo(undefined);
                    }
                );
        });
    }

    load(iRID?, iFetchPlan?) {
        if (this.databaseInfo === undefined) {
            this.open();
        }

        if (iFetchPlan !== undefined && iFetchPlan !== '') {
            iFetchPlan = '/' + iFetchPlan;
        } else {
            iFetchPlan = '';
        }

        if (iRID && iRID.charAt(0) === '#') {
            iRID = iRID.substring(1);
        }

        iRID = encodeURIComponent(iRID);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.authHttp.get(this.urlPrefix + 'document/' + this.encodedDatabaseName + '/'
            + iRID + iFetchPlan + this.urlSuffix,
            headers)
            .toPromise()
            .then(
                res => {
                    this.setErrorMessage(undefined);
                    this.handleResponse(res);
                    return Promise.resolve(this.getCommandResult());
                },
                error => {
                    this.handleResponse(undefined);
                    this.setErrorMessage('Query error: ' + error.responseText);
                    return Promise.reject(error);
                }
            );
    }

    save(obj?, errorCallback?, successCallback?) {
        if (this.databaseInfo === undefined) {
            this.open();
        }

        let rid = obj['@rid'];
        let methodType = rid === undefined || rid === '-1:-1' ? 'POST' : 'PUT';
        if (this.removeObjectCircleReferences && typeof obj === 'object') {
            this.removeCircleReferences(obj, {});
        }

        let url = this.urlPrefix + 'document/' + this.encodedDatabaseName;
        if (rid) {
            url += '/' + encodeURIComponent(rid);
        }

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let body = JSON.stringify(JSON.parse(obj));

        let requestOptions = new RequestOptions({
            headers: headers,
            method: methodType,
            body: body
        });

        return new Promise((resolve, reject) => {
            this.authHttp.request(url + this.urlSuffix,
                requestOptions)
                .toPromise()
                .then(
                    res => {
                        this.setErrorMessage(undefined);
                        this.setCommandResponse(res);
                        this.setCommandResult(res);
                        if (successCallback) {
                            successCallback(res);
                        }
                        resolve(this.getCommandResult());
                    },
                    error => {
                        this.handleResponse(undefined);
                        this.setErrorMessage('Save error: ' + error.responseText);
                        if (errorCallback) {
                            errorCallback(error.responseText);
                        }
                    }
                );
        });
    }

    indexPut(iIndexName?, iKey?, iValue?) {
        if (this.databaseInfo === undefined) {
            this.open();
        }

        let req = this.urlPrefix + 'index/' + this.encodedDatabaseName + '/'
            + iIndexName + '/' + iKey;

        let content;
        if (typeof iValue === 'object') {
            content = JSON.parse(iValue);
        } else {
            req += '/' + iValue;
            content = undefined;
        }

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: RequestMethod.Put
        });

        return new Promise((resolve, reject) => {
            this.authHttp.request(req + this.urlSuffix,
                requestOptions)
                .toPromise()
                .then(
                    res => {
                        this.setErrorMessage(undefined);
                        resolve(this.getCommandResult());
                    },
                    error => {
                        this.handleResponse(undefined);
                        this.setErrorMessage('Index put error: ' + error.responseText);
                    }
                );
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

    setErrorMessage(iErrorMessage) {
        this.errorMessage = iErrorMessage;
    }

    getEvalResponse() {
        return this.evalResponse;
    }

    getParseResponseLinks() {
        return this.parseResponseLink;
    }

    getCommandResponse() {
        return this.commandResponse;
    }

    setCommandResponse(iCommandResponse) {
        this.commandResponse = iCommandResponse;
    }
}
