define(['__tests__/vendor/assert','loader'], function(assert,Loader) {

    window._cdnFallback = function(a) {
        var t, o = {
            script: "src",
            link: "href"
        }, r = "b.yzcdn.cn", n = "su.yzcdn.cn";
        var c, i, l, d, f, m, u, s;
        if (c = a.nodeName.toLowerCase(),i = o[c]) {
            l = d = a[i],
            l = l.replace(r, n),
            f = l == d,
            f || (m = document,
            u = m.head || m.getElementsByTagName("head")[0] || m.documentElement,
            s = m.createElement(c),
            "link" == c && (s.rel = "stylesheet"),
            s[i] = l,
            s.onerror = function() {
                _cdnFallback(s)
            }
            ,
            u.appendChild(s)),
            (new Image).src = "//tj.koudaitong.com/1.gif?net_error=1&fileurl=" + d;
            var g = l.indexOf(n) > -1 || l.indexOf(r) > -1
              , y = !t && f;
            y && g && (e.motify && e.motify.error && e.motify.error("啊哦，有东西加载失败了，刷新下试试~"),
            t = !0)
        }
    }


    var args = [
        [],
        ['http://cdn.bootcss.com/angular.js/2.0.0-beta.17/angular2-all-testing.umd.dev.js',
        'http://cdn.bootcss.com/jquery/3.0.0-rc1/jquery.js',
        'http://cdn.bootcss.com/jquery/2.1.2/jquery.js'
        ],
        ['https://raw.githubusercontent.com/necolas/normalize.css/master/normalize.css','http://cdn.bootcss.com/jquery/2.1.2/jquery.js']    
    ]
    var errArg = ['https://raw.githubusercontent.com/necolas/normalize.css/master/normaliz.css']
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
            // assert.throws('Error');
            window._cdnFallback = function(node) {
                assert.strictEqual(node.href, errArg[0]);
                done();
            }
            loader.sync(errArg);
        }) 
    });


});
