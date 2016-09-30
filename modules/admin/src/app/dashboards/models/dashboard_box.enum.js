"use strict";
(function (BoxType) {
    BoxType[BoxType["status"] = 0] = "status";
    BoxType[BoxType["chart"] = 1] = "chart";
})(exports.BoxType || (exports.BoxType = {}));
var BoxType = exports.BoxType;
var BoxResize = (function () {
    function BoxResize() {
    }
    BoxResize.WIDTH = 'width';
    BoxResize.HEIGHT = 'height';
    return BoxResize;
}());
exports.BoxResize = BoxResize;
//# sourceMappingURL=dashboard_box.enum.js.map