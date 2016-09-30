"use strict";
var DashboardListItem = (function () {
    function DashboardListItem() {
        this.list = [];
    }
    /**
     * Set/Add item
     *
     * @param value - string value
     * @param index - index to set in target position or add to the end of list
     * @returns {null} - return Null if property not exist
     */
    DashboardListItem.prototype.setItem = function (value, index) {
        if (index != undefined) {
            this.list[index] = value;
        }
        else {
            this.list.push(value);
        }
    };
    /**
     * Get item of type
     *
     * @param index - index get needed item
     * @returns {any} - string if item exist or null if not
     */
    DashboardListItem.prototype.getItem = function (index) {
        if (index != undefined) {
            return this.list[index];
        }
        return null;
    };
    /**
     * Remove item by index
     *
     * @param index - item position
     */
    DashboardListItem.prototype.removeItem = function (index) {
        this.list.splice(Number(index), 1);
    };
    DashboardListItem.prototype.getAll = function () {
        return this.list;
    };
    /**
     * Merge array
     *
     * @param list
     */
    DashboardListItem.prototype.merge = function (list) {
        this.list = this.list.concat(list);
    };
    return DashboardListItem;
}());
exports.DashboardListItem = DashboardListItem;
//# sourceMappingURL=dashboard_list_item.js.map