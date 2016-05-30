/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const objectMerge = require('object-merge');
const commonConfig = require('./protractor.common'); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'ci';

exports.config = objectMerge(commonConfig.config, {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    sauceSeleniumAddress: 'localhost:4445/wd/hub',

    multiCapabilities: [
        {
            browserName: 'chrome',
            platform: 'OS X',
            name: "chrome-osx-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'firefox',
            platform: 'OS X',
            name: "firefox-osx-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'chrome',
            platform: 'Linux',
            name: "chrome-linux-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'firefox',
            platform: 'Linux',
            name: "firefox-linux-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'chrome',
            platform: 'Windows',
            name: "chrome-windows-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'firefox',
            platform: 'Windows',
            name: "firefox-windows-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
            browserName: 'safari',
            platform: 'OS X',
            name: "safari-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
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
            name: "opera-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        },
        {
        	platformName: 'iOS',
         	browserName: '',
         	name: "ios-tests",
         	app: 'safari',
         	deviceName: 'iPhone Simulator',
         	build: process.env.TRAVIS_BUILD_NUMBER,
         	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        
        },
        {
         	platformName: 'Android',
         	browserName: 'Browser',
         	name: "android-tests",
         	deviceName: 'Android Emulator',
         	build: process.env.TRAVIS_BUILD_NUMBER,
         	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 25
        }
    ]
});
