Tiny-Loader.js
=========================
A small loader that load CSS/JS in best way for page performance

如何使用Tiny-Loader
--------------------------------------
**Loader.async**: 下载远端js，css文件，异步执行，适用于对执行顺序不重要的js文件
```
Loader.async(['xxxx.css', 'yyyy.js'])
```
**Loader.sync**: 下载远端js,css文件，同步执行，适用于对执行顺序有要求的js文件
```
Loader.sync(['xxxx.css', 'yyyy.js', 'zzzz.js'])
```
#####注：#####
* css加载都是以async方式
* 会自动判断文件类型，用正确的方式加载文件

为何要使用Tiny-Loader
--------------------------------------
Tiny-Loader加载器 会在页面'load'事件以后进行静态资源的下载，减少js对页面打开速度的影响，提前'load'事件的触发

Tiny-Loader加载器 可以用在静态资源的按需加载上。在页面中，会有一部分js，css在用户某些操作或者和后端交互以后才需要的，可以用Tiny-Loader做延后加载。在操作或者交互完后，调用Tiny-Loader下载这部分资源，这样可以减少页面初始加载静态资源的文件大小

Tiny-Loader加载器 也可以用在静态资源的预加载上。通过判断用户的访问趋势，在当前页面打开完成后，用Tiny-Loader下载热点静态资源文件，或者接下来页面的静态资源文件。加快后续页面的打开速度。

[示例](https://raw.githubusercontent.com/youzan/tiny-loader.js/master/example.html)

疑问或问题
--------------------------------------
有任何疑问或者问题，可以在[issue](https://github.com/youzan/tiny-loader.js/issues)中向我们提出来，我们会第一时间解决。