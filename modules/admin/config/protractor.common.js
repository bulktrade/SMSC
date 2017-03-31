require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:' + (process.env.TOMCAT_HTTP_PORT ? process.env.TOMCAT_HTTP_PORT : '8080') + '/admin',

  // use `npm run e2e`
  specs: [
    helpers.root('src/app/*.e2e.ts'),
    helpers.root('src/app/login/*.e2e.ts'),
    helpers.root('src/app/customers/customers-create/*.e2e.ts'),
    helpers.root('src/app/customers/customers-update/*.e2e.ts'),
    helpers.root('src/app/customers/customers-contacts/contacts-create/*.e2e.ts'),
    helpers.root('src/app/customers/customers-contacts/contacts-update/*.e2e.ts'),
    helpers.root('src/app/customers/customers-contacts/contacts-delete/*.e2e.ts'),
    helpers.root('src/app/customers/customers-users/users-create/*.e2e.ts'),
    helpers.root('src/app/customers/customers-users/users-update/*.e2e.ts'),
    helpers.root('src/app/customers/customers-users/users-delete/*.e2e.ts'),
    helpers.root('src/app/customers/customers-delete/*.e2e.ts'),
    helpers.root('src/app/customers/customers-view/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-create/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-update/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-delete/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-box-type/dashboard-box-type-create/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-box-type/dashboard-box-type-update/*.e2e.ts'),
    helpers.root('src/app/dashboard/dashboard-box-type/dashboard-box-type-delete/*.e2e.ts'),
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
