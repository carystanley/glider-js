const BabiliPlugin = require('babili-webpack-plugin');
let config = require('./webpack.config');

config.plugins.push(new BabiliPlugin());

module.exports = config;
