// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// Hammer.js
// We need to import this library in order for Material to work
// Material needs this for md-tooltips
import 'hammerjs/hammer.js';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Other
import 'jquery';
import 'tether';
import 'bootstrap-loader';
import 'webpack-material-design-icons';

// Bootstrap material design
import 'bootstrap-material-design/dist/js/ripples';
import 'bootstrap-material-design/dist/js/material';
// https://github.com/FezVrasta/bootstrap-material-design#arrivejs-support
import 'arrive/src/arrive';
import 'assets/material-init';

if ('production' === ENV) {
    // Production
} else {
    // Development
}
