/* jshint node:true */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        // JavaScript linting with JSHint.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                '!assets/js/*.min.js',
                'assets/js/octocart/*.js',
                '!assets/js/octocart/*.min.js'
            ]
        },

        // Minify .js files.
        uglify: {
            options: {
                preserveComments: 'some'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: [
                        '*.js',
                        '!*.min.js'
                    ],
                    dest: 'assets/js/',
                    ext: '.min.js'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/vendor/',
                    src: [
                        '*.js',
                        '!*.min.js'
                    ],
                    dest: 'assets/js/vendor/',
                    ext: '.min.js'
                }]
            },
            octocart: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/octocart/',
                    src: [
                        '*.js',
                        '!*.min.js'
                    ],
                    dest: 'assets/js/octocart/',
                    ext: '.min.js'
                }]
            }
        },

        // Compile all .scss files.
        sass: {
            dist: {
                options: {
                    require: 'susy',
                    sourcemap: 'none',
                    includePaths: require('node-bourbon').includePaths
                },
                files: [{
                    'assets/css/style.css': 'assets/sass/style.scss',
                    'assets/css/octocart/extensions/bookings.css': 'assets/sass/octocart/extensions/bookings.scss',
                    'assets/css/octocart/extensions/brands.css': 'assets/sass/octocart/extensions/brands.scss',
                    'assets/css/octocart/extensions/wishlists.css': 'assets/sass/octocart/extensions/wishlists.scss',
                    'assets/css/octocart/extensions/ajax-layered-nav.css': 'assets/sass/octocart/extensions/ajax-layered-nav.scss',
                    'assets/css/octocart/extensions/variation-swatches.css': 'assets/sass/octocart/extensions/variation-swatches.scss',
                    'assets/css/octocart/extensions/composite-products.css': 'assets/sass/octocart/extensions/composite-products.scss',
                    'assets/css/octocart/extensions/photography.css': 'assets/sass/octocart/extensions/photography.scss',
                    'assets/css/octocart/extensions/product-reviews-pro.css': 'assets/sass/octocart/extensions/product-reviews-pro.scss',
                    'assets/css/octocart/extensions/smart-coupons.css': 'assets/sass/octocart/extensions/smart-coupons.scss',
                    'assets/css/octocart/extensions/deposits.css': 'assets/sass/octocart/extensions/deposits.scss',
                    'assets/css/octocart/extensions/bundles.css': 'assets/sass/octocart/extensions/bundles.scss',
                    'assets/css/octocart/extensions/ship-multiple-addresses.css': 'assets/sass/octocart/extensions/ship-multiple-addresses.scss',
                    'assets/css/octocart/extensions/advanced-product-labels.css': 'assets/sass/octocart/extensions/advanced-product-labels.scss',
                    'assets/css/octocart/extensions/mix-and-match.css': 'assets/sass/octocart/extensions/mix-and-match.scss',
                    'assets/css/octocart/extensions/quick-view.css': 'assets/sass/octocart/extensions/quick-view.scss',
                    'assets/css/octocart/octocart.css': 'assets/sass/octocart/octocart.scss',
                    'assets/css/base/icons.css': 'assets/sass/base/icons.scss'
                }]
            }
        },

        // Minify all .css files.
        cssmin: {
            main: {
                files: {
                    'assets/css/style.css': ['assets/css/style.css']
                }
            },
            octocart: {
                expand: true,
                cwd: 'assets/sass/octocart/',
                src: ['*.css'],
                dest: 'assets/sass/octocart/',
                ext: '.css'
            }
        },

        // Watch changes for assets.
        watch: {
            css: {
                files: [
                    'assets/sass/style.scss',
                    'assets/sass/octocart/*.scss',
                    'assets/sass/base/*.scss',
                    'assets/sass/components/*.scss',
                    'assets/sass/utils/*.scss',
                    'assets/sass/vendors/*.scss'
                ],
                tasks: [
                    'sass',
                    'css'
                ]
            },
            js: {
                files: [
                    // main js
                    'assets/js/*js',
                    '!assets/js/*.min.js',

                    // OctoCart js
                    'assets/js/octocart/*js',
                    '!assets/js/octocart/*.min.js'
                ],
                tasks: ['jshint', 'uglify']
            }
        },

        // Creates deploy-able theme
        copy: {
            deploy: {
                src: [
                    '**',
                    '!.*',
                    '!*.md',
                    '!.*/**',
                    '.htaccess',
                    '!Gruntfile.js',
                    '!package.json',
                    '!node_modules/**',
                    '!.DS_Store',
                    '!npm-debug.log'
                ],
                dest: 'octocart',
                expand: true,
                dot: true
            }
        },

        // RTLCSS
        rtlcss: {
            options: {
                config: {
                    swapLeftRightInUrl: false,
                    swapLtrRtlInUrl: false,
                    autoRename: false,
                    preserveDirectives: true
                },
                properties: [
                    {
                        name: 'swap-fontawesome-left-right-angles',
                        expr: /content/im,
                        action: function (prop, value) {
                            if (value === '"\\f105"') { // fontawesome-angle-left
                                value = '"\\f104"';
                            }
                            if (value === '"\\f178"') { // fontawesome-long-arrow-right
                                value = '"\\f177"';
                            }
                            return {prop: prop, value: value};
                        }
                    }
                ]
            },
            main: {
                expand: true,
                ext: '-rtl.css',
                src: [
                    'assets/css/style.css',
                    'assets/css/octocart/extensions/bookings.css',
                    'assets/css/octocart/extensions/brands.css',
                    'assets/css/octocart/extensions/wishlists.css',
                    'assets/css/octocart/extensions/ajax-layered-nav.css',
                    'assets/css/octocart/extensions/variation-swatches.css',
                    'assets/css/octocart/extensions/composite-products.css',
                    'assets/css/octocart/extensions/photography.css',
                    'assets/css/octocart/extensions/product-reviews-pro.css',
                    'assets/css/octocart/extensions/smart-coupons.css',
                    'assets/css/octocart/extensions/deposits.css',
                    'assets/css/octocart/extensions/bundles.css',
                    'assets/css/octocart/extensions/ship-multiple-addresses.css',
                    'assets/css/octocart/extensions/advanced-product-labels.css',
                    'assets/css/octocart/extensions/mix-and-match.css',
                    'assets/css/octocart/extensions/quick-view.css',
                    'assets/css/octocart/octocart.css'
                ]
            }
        }
    });

    // Load NPM tasks to be used here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rtlcss');

    // Register tasks
    grunt.registerTask('default', [
        'css',
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('css', [
        'sass',
        'cssmin',
        'rtlcss'
    ]);

    grunt.registerTask('dev', [
        'default'
    ]);

    grunt.registerTask('deploy', [
        'copy'
    ]);
};
