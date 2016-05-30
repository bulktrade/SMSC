/**
 * @author: @AngularClass
 */

// look in ./config for protractor.dev.js
switch (process.env.NODE_ENV) {
    case 'ci':
        exports.config = require('./config/protractor.ci').config;
        break;
    case 'dev':
    case 'development':
    default:
        exports.config = require('./config/protractor.dev').config;
}
