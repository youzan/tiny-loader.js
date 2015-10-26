/*
* #####Loader代码加载器
* 用于脚本，样式的延迟加载、样式的预加载等
* 脚本的延迟加载onLoad之后
* **DEMO & API**
*
* // 脚本异步下载执行
*  `window.loader.async(['xxxx.js', 'yyyy.js'])`
*
* // 脚本同时下载，顺序执行
*  `window.loader.sync(['xxxx.js', 'yyyy.js'])`
*
* ```
*   window.loader.async(['xxxx.js'], function(){
*        // 回调函数
*    });
* ```
*/
'use strict';

(function(window, document){
    // cssExpr 用于判断资源是否是css
    var cssExpr = new RegExp('\\.css');
    var nHead = document.head || document.getElementsByTagName('head')[0];

    // 判断对应的node节点是否已经载入完成
    function isReady(node){
        return node.readyState === 'complete' || node.readyState === 'loaded';
    }

    // loadCss 用于载入css资源
    function loadCss(url, setting, callback){
        var node = document.createElement('link');

        node.rel = 'stylesheet';
        addOnload(node, callback);
        node.async = true;
        node.href = url;

        nHead.appendChild(node);
    }

    // loadJs 用于载入js资源
    function loadJs(url, setting, callback){
        var node = document.createElement('script');

        node.charset = 'utf-8';
        addOnload(node, callback);
        node.async = !setting.sync;
        node.src = url;

        nHead.appendChild(node);
    }

    // 用于给指定的节点绑定onload回调
    // 监听元素载入完成事件
    function addOnload(node, callback){
        var supportOnload = 'onload' in node;

        if (supportOnload) {
            node.onload = onload;
            node.onerror = function(){
                node.onerror = null;
                window._cdnFallback(node);
            };
        } else {
            node.onreadystatechange = function() {
                if ( isReady(node) ) {
                    onload();
                }
            };
        }

        function onload() {

            // 执行一次后清除，防止重复执行
            node.onload = node.onreadystatechange = null;

            node = null;

            callback();
        }
    }

    // 资源下载入口，根绝文件类型的不同，调用loadCss或者loadJs
    function loadItem(url, list, setting, callback) {
        if( cssExpr.test(url) ){
            loadCss(url, setting, onFinishLoading);
        } else {
            loadJs(url, setting, onFinishLoading);
        }

        // 每次资源下载完成后，检验是否结束整个list下载过程
        // 若已经完成所有下载，执行回调函数
        function onFinishLoading(){
            var urlIndex = list.indexOf(url);
            if( urlIndex > -1 ){
                list.splice(urlIndex, 1);
            }

            if( list.length === 0 ){
                callback();
            }
        }
    }

    function doInit(list, setting, callback){
        var cb = function(){
            callback && callback();
        };

        list = Array.prototype.slice.call(list || []);

        if( list.length === 0 ){
            cb();
            return;
        }

        for( var i = 0, len = list.length; i < len; i++ ){
            loadItem(list[i], list, setting, cb);
        }
    }

    // 判断当前页面是否加载完
    // 加载完，立刻执行下载
    // 未加载完，等待页面load事件以后再进行下载
    function ready(node, callback) {
        if ( isReady(node) ) {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    }

    // 暴露出去的Loader
    // 提供async, sync两个函数
    // async 用作异步下载执行用，不阻塞页面渲染
    // sync  用作异步下载，顺序执行，保证下载的js按照数组顺序执行
    var Loader = {
        async: function(list, callback){

            ready(document, function(){
                doInit(list, {}, callback);
            });
        },

        sync: function(list, callback){

            ready(document, function(){
                doInit(list, {
                    sync: true
                }, callback);
            });
        }
    };

    window.Loader = Loader;

    return Loader;

})(window, document);
