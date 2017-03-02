// Karma configuration
// Generated on Mon Aug 17 2015 11:46:59 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        '__tests__/test-main.js',
        {pattern: '__tests__/vendor/*.js', included: false},
        {pattern: '*.js', included: false},
        {pattern: 'views/*.js', included: false},
        {pattern: 'src/*.js', included: false},
        {pattern: 'lib/*.js', included: false},
        {pattern: 'bower_components/**/*.js', included: false},
        {pattern: '__tests__/tests/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'main.js': ['coverage'],
        'views/**/*.js': ['coverage'],
        'src/**/*.js': ['coverage'],
        'loader.js': ['coverage']
    },

    coverageReporter: {
        type: 'html',
        dir: 'coverage/',
        file: 'coverage.html'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
