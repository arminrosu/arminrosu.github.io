/* globals module */

module.exports = function(grunt) {
	'use strict';

	var pkg = grunt.file.readJSON('package.json');

	var getStyles = function() {
		var styles = [];

		grunt.file.expand('css/*.css').forEach(function(style) {
			styles.push(style + '?v=' + pkg.version);
		});

		return styles;
	};

	var getScripts = function() {
		var scripts = [];

		// compiled
		var compiled = grunt.file.expand('js/*.js');
		compiled.forEach(function(script) {
			scripts.push(script + '?v=' + pkg.version);
		});

		return scripts;
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
		'ftp-deploy': {
			deploy: {
				auth: {
					host: 'ftp.armin.ro',
					port: 21
				},
				src: './',
				dest: 'public_html/www',
				exclusions: [
					// folders
					'.git',
					'images/lifestream',
					'js/lib',
					'js/src',
					'less',
					'node_modules',
					'views',
					// files
					'**/.DS_Store',
					'.editorconfig',
					'.ftppass',
					'.gitignore',
					'.jshintrc',
					'Gruntfile.js',
					'package.json'
				]
			}
		},
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeComments: true,
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
					scripts: getScripts(),
					styles: getStyles(),
				// css: getCSS()
				},

				files: {
					'index.html': 'views/index.liquid'
				}
			}
		},
		uglify: {
			build: {
				options: {
					compress: true,
					mangle: {
						except: ['jQuery']
					},
					preserveComments: false,
					report: 'min',
					unsafe: true
				},
				files: {
					'js/scripts.min.js': [
						'js/lib/jquery.tmpl.js',
						'js/lib/jquery.timeago.js',
						'js/lib/jquery.lifestream/*.js',
						'js/lib/jquery.lifestream/services/*.js',
						'js/src/polyfills.js',
						'js/src/scripts.js'
					]
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
				tasks: ['less']
			}
		}
	});

	// Load Plugins
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-liquid');

	// Register Tasks
	grunt.registerTask('build', ['less', 'uglify', 'liquid', 'htmlmin']);
	grunt.registerTask('deploy', ['build', 'ftp-deploy']);
	grunt.registerTask('default', ['less']);
};
