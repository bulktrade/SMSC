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

    multiCapabilities: [
        {
            browserName: 'chrome',
            platform: 'OS X 10.11',
            name: "chrome-osx-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        } /*,
        {
            browserName: 'firefox',
            platform: 'OS X 10.11',
            name: "firefox-osx-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'chrome',
            platform: 'Linux',
            name: "chrome-linux-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'firefox',
            platform: 'Linux',
            name: "firefox-linux-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'chrome',
            platform: 'Windows 10',
            name: "chrome-windows-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'firefox',
            platform: 'Windows 10',
            name: "firefox-windows-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'safari',
            platform: 'OS X 10.11',
            name: "safari-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
            browserName: 'MicrosoftEdge',
            name: "edge-tests",
            shardTestFiles: true,
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            maxInstances: 5
        },
        {
            browserName: 'opera',
            name: "opera-tests",
            build: process.env.TRAVIS_BUILD_NUMBER,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
        	platform: 'OS X 10.10',
         	browserName: 'iphone',
         	name: 'ios-tests',
         	varsion: '9.2',
         	app: 'safari',
         	deviceName: 'iPhone 6',
         	deviceOrientation: 'portrait',
         	build: process.env.TRAVIS_BUILD_NUMBER,
         	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        },
        {
         	platformName: 'Android',
         	browserName: 'Browser',
         	name: "android-tests",
         	deviceName: 'Android Emulator',
         	build: process.env.TRAVIS_BUILD_NUMBER,
         	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            shardTestFiles: true,
            maxInstances: 5
        } */
    ]
});
