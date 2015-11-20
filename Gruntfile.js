/* globals module */

module.exports = function(grunt) {

	'use strict';

	var pkg = grunt.file.readJSON('package.json');

	var getStyles = function() {
		var styles = [];

		grunt.file.expand('css/*.css').forEach(function(style) {
			styles.push(style);
		});

		return styles;
	};

	var getCSS = function() {
		var styles = getStyles(),
			string = '';

		styles.forEach(function(stylesheet) {
			string += grunt.file.read(stylesheet);
		});

		return string;
	};

	grunt.initConfig({
		pkg: pkg,
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true
				},
				files: {
					'index.html': 'index.html'
				}
			}
		},
		less: {
			build: {
				options: {
					report: 'min',
					yuicompress: true
				},
				files: {
					'css/styles.css': 'less/styles.less'
				}
			}
		},
		liquid: {
			build: {
				options: {
					css: getCSS()
				},

				files: {
					'index.html': 'views/index.liquid'
				}
			}
		},
		watch: {
			html: {
				options: {
					interrupt: true
				},
				files: [
					'views/*.liquid'
				],
				tasks: [
					'liquid',
					'htmlmin'
				]
			},
			styles: {
				options: {
					interrupt: true
				},
				files: [
					'less/*.less',
					'less/*/*.less'
				],
				tasks: [
					'less',
					'liquid',
					'htmlmin'
				]
			}
		}
	});

	// Load Plugins
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-liquid');

	// Register Tasks
	grunt.registerTask('build', ['less', 'liquid', 'htmlmin']);
	grunt.registerTask('default', ['build']);
};
