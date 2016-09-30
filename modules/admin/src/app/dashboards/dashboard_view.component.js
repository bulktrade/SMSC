"use strict";
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var router_1 = require("@angular/router");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var dashboardService_1 = require("./dashboardService");
var browser_adapter_1 = require("@angular/platform-browser/src/browser/browser_adapter");
var orderby_1 = require("./sorts/orderby");
var dashboard_list_1 = require("./models/dashboard_list");
var dashboard_box_enum_1 = require("./models/dashboard_box.enum");
var crud_service_1 = require("../crud/crud.service");
var dashboard_box_sizes_1 = require("./models/dashboard_box.sizes");
var dashboard_list_item_1 = require("./models/dashboard_list_item");
var breadcrumb_component_1 = require("../breadcrumb/breadcrumb.component");
var DashboardView = (function () {
    function DashboardView(translate, dragulaService, dashboardService, router, crudService) {
        var _this = this;
        this.translate = translate;
        this.dragulaService = dragulaService;
        this.dashboardService = dashboardService;
        this.router = router;
        this.crudService = crudService;
        this.boxesCss = new dashboard_list_1.DashboardList();
        this.boxes = new dashboard_list_item_1.DashboardListItem();
        console.log(breadcrumb_component_1.Breadcrumb);
        dragulaService.setOptions('status-bag', {
            direction: 'horizontal'
        });
        dragulaService.setOptions('chart-bag', {
            direction: 'horizontal'
        });
        dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
        this.dashboardService.getDashboardBoxes().subscribe(function (res) {
            _this.boxesCss = new dashboard_list_1.DashboardList();
            _this.boxes = new dashboard_list_item_1.DashboardListItem();
            var orderBy = new orderby_1.OrderBy();
            _this.boxes.merge(orderBy.transform(res, { key: 'order', direction: 'ascending' }));
            _this.updateClasses();
        });
    }
    /**
     * Update boxes order
     *
     * @param $event
     */
    DashboardView.prototype.onDrop = function ($event) {
        var _this = this;
        var dom = new browser_adapter_1.BrowserDomAdapter();
        var boxList = dom.querySelectorAll(dom.query('#dashboard'), 'div.box');
        var boxList_ = Array.prototype.slice.call(boxList);
        for (var _i = 0, boxList_1 = boxList; _i < boxList_1.length; _i++) {
            var item = boxList_1[_i];
            var boxRid = dom.getData(item, 'boxRid');
            for (var originItemKey in this.boxes.getAll()) {
                if (this.boxes.getItem(originItemKey)['metaData']['rid'] == boxRid) {
                    var domBoxIndex = boxList_.indexOf(item);
                    this.boxes.getItem(originItemKey).order = domBoxIndex;
                }
            }
        }
        //  Update boxes order and update @version of current box array
        this.dashboardService.batchUpdateDashboardBox(this.boxes.getAll()).subscribe(function (res) {
            for (var originKey in _this.boxes.getAll()) {
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var item = res_1[_i];
                    if (_this.boxes.getItem(originKey)['metaData']['rid'] == item['metaData']['rid']) {
                        _this.boxes.getItem(originKey)['metaData']['version'] = item['metaData']['version'];
                    }
                }
            }
        });
    };
    /**
     * Resize box, add width class to box element, update DB and update @version boxes array
     *
     * @param width
     * @param boxName
     * @param item
     * @param index
     */
    DashboardView.prototype.resizeBox = function (val, index, item) {
        var _this = this;
        var widthClass, heightClass;
        var type = val.type;
        if (val.type == dashboard_box_enum_1.BoxResize.WIDTH) {
            widthClass = this.getBoxClass(val.width, type);
            heightClass = this.getBoxClass(val.height, 'height');
        }
        if (val.type == dashboard_box_enum_1.BoxResize.HEIGHT) {
            heightClass = this.getBoxClass(val.height, type);
            widthClass = this.getBoxClass(val.width, 'width');
        }
        this.boxesCss.width.setItem(widthClass, index);
        this.boxesCss.height.setItem(heightClass, index);
        if (item != undefined) {
            this.dashboardService.updateBoxSize({ width: val.width, height: val.height }, item).subscribe(function (res) {
                _this.boxes.getItem(index)['metaData']['version'] = res['@version'];
                _this.boxes.getItem(index)['width'] = res['width'];
                _this.boxes.getItem(index)['height'] = res['height'];
            });
        }
    };
    /**
     * Get box class by it size(height or width)
     *
     * height = 25 -> height-m
     * width = 100 -> width-xl
     *
     * @param val
     * @param type
     * @returns {string}
     */
    DashboardView.prototype.getBoxClass = function (val, type) {
        switch (val) {
            case 25:
                return type + '-' + dashboard_box_sizes_1.BoxSizes.M;
            case 50:
                return type + '-' + dashboard_box_sizes_1.BoxSizes.S;
            case 75:
                return type + '-' + dashboard_box_sizes_1.BoxSizes.L;
            case 100:
                return type + '-' + dashboard_box_sizes_1.BoxSizes.XL;
        }
    };
    /**
     * Update box classes
     */
    DashboardView.prototype.updateClasses = function () {
        for (var key in this.boxes.getAll()) {
            var width = this.getBoxClass(this.boxes.getItem(key).width, 'width');
            var height = this.getBoxClass(this.boxes.getItem(key).height, 'height');
            this.boxesCss.width.setItem(width, key);
            this.boxesCss.height.setItem(height, key);
            this.boxesCss.remove.setItem('', key);
        }
    };
    /**
     * Remove box from DB. Before deleting start animation
     *
     * @param rid
     */
    DashboardView.prototype.removeBox = function (box, index) {
        var _this = this;
        //  Set listener for deleted box
        var dom = new browser_adapter_1.BrowserDomAdapter();
        var removedObject = dom.querySelector(dom.query('#dashboard'), 'div.box[data-boxRid="' + box.metaData.rid + '"]');
        //  Update current boxes list after end of transition
        dom.on(removedObject, 'transitionend', function (e) {
            _this.boxes.removeItem(index);
            _this.boxesCss.width.removeItem(index);
            _this.boxesCss.height.removeItem(index);
            _this.boxesCss.remove.removeItem(index);
            //  Remove box
            _this.dashboardService.deleteBox(box);
        });
        this.boxesCss.remove.setItem('removeBox', index);
    };
    /**
     * Edit box event
     *
     * Open edit page to corresponding edit box
     */
    DashboardView.prototype.editBox = function (rid) {
        this.router.navigate(['/dashboard/edit', rid]);
    };
    /**
     * Navigate to create page
     */
    DashboardView.prototype.createBox = function () {
        this.router.navigate(['/dashboard/create', 'DashboardBox']);
    };
    DashboardView = __decorate([
        core_1.Component({
            selector: 'dashboard-view',
            template: require('./dashboard_view.html'),
            styleUrls: [
                require('./dashboard_view.scss')
            ],
            viewProviders: [
                ng2_dragula_1.DragulaService
            ],
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, ng2_dragula_1.DragulaService, dashboardService_1.DashboardService, router_1.Router, crud_service_1.CrudService])
    ], DashboardView);
    return DashboardView;
}());
exports.DashboardView = DashboardView;
//# sourceMappingURL=dashboard_view.component.js.map