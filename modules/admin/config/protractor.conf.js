// @AngularClass
require('ts-node/register');

exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    baseUrl: 'http://localhost:3000/',

    // use `npm run e2e`
    specs: [
        'src/**/**.e2e.ts'
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

    onPrepare: function(){
        var caps = browser.getCapabilities()
    },

    // directConnect: true,

    multiCapabilities: [
        {
            browserName: 'chrome',
            platform: 'OS X 10.11',
            name: "chrome-tests",
            shardTestFiles: true,
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        }
        /*{
            browserName: 'chrome',
            platform: 'OS X 10.11',
            name: "chrome-tests",
            shardTestFiles: true,
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        }
        {
        	browserName: 'firefox',
        	platform: 'OS X 10.11',
        	name: "firefox-tests",
        	shardTestFiles: true,
        	build: process.env.TRAVIS_BUILD_NUMBER,
        	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        },
        {
        	browserName: 'safari',
        	platform: 'OS X 10.11',
        	name: "safari-tests",
        	shardTestFiles: true,
        	build: process.env.TRAVIS_BUILD_NUMBER,
        	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        },
        {
        	browserName: 'MicrosoftEdge',
        	name: "edge-tests",
        	shardTestFiles: true,
        	build: process.env.TRAVIS_BUILD_NUMBER,
        	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        },
        {
            browserName: 'opera',
            platform: 'OS X 10.11',
            name: "opera-tests",
            shardTestFiles: true,
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        } //,*/
        // {
        // 	platformName: 'iOS',
        // 	browserName: '',
        // 	name: "ios-tests",
        // 	app: 'safari',
        // 	deviceName: 'iPhone Simulator',
        // 	shardTestFiles: true,
        // 	build: process.env.TRAVIS_BUILD_NUMBER,
        // 	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        //
        // },
        // {
        // 	platformName: 'Android',
        // 	browserName: 'Browser',
        // 	name: "android-tests",
        // 	deviceName: 'Android Emulator',
        // 	build: process.env.TRAVIS_BUILD_NUMBER,
        // 	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        // }
    ],

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true,

    onComplete: function() {
        var printSessionId = function(jobName){
            browser.getSession().then(function(session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
            });
        }

        printSessionId("Admin Module");
    }
};
