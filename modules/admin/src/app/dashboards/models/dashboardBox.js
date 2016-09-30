"use strict";
var dashboardBoxType_1 = require("./dashboardBoxType");
var metaData_1 = require("../../common/models/metaData");
var dashboard_1 = require("./dashboard");
var OUser_1 = require("../../common/models/OUser");
var DashboardBox = (function () {
    function DashboardBox(data) {
        this.metaData = new metaData_1.MetaData(data['@class'], data['@rid'], data['@version']);
        this.name = data['name'];
        this.description = data['description'];
        this.width = data['width'];
        this.height = data['height'];
        this.order = data['order'];
        this.dashboard = new dashboard_1.Dashboard(new metaData_1.MetaData(data['dashboard']['@class'], data['dashboard']['@rid'], data['dashboard']['@version']), data['dashboard']['icon'], data['dashboard']['name'], new OUser_1.OUser(data['dashboard']['user']['name']));
        this.type = new dashboardBoxType_1.DashboardBoxType(new metaData_1.MetaData(data['type']['@class'], data['type']['@rid'], data['type']['@version']), data['type']['code'], data['type']['codeLanguage'], data['type']['name']);
    }
    /**
     * Get OrientDB record object
     * @returns {Object}
     */
    DashboardBox.prototype.getORecord = function () {
        var data = {};
        data['@class'] = this.metaData.className;
        data['@rid'] = this.metaData.rid;
        data['@version'] = this.metaData.version;
        data['order'] = this.order;
        data['width'] = this.width;
        data['height'] = this.height;
        data['name'] = this.name;
        data['description'] = this.description;
        data['dashboard'] = this.dashboard.metaData.rid;
        data['type'] = this.type.metaData.rid;
        return data;
    };
    return DashboardBox;
}());
exports.DashboardBox = DashboardBox;
//# sourceMappingURL=dashboardBox.js.map