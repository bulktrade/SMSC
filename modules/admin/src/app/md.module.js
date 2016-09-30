"use strict";
var core_1 = require('@angular/core');
var button_toggle_1 = require('@angular2-material/button-toggle');
var button_1 = require('@angular2-material/button');
var checkbox_1 = require('@angular2-material/checkbox');
var radio_1 = require('@angular2-material/radio');
var slide_toggle_1 = require('@angular2-material/slide-toggle');
var slider_1 = require('@angular2-material/slider');
var sidenav_1 = require('@angular2-material/sidenav');
var list_1 = require('@angular2-material/list');
var grid_list_1 = require('@angular2-material/grid-list');
var card_1 = require('@angular2-material/card');
var icon_1 = require('@angular2-material/icon');
var progress_circle_1 = require('@angular2-material/progress-circle');
var progress_bar_1 = require('@angular2-material/progress-bar');
var input_1 = require('@angular2-material/input');
var tabs_1 = require('@angular2-material/tabs');
var toolbar_1 = require('@angular2-material/toolbar');
var tooltip_1 = require('@angular2-material/tooltip');
var core_2 = require('@angular2-material/core');
var menu_1 = require('@angular2-material/menu');
var MATERIAL_MODULES = [
    button_1.MdButtonModule,
    button_toggle_1.MdButtonToggleModule,
    card_1.MdCardModule,
    checkbox_1.MdCheckboxModule,
    grid_list_1.MdGridListModule,
    icon_1.MdIconModule,
    input_1.MdInputModule,
    list_1.MdListModule,
    menu_1.MdMenuModule,
    progress_bar_1.MdProgressBarModule,
    progress_circle_1.MdProgressCircleModule,
    radio_1.MdRadioModule,
    core_2.MdRippleModule,
    sidenav_1.MdSidenavModule,
    slider_1.MdSliderModule,
    slide_toggle_1.MdSlideToggleModule,
    tabs_1.MdTabsModule,
    toolbar_1.MdToolbarModule,
    tooltip_1.MdTooltipModule,
    core_2.OverlayModule,
    core_2.PortalModule,
    core_2.RtlModule,
];
var MaterialRootModule = (function () {
    function MaterialRootModule() {
    }
    MaterialRootModule = __decorate([
        core_1.NgModule({
            imports: [
                button_1.MdButtonModule.forRoot(),
                card_1.MdCardModule.forRoot(),
                checkbox_1.MdCheckboxModule.forRoot(),
                grid_list_1.MdGridListModule.forRoot(),
                input_1.MdInputModule.forRoot(),
                list_1.MdListModule.forRoot(),
                progress_bar_1.MdProgressBarModule.forRoot(),
                progress_circle_1.MdProgressCircleModule.forRoot(),
                core_2.MdRippleModule.forRoot(),
                sidenav_1.MdSidenavModule.forRoot(),
                tabs_1.MdTabsModule.forRoot(),
                toolbar_1.MdToolbarModule.forRoot(),
                core_2.PortalModule.forRoot(),
                core_2.RtlModule.forRoot(),
                // These modules include providers.
                button_toggle_1.MdButtonToggleModule.forRoot(),
                icon_1.MdIconModule.forRoot(),
                menu_1.MdMenuModule.forRoot(),
                radio_1.MdRadioModule.forRoot(),
                slider_1.MdSliderModule.forRoot(),
                slide_toggle_1.MdSlideToggleModule.forRoot(),
                tooltip_1.MdTooltipModule.forRoot(),
                core_2.OverlayModule.forRoot(),
            ],
            exports: MATERIAL_MODULES,
            providers: [core_2.MdLiveAnnouncer]
        }), 
        __metadata('design:paramtypes', [])
    ], MaterialRootModule);
    return MaterialRootModule;
}());
exports.MaterialRootModule = MaterialRootModule;
var MdModule = (function () {
    function MdModule() {
    }
    MdModule.forRoot = function () {
        return { ngModule: MaterialRootModule };
    };
    MdModule = __decorate([
        core_1.NgModule({
            imports: MATERIAL_MODULES,
            exports: MATERIAL_MODULES,
        }), 
        __metadata('design:paramtypes', [])
    ], MdModule);
    return MdModule;
}());
exports.MdModule = MdModule;
//# sourceMappingURL=md.module.js.map