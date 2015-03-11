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
				files: ['sass/**/*.{scss,sass}'],
				tasks: ['sass:dist'],
        options: {
          livereload: true,
          spawn: false
        }
			},
      js: {
        files: ['javascripts/script.js'],
        tasks: ['deploy'],
        options: {
          livereload: true,
          spawn: false
        }
      }
		},
		sass: {
			options: {
				sourceComments: 'map',
				outputStyle: 'compressed'
			},
			dist: {
			  options: {
          includePaths: require('node-bourbon').includePaths
        },
				files: {
					'stylesheets/style.css': 'sass/style.scss'
				}
			}
		},
    concat: {
      option: {
        separator: ';'
      },
      dist: {
        src: [
          'external/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          'external/bootstrap-select/dist/js/bootstrap-select.js',
          'javascripts/script.js',
        ],
        dest: 'javascripts/<%= pkg.name %>.js'
      }
    },
		uglify: {
      dist: {
        options: {
          mangle: true,
          compress: true,
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
    }
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.registerTask('deploy', ['concat:dist', 'uglify:dist']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-clean');
  grunt.loadNpmTasks('grunt-sass-globbing');
};
