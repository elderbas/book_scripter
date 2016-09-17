'use strict';
const arrangementMatchers = {
  nonSsMatchers: require('./subModules/arrangementMatchers/nonSsMatchers'),
  nonWsMatchers: require('./subModules/arrangementMatchers/nonWsMatchers'),
  withWsMatchers: require("./subModules/arrangementMatchers/withWsMatchers")
};

module.exports = arrangementMatchers;