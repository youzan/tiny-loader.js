define(['__tests__/vendor/assert', 'loader'], function(assert, Loader) {

    console.log(Loader);

    window._cdnFallback = function() { 
    }

    var args = [
        [],
        [
        'https://b.yzcdn.cn/v2/vendor/jquery-1.10.2.min.js',
        'https://b.yzcdn.cn/v2/vendor/require.js',
        'https://dn-growing.qbox.me/vds.js'
        ],
        [
        'https://b.yzcdn.cn/v2/build_css/stylesheets/intro/projects/new_intro_a01915dc00.css',
        'https://b.yzcdn.cn/v2/vendor/jquery-1.10.2.min.js'
        ]    
    ]
    var errArg = ['https://b.yzcdn.cn/v2/vendor/jquer-1.10.2.min.js']
    var loader = Loader;
    describe('withoutError', function() {
       afterEach(function () {
           assert.notEqual(window.$,'undefined');
           assert.notEqual(window.angular,'undefined');
       })
       describe('Async', function() {
           args.forEach(function(arg) {
               it('will finished async without err', function(done) {
                   this.timeout(3000);
                   loader.async(arg, done); 
               }) 
           })  
       });

       describe('Sync', function() {
           args.forEach(function(arg) {
               it('will finished sync without err', function(done) {
                   this.timeout(3000);
                   loader.sync(arg, done);
               }) 
           })  
       });
    });

    describe('Error', function() {
        it('will throw an Error', function(done) {
            window._cdnFallback = function(node) {
                assert.strictEqual(node.src, errArg[0]);
                done();
            }
            loader.sync(errArg);
        }) 
    });


});
