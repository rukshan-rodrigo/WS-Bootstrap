module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist'],
        options: {
          livereload: true
        }
			},
      js: {
        files: ['javascripts/script.js'],
        tasks: ['deploy']
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
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/button.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js', 
          'external/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js', 
          'external/bootstrap-select/dist/js/bootstrap-select.js', 
          'external/bootstrapValidator/dist/js/bootstrapValidator,js',
          'javascripts/**/*.js', 
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
    }
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.registerTask('deploy', ['concat:dist', 'uglify:dist']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-clean');
};
