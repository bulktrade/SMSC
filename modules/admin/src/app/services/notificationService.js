"use strict";
var core_1 = require('@angular/core');
var components_1 = require('angular2-notifications/components');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var NotificationService = (function () {
    function NotificationService(translate, notificationsService) {
        this.translate = translate;
        this.notificationsService = notificationsService;
    }
    NotificationService.prototype.createNotification = function (type, title, content) {
        var _this = this;
        this.translate.get(title).subscribe(function (titleTranslate) {
            _this.translate.get(content).subscribe(function (contentTranslate) {
                switch (type) {
                    case 'success':
                        _this.notificationsService.success(titleTranslate, contentTranslate);
                        break;
                    case 'error':
                        _this.notificationsService.error(titleTranslate, contentTranslate);
                        break;
                    case 'info':
                        _this.notificationsService.info(titleTranslate, contentTranslate);
                        break;
                    default:
                        break;
                }
            });
        });
    };
    NotificationService.prototype.createNotificationOnResponse = function (response) {
        switch (response.status) {
            case 0:
                this.createNotification('error', 'ERROR', 'NO_INTERNET_CONNECTION');
                break;
            case 401:
                this.createNotification('error', 'ERROR', 'orientdb.unregistered');
                break;
            case 404:
                this.createNotification('error', 'ERROR', 'orientdb.dataNotFound');
                break;
            case 500:
                this.createNotification('error', 'ERROR', 'orientdb.dataNotCorrect');
                break;
            default:
                break;
        }
    };
    NotificationService.prototype.incorrectData = function (errMessage) {
        var _this = this;
        var notificationContent = errMessage;
        var errors = [
            {
                type: 'NumberFormatException',
                content: 'cell.numberFormatException'
            },
            {
                type: 'mandatory',
                content: 'cell.mandatoryException'
            }
        ];
        errors.forEach(function (i) {
            if (errMessage.match(i.type)) {
                _this.translate.get(i.content)
                    .subscribe(function (res) {
                    notificationContent = res;
                });
            }
        });
        this.createNotification('error', 'ERROR', notificationContent);
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, components_1.NotificationsService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notificationService.js.map