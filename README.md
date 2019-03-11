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

## 改造 tabbar 为 rouuter-link

## 设置路由高亮

##点击 tabbar 中的路由链接，展示对应的路由组件

##制作首页轮播图布局

##加载首页轮播图数据
1.获取数据，如何获取？使用vue-resource
2.使用vue-source 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项