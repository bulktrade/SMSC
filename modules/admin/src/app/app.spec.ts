import {
    beforeEachProviders,
    inject,
    it, setBaseTestProviders
} from '@angular/core/testing';
import {Router} from "@angular/router";
import {Location, LocationStrategy} from "@angular/common";
import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from "@angular/platform-browser/testing";

class MockActivatedRoute {}

describe('Customer Service', () => {
    beforeEachProviders(() => [
        Router,
        {provide: Location, useClass: MockActivatedRoute},
        setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS)
    ]);

    it('should be 13 columns', inject([ Router, Location ], (router: Router, location: Location) => {
        router.navigateByUrl('/');

        expect(location.path()).toEqual('/login');
    }));

});

