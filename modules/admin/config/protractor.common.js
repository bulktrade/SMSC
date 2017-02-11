require('ts-node/register');
var helpers = require('./helpers');

var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    baseUrl: 'http://localhost:' + (process.env.TOMCAT_HTTP_PORT ? process.env.TOMCAT_HTTP_PORT : '8080') + '/admin',

    // use `npm run e2e`
    specs: [
        helpers.root('src/**/**.e2e.ts'),
        helpers.root('src/**/*.e2e.ts')
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 400000
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './integration-tests/screenshots',
            takeScreenShotsOnlyForFailedSpecs: true,
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'firefox/list-should work'.
                return path.join(capabilities.caps_.browser, descriptions.join('-'));
            },
            metaDataBuilder: function metaDataBuilder(spec, descriptions, results, capabilities) {
                // Return the description of the spec and if it has passed or not:
                return {
                    description: descriptions.join(' '), passed: results.passed()
                };
            }
        }));
    },

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true,

    onComplete: function () {
        var printSessionId = function (jobName) {
            browser.getSession().then(function (session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
            });
        };

        printSessionId("Admin Module");
    }
};
