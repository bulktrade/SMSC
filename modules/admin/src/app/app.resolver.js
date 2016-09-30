"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
var crudResolve_1 = require('./crud/common/crudResolve');
var crud_view_resolve_1 = require('./crud/crudView/crud.view.resolve');
var crud_linkset_resolve_1 = require('./crud/crudLinkset/crud.linkset.resolve');
var crud_create_resolve_1 = require('./crud/crudCreate/crud.create.resolve');
var crud_edit_resolve_1 = require('./crud/crudEdit/crud.edit.resolve');
var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return Observable_1.Observable.of({ res: 'I am data' });
    };
    DataResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataResolver);
    return DataResolver;
}());
exports.DataResolver = DataResolver;
// an array of services to resolve routes with data
exports.APP_RESOLVER_PROVIDERS = [
    DataResolver,
    crud_edit_resolve_1.CrudEditResolve,
    crud_create_resolve_1.CrudCreateResolve,
    crud_linkset_resolve_1.CrudLinksetResolve,
    crudResolve_1.CrudResolve,
    crud_view_resolve_1.CrudViewResolve
];
//# sourceMappingURL=app.resolver.js.map