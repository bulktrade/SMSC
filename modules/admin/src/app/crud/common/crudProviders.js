"use strict";
var http_1 = require('@angular/http');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var token_service_1 = require('../../services/auth/token.service');
var index_1 = require('../../common/index');
var notificationService_1 = require('../../services/notificationService');
var components_1 = require('angular2-notifications/components');
var loadingGrid_service_1 = require('../../services/loading/loadingGrid.service');
var configService_1 = require('../../config/configService');
var routerOutletService_1 = require('../../services/routerOutletService');
var grid_service_1 = require('../../services/grid.service');
var MockActivatedRoute = (function () {
    function MockActivatedRoute() {
    }
    return MockActivatedRoute;
}());
;
exports.CRUD_PROVIDERS = index_1.COMMON_PROVIDERS.concat([
    loadingGrid_service_1.LoadingGridService,
    grid_service_1.GridService,
    routerOutletService_1.RouterOutletService,
    components_1.NotificationsService,
    notificationService_1.NotificationService,
    crud_service_1.CrudService,
    token_service_1.TokenService,
    ng2_translate_1.TranslateService,
    configService_1.ConfigService,
    { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute },
    { provide: router_1.Router, useClass: MockActivatedRoute },
    {
        provide: ng2_translate_1.TranslateLoader, useFactory: function (http, configService) {
            return new ng2_translate_1.TranslateStaticLoader(http, configService.config.i18nPath, '.json');
        }, deps: [http_1.Http, configService_1.ConfigService]
    }
]);
//# sourceMappingURL=crudProviders.js.map