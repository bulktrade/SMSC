"use strict";
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var _ = require('lodash');
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, _router) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    HttpInterceptor.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            if (err.status === 401 && !_.startsWith(err.url, '/orientdb/token')) {
                _this._router.navigate(['/login']);
                return Observable_1.Observable.empty();
            }
            else {
                return Observable_1.Observable.throw(err);
            }
        });
    };
    HttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router])
    ], HttpInterceptor);
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=httpInterceptor.js.map