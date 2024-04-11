"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
build.addSuppression(/Warning/gi);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
	var result = getTasks.call(build.rig);

	result.set("serve", result.get("serve-deprecated"));

	return result;
};

build.initialize(gulp);

gulp.task(
	"sync-version",
	gulp.series(function (resolve) {
		// import gulp utilits to write error messages
		const gutil = require("gulp-util");

		// import file system utilities form nodeJS
		const fs = require("fs");

		// read package.json
		var pkgConfig = require("./package.json");

		// read configuration of web part solution file
		var pkgSolution = require("./config/package-solution.json");

		// log old version
		gutil.log("Old Version:\t" + pkgSolution.solution.version);

		// Generate new MS compliant version number
		var newVersionNumber = pkgConfig.version.split("-")[0] + ".0";

		// assign newly generated version number to web part version
		pkgSolution.solution.version = newVersionNumber;

		// Update every feature version
		for (var i = 0; i < pkgSolution.solution.features.length; i++) {
			let f = pkgSolution.solution.features[i];
			f.version = newVersionNumber;
		}

		// log new version
		gutil.log("New Version:\t" + pkgSolution.solution.version);

		var pkgSolutionString = JSON.stringify(pkgSolution, null, 4);

		if (pkgSolutionString && pkgSolutionString.length > 0) {
			// write changed package-solution file
			fs.writeFile(
				"./config/package-solution.json",
				pkgSolutionString,
				(err) => {}
			);
		}

		resolve();
	})
);
