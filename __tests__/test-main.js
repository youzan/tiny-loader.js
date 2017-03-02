var allTestFiles = [];
var TEST_REGEXP = /^\/base\/__tests__\/tests\/(.*)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    // console.log(file)
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
        // allTestFiles.push(file);
    }
});

// console.log(allTestFiles)

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        zenjs: '/base/bower_components/zenjs',
        bower_components: '/base/bower_components',
        jquery: '/base/__tests__/vendor/jquery'
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
