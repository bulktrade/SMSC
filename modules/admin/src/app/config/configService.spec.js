"use strict";
var testing_1 = require('@angular/core/testing');
var configService_1 = require('./configService');
var http_1 = require('@angular/http');
var XMLHttpRequestMock_1 = require('../common/mock/XMLHttpRequestMock');
var rxjs_1 = require('rxjs');
describe('Config Service', function () {
    var mockXHR = new XMLHttpRequestMock_1.XMLHttpRequestMock();
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                configService_1.ConfigService,
            ],
            imports: [
                http_1.HttpModule
            ]
        });
        spyOn(window, 'XMLHttpRequest').and.returnValue(mockXHR);
    });
    it('should get config.json settings', testing_1.inject([configService_1.ConfigService], function (configService) {
        var responseText = {
            'orientDBUrl': '/orientdb',
            'orientDBDatabase': 'smsc',
            'i18nPath': 'assets/i18n',
            'debug': false
        };
        mockXHR.responseText = JSON.stringify(responseText);
        expect(configService.configStream instanceof rxjs_1.Observable).toBeTruthy();
        configService.configStream.subscribe(function (res) {
            expect(res.orientDBUrl).toEqual(responseText.orientDBUrl);
            expect(res.orientDBDatabase).toEqual(responseText.orientDBDatabase);
            expect(res.i18nPath).toEqual(responseText.i18nPath);
            expect(res.debug).toEqual(responseText.debug);
        });
    }));
    it('should get an error on non-existent path', testing_1.inject([configService_1.ConfigService], function (configService) {
        var responseText = {
            'orientDBUrl': '/orientdb',
            'orientDBDatabase': 'smsc',
            'i18nPath': 'assets/i18n',
            'debug': false
        };
        var notFound = 'Not found!';
        mockXHR.responseText = JSON.stringify(responseText);
        mockXHR.status = 404;
        expect(configService.configStream instanceof rxjs_1.Observable).toBeTruthy();
        configService.configStream.subscribe(function (res) {
        }, function (err) {
            expect(err.status).toEqual(404);
        });
    }));
});
//# sourceMappingURL=configService.spec.js.map