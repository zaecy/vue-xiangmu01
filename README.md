# 这是一个练手的项目

## 如果有什么错误还请多多包涵

### 我们是有灵魂的程序员，所以，我们的代码富有诗意

#### 实在编不下去了

## 制作首页App组件
1. 完成 header 区域，使用的是 mint-ui 中的 header 组件
2. 制作底部的 tabber 区域，使用的是 MUI 中的 Tabbber.html
 + 在制作购物车小图标的时候，操作会多一些
 + 先把扩展图标的 css 样式拷贝到项目中
 + 拷贝扩展字体库的 ttf 文件到项目中
 + 为购物车小图标添加如下样式 'mui-icon-extra mui-icon-extra-cart'
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取？使用vue-resource
2. 使用vue-source 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 新闻资讯页面制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表的每一项改造为 router-link，同时在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
 + ` import comment from './comment.vue'` 
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment 组件，注册为自己的子组件
4. 将注册子组件时候的注册名称以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中
1.getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取最新一页数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论OK后，重新刷新列表以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法 ，把最新的评论追加到 data 中 comments 的开头；这样，就能完美实现刷新评论列表的需求

## 改造图片分析按钮为路由的链接并显示对应的组件页面
## 制作底部的图片列表
1.制作顶部的滑动条
2.制作顶部滑动条的坑们
### 制作顶部滑动条的坑们：
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是js组件，需要初始化
+ 导入 mui.js
+ 调用官方提供的方式去初始化；
...

mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
...

4. 在初始化滑动条的时候，导入的 mui.js，但是控制台报错：'Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode'
+ 经过思考，认为是 mui.js中用到了'caller', 'callee', and 'arguments'这些东西，但是webpack打包好的hundle.js中默认是使用严格模式的，这两者起冲突了；
+ 如何解决？把webpack打包时候的严格模式禁用
+ 使用 babel-plugin-transform-remove-strict-mode 这个插件可以禁用
解决方案是修改.babelrc，略过某个js文件  {   "presets": ["es2015"],   "ignore": [     "./src/..mui.min.js"] }
5. 刚进入图片分享页面的时候，滑动条无法滑动。后来发现如果要初始化滑动条，必须要等 DOM 元素加载完毕，所以把初始化的代码搬到了 mounted 函数中
6. 当滑动条调试好后发现tabbar无法正常工作了，这时候只需要把每个tabbar按钮样式中的 'mui-tab-item' 重新改一下名字；
7. 获取所有分类，并渲染分类列表；

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，可以用mint-ui中现成的组件 'lazy-load';
2. 根据该组件的文档进行使用
3. 渲染图片列表数据

### 实现了 图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要用tag属性指定要渲染为哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面
