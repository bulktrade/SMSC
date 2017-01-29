var path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
    return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

exports.hasNpmFlag = hasNpmFlag;
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
