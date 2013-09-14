/* globals module */

module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');



	var getStyles = function(){
		var styles = [];

		grunt.file.expand('css/*.css').forEach(function(style){
			styles.push(style + '?v=' + pkg.version);
		});

		return styles;
	};

	var getScripts = function() {
		var scripts = [];

		// compiled
		var compiled = grunt.file.expand('js/*.js');
		compiled.forEach(function(script){
			scripts.push(script + '?v=' + pkg.version);
		});

		return scripts;
	};

	var getCSS = function() {
		var styles = getStyles(),
			string = '';

		styles.forEach(function(stylesheet){
			string += grunt.file.read(stylesheet);
		});

		return string;
	};

	grunt.initConfig({
		"pkg": pkg,
		"htmlmin": {
			"build": {
				"options": {
					"collapseBooleanAttributes": true,
					"collapseWhitespace": true,
					"removeComments": true,
					"removeEmptyAttributes": true,
					"removeRedundantAttributes": true
				},
				"files": {
					"index.html": "index.html"
				}
			}
		},
		"less": {
			"build": {
				"options": {
					"report": "min",
					"yuicompress": true
				},
				"files": {
					"css/styles.css": "less/styles.less"
				}
			}
		},
		"liquid": {
			"build": {
				"options": {
					"scripts": getScripts(),
					"styles": getStyles(),
					// "css": getCSS()
				},

				"files": {
					"index.html": "views/index.liquid"
				}
			}
		},
		"uglify": {
			"build": {
				"options": {
					"compress": true,
					"mangle": {
						"except": ["jQuery"]
					},
					"preserveComments": false,
					"report": "min",
					"unsafe": true
				},
				"files": {
					"js/scripts.min.js": [
						"js/lib/jquery.tmpl.js",
						"js/lib/jquery.timeago.js",
						"js/lib/jquery.lifestream/*.js",
						"js/lib/jquery.lifestream/services/*.js",
						"js/src/polyfills.js",
						"js/src/scripts.js"
					]
				}
			}
		},
		"watch": {
			"scripts": {
				"options": {
					"interrupt": true
				},
				"files": ['js/src/*.js'],
				"tasks": ['uglify']
			},
			"styles": {
				"options": {
					"interrupt": true
				},
				"files": ['less/*.less', 'less/*/*.less'],
				"tasks": ['less']
			}
		}
	});

	// Load Plugins
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-liquid');

	// Register Tasks
	grunt.registerTask('build', ['less', 'uglify', 'liquid', 'htmlmin']);
	grunt.registerTask('default', ['less']);
};
