'use strict';

const build = require('@microsoft/sp-build-web');
const path = require("path");

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Here you can configure where the assets are located when using webpack
build.configureWebpack.mergeConfig({
	additionalConfiguration: (generatedConfiguration) => {
		generatedConfiguration.resolve.alias = {
      "custom-components": path.resolve(__dirname, "./lib/components/")
		};
		return generatedConfiguration;
	},
});

build.initialize(require('gulp'));
