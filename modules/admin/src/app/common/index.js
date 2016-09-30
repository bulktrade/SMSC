"use strict";
var angular2_jwt_1 = require('angular2-jwt');
var token_service_1 = require('../services/auth/token.service');
var orientdb_service_1 = require('../orientdb/orientdb.service');
var http_1 = require('@angular/http');
var configService_1 = require('../config/configService');
exports.COMMON_PROVIDERS = [
    {
        provide: angular2_jwt_1.AuthHttp,
        useFactory: function (http, tokenService) {
            var config = new angular2_jwt_1.AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: token_service_1.AUTH_TOKEN_NAME,
                tokenGetter: function () {
                    return new Promise(function (resolve) {
                        resolve(tokenService.getToken());
                    });
                },
                noJwtError: true,
                noTokenScheme: true,
                globalHeaders: [{ 'Content-Type': 'application/json' }]
            });
            return new angular2_jwt_1.AuthHttp(config, http);
        },
        deps: [http_1.Http, token_service_1.TokenService]
    },
    {
        provide: orientdb_service_1.ODatabaseService,
        useFactory: function (authHttp, configService) {
            return new orientdb_service_1.ODatabaseService(configService.config.orientDBUrl, configService.config.orientDBDatabase, authHttp);
        },
        deps: [angular2_jwt_1.AuthHttp, configService_1.ConfigService]
    }
];
//# sourceMappingURL=index.js.map