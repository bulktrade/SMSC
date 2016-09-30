"use strict";
var core_1 = require("@angular/core");
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (args['key'] != undefined) {
                a = a[args['key']];
                b = b[args['key']];
            }
            //  Default direction - descending
            switch (args['direction']) {
                case 'ascending':
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                default:
                    if (a > b) {
                        return -1;
                    }
                    if (a < b) {
                        return 1;
                    }
                    return 0;
            }
        });
        return array;
    };
    OrderBy = __decorate([
        core_1.Pipe({
            name: 'orderby'
        }), 
        __metadata('design:paramtypes', [])
    ], OrderBy);
    return OrderBy;
}());
exports.OrderBy = OrderBy;
//# sourceMappingURL=orderby.js.map