"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var CubeGridComponent = (function () {
    function CubeGridComponent() {
        this.delay = 0;
        this.backgroundColor = '#009688';
        this.isRunning = true;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CubeGridComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CubeGridComponent.prototype, "backgroundColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CubeGridComponent.prototype, "isRunning", void 0);
    CubeGridComponent = __decorate([
        core_1.Component({
            selector: 'sk-cube-grid',
            styleUrls: [
                require('./cubeGrid.scss')
            ],
            template: require('./cubeGrid.html')
        }), 
        __metadata('design:paramtypes', [])
    ], CubeGridComponent);
    return CubeGridComponent;
}());
exports.CubeGridComponent = CubeGridComponent;
var CubeGridModule = (function () {
    function CubeGridModule() {
    }
    CubeGridModule.forRoot = function () {
        return {
            ngModule: CubeGridModule,
            providers: []
        };
    };
    CubeGridModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [CubeGridComponent],
            declarations: [CubeGridComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], CubeGridModule);
    return CubeGridModule;
}());
exports.CubeGridModule = CubeGridModule;
//# sourceMappingURL=cubeGrid.component.js.map