"use strict";
var core_1 = require("@angular/core");
var sidebarService_1 = require("../sidebar/sidebarService");
var browser_adapter_1 = require("@angular/platform-browser/src/browser/browser_adapter");
var dashboard_box_enum_1 = require("./models/dashboard_box.enum");
var DashboardBoxComponent = (function () {
    function DashboardBoxComponent(sidebarService) {
        this.sidebarService = sidebarService;
        this.config = null;
        this.resizeBox = new core_1.EventEmitter();
        this.removeBox = new core_1.EventEmitter();
        this.editBox = new core_1.EventEmitter();
        this.crudOpen = false;
        this.viewWidthOpen = false;
        this.fullscreenMode = false;
        this.statusBoxWidth = 25;
        this.statusBoxHeight = 25;
        this.boxResize = dashboard_box_enum_1.BoxResize;
    }
    DashboardBoxComponent.prototype.ngOnInit = function () {
        if (this.config.width != undefined) {
            this.statusBoxWidth = this.config.width;
        }
        if (this.config.height != undefined) {
            this.statusBoxHeight = this.config.height;
        }
    };
    DashboardBoxComponent.prototype.handleKeyboardEvent = function (event) {
        event.stopImmediatePropagation();
        if (event.key == 'Escape' && this.fullscreenMode == true) {
            this.toggleFullscreen();
        }
    };
    /**
     * Toggle fullscreen for dashboard box.
     */
    DashboardBoxComponent.prototype.toggleFullscreen = function () {
        var _this = this;
        this.sidebarService.toggleSidenav().then(function () {
            var dom = new browser_adapter_1.BrowserDomAdapter();
            if (_this.fullscreenMode) {
                dom.removeStyle(dom.query('.md-sidenav-content'), 'overflow');
                dom.removeClass(dom.query('.header'), 'fullscreen-header');
            }
            else {
                dom.setStyle(dom.query('.md-sidenav-content'), 'overflow', 'hidden');
                dom.addClass(dom.query('.header'), 'fullscreen-header');
            }
            _this.fullscreenMode = !_this.fullscreenMode;
            _this.sidebarService.fullScreenMode = _this.fullscreenMode;
        });
    };
    /**
     * Emit resize box event
     *
     * @param data - object data
     * {
     *  val - resize value
     *  type - resize direction(width, height)
     * }
     */
    DashboardBoxComponent.prototype.emitResizeBox = function (data) {
        var res = {};
        res.type = data['type'];
        if (data['type'] == dashboard_box_enum_1.BoxResize.WIDTH) {
            res.width = data['val'];
            res.height = this.statusBoxHeight;
            this.statusBoxWidth = data['val'];
        }
        if (data['type'] == dashboard_box_enum_1.BoxResize.HEIGHT) {
            res.width = this.statusBoxWidth;
            res.height = data['val'];
            this.statusBoxHeight = data['val'];
        }
        this.resizeBox.emit(res);
    };
    /**
     * Emit remove box event
     */
    DashboardBoxComponent.prototype.emitRemoveBox = function () {
        this.removeBox.emit();
    };
    /**
     * Emit edit box event
     */
    DashboardBoxComponent.prototype.emitEditBox = function () {
        this.editBox.emit();
    };
    __decorate([
        core_1.Input('config'), 
        __metadata('design:type', Object)
    ], DashboardBoxComponent.prototype, "config", void 0);
    __decorate([
        core_1.Output('resizeBox'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardBoxComponent.prototype, "resizeBox", void 0);
    __decorate([
        core_1.Output('removeBox'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardBoxComponent.prototype, "removeBox", void 0);
    __decorate([
        core_1.Output('editBox'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DashboardBoxComponent.prototype, "editBox", void 0);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], DashboardBoxComponent.prototype, "handleKeyboardEvent", null);
    DashboardBoxComponent = __decorate([
        core_1.Component({
            selector: 'dashboard-box',
            template: require('./dashboard_box.html'),
            styleUrls: [
                require('./dashboard_box.scss')
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [sidebarService_1.SidebarService])
    ], DashboardBoxComponent);
    return DashboardBoxComponent;
}());
exports.DashboardBoxComponent = DashboardBoxComponent;
//# sourceMappingURL=dashboard_box.component.js.map