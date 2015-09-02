var bower = {
  scripts: [
    'external/bootstrap-sass-official/assets/javascripts/bootstrap.js',
    'external/bootstrap-select/dist/js/bootstrap-select.js'
  ],
  css: [
    'external/bootstrap-select/dist/css/bootstrap-select.css'
  ]
}

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
      globbing: {
        files: ['sass/components/**/*'],
        tasks: ['sass_globbing:target'],
        options: {
          livereload: true,
          spawn: false
        }
      },
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['sass:dist', 'autoprefixer'],
        options: {
          livereload: true,
          spawn: false
        }
			},
      js: {
        files: ['javascripts/scripts.js'],
        tasks: ['compile-js'],
        options: {
          livereload: true,
          spawn: false
        }
      }
		},
		sass: {
			options: {
				sourceMap: true,
        outfile: 'stylesheets/style.css',
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'stylesheets/style.css': 'sass/style.scss'
				}
			}
		},
    concat: {
      option: {
        separator: ';'
      },
      js: {
        src: [
          bower.scripts,
          'javascripts/scripts.js',
        ],
        dest: 'javascripts/<%= pkg.name %>.js'
      },
      css: {
        src: [
          bower.css
        ],
        dest: 'stylesheets/bower.css'
      }
    },
		uglify: {
      dist: {
        options: {
          mangle: true,
          compress: true,
        },
        files: {
          'javascripts/scripts.min.js': ['javascripts/ws_bootstrap.js']
        }
      }
    },
    sass_globbing: {
      target: {
        files: {
          'sass/_components.scss': 'sass/components/**/*.scss'
        },
        options: {
          useSingleQuoates: false
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions'],
        map: true
      },
      dist: { src: 'stylesheets/*.css' }
    },
    copy: {
      fontawesome: {
        expand: true,
        dest: 'fonts/fontawesome',
        cwd: 'external/fontawesome/fonts/',
        src: '**'
      }
    }
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask('init', ['copy:fontawesome', 'sass_globbing']);
  grunt.registerTask('compile-js', ['concat:js', 'uglify:dist']);
  grunt.registerTask('bower-compile', ['concat:css', 'concat:js', 'uglify:dist']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
