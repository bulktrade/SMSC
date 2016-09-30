"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var profile_model_1 = require('./profile.model');
var profile_service_1 = require('./profile.service');
var Profile = (function () {
    function Profile(router, translate, profileService) {
        this.router = router;
        this.translate = translate;
        this.profileService = profileService;
        this.loading = false;
        this.model = new profile_model_1.ProfileModel('', '');
    }
    Profile.prototype.ngOnInit = function () {
    };
    Profile = __decorate([
        core_1.Component({
            selector: 'user',
            providers: [],
            template: require('./user.html')
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_translate_1.TranslateService, profile_service_1.ProfileService])
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=profile.component.js.map