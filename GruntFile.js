var properties = require('./properties.js');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  var productionBuild = !! (grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    properties: properties,

    project: {
      src: 'src',
      js: '<%= project.src %>/{,*/}*.js',
      dest: 'js',
      bundle: 'docs/js/main.min.js',
      port: properties.port,
      banner:
        '/*\n' +
        ' * <%= properties.title %>\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * @author <%= pkg.author %>\n' +
        ' * @version <%= pkg.version %>\n' +
        ' * @copyright <%= pkg.author %>\n' +
        ' * @license <%= pkg.license %> licensed\n' +
        ' */\n'
    },

    connect: {
      dev: {
        options: {
          port: '<%= project.port %>',
          base: './docs/'
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', '<%= project.js %>'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      options: {
        livereload: productionBuild ? false : properties.liveReloadPort
      },
      js: {
        files: '<%= project.dest %>/**/*.js',
        tasks: ['jade']
      }
    },

    browserify: {
      app: {
        src: ['<%= project.src %>/main.js'],
        dest: '<%= project.bundle %>',
        options: {
          transform: ['browserify-shim', ['babelify', {'loose': "all"}]],
          watch: true,
          browserifyOptions: {
            debug: !productionBuild
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= project.port %>'
      }
    },

    clean: ['./docs/', './index.html'],

    uglify: {
      options: {
        banner: '<%= project.banner %>'
      },
      dist: {
        files: {
          '<%= project.bundle %>': '<%= project.bundle %>'
        }
      }
    }

  });

  grunt.registerTask('default', [/*'clean',*/ 'browserify', 'connect', 'open', 'watch']);

  grunt.registerTask('build', [
/*'jshint'
    , 
  'clean', */'browserify', 'uglify', 'connect', 'open', 'watch']);

};
