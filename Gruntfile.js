// Gruntfile.js
module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'src',
        dist: 'dist'
    };

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        yeoman: appConfig,


        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.*',
                        'ikony/**',
                        'fonts/{,*/}*.*',
                        'doc/**'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.tmp/ikony',
                    dest: '<%= yeoman.dist %>/ikony',
                    src: ['generated/*']
                },
                    {
                        expand: true,
                        cwd: '.tmp/fonts',
                        dest: '<%= yeoman.dist %>/fonts',
                        src: ['generated/*']
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                        dest: '<%= yeoman.dist %>'
                    }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },// Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: ['last 1 version']})
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    'dist/styles/animate.css': 'src/styles/animate.css',
                    'dist/styles/bootstrap.css': 'src/styles/bootstrap.css',
                    'dist/styles/magnific-popup.css': 'src/styles/magnific-popup.css',
                    'dist/styles/stylesheet.css': 'src/styles/stylesheet.css'
                }
            }
        },
        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/js/main.js': ['src/js/jquery-latest.js', 'src/js/jquery.js', 'src/js/bootstrap.js', 'src/js/jquery.easing.js', 'src/js/jquery.mixitup.js', 'src/js/scripts.js', 'src/js/jquery.magnific-popup.min.js', 'src/js/contactform.js', 'src/js/smoothscroll.js', 'src/js/classie.js', 'src/js/wow.min.js', 'src/js/main.js']
                }
            }
        },
        concat: {
            dist: {}
        },
        processhtml: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%= yeoman.app %>/index.html']
                }
            }
        },
        watch: {
            src: {
                files: ['*.html'],
                options: {livereload: true}
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options:{
                livereload: 35729

            },
            server: {
                options: {
                    port: 9001,
                    base: 'src/'
                }
            },
            livereload: {
                options: {
                    port: 9001,

                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/src/styles',
                                connect.static('./src/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port: 9001,
                    base: 'dist/'
                }
            }
        }

    });

    grunt.registerTask('server', "Serve your app", [
        'connect:livereload', 'watch']);

    grunt.registerTask('serve', "Serve your app", [
        'connect:dist', 'livereload', 'watch']);

    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'cssmin',
        'uglify',
        'htmlmin',
        'processhtml'
    ]);
};