'use strict';
var core_1 = require('@angular/core');
var orientdb_service_1 = require('../orientdb/orientdb.service');
var rxjs_1 = require('rxjs');
var squel = require('squel');
var ProfileService = (function () {
    function ProfileService(database) {
        this.database = database;
    }
    ProfileService.prototype.getProfile = function (username) {
        var _this = this;
        var query = squel.select()
            .from('OUser')
            .where('name = ?', username);
        return rxjs_1.Observable.create(function (obs) {
            _this.database.query(query.toString(), 1).subscribe(function (result) {
                obs.next(result);
                obs.complete();
            }, function (error) {
                obs.error(error);
                obs.complete();
            });
        });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [orientdb_service_1.ODatabaseService])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map