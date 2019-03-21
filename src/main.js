//入口文件
import Vue from 'vue'

//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站时，在刚调用 main.js 的时候先从本地存储中把购物车的数据读出来放到 store 中
var car = window.JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state:{  //this.$store.state.***
		car:car  //将购物车中的商品数据，用一个数组存储起来，在car数组中存储一些商品的对象，可以暂时将商对象设置成这个样子  
		// { id:商品id ,count:要购买的数量, price:商品的单价, selected:true }
	},
	mutations:{  //this.$store.commit('方法的名称','按需传递唯一的参数')
		addToCar(state, goodsinfo){
			//点击加入购物车，把商品信息保存到 store 中的 car 上
			// 分析：
			// 1.如果购物车中已经有对应的商品了，那么只要更新数量即可
			// 2.如果没有，则直接把商品数据 push 到 car 中即可
			
			//假设在购物车中没有找到对应的商品
			var flag = false


			state.car.some( item=> {
				if(item.id == goodsinfo.id) {
					//购物侧中已有对应商品，直接加上去
					item.count += parseInt(goodsinfo.count) //goodsinfo.count有可能是字符串，转化为数字
					flag = true;
					return true
				} 
			})

			//如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
			if(!flag){
				state.car.push(goodsinfo)
			}

			// 为了持久化存储购物车的数据，可以把 购物车的商品，序列化出来，存储到 localStorage 中
			localStorage.setItem('car', window.JSON.stringify(state.car))
		}
	},  
	getters:{  //this.$store.getters.***
		//相当于计算属性，也相当于 filters
		getAllCount(state){
			 // 徽标中商品数量
		    var c = 0
		    // getters 的特性，只要依赖的数据变化了，必然会重新计算 这个 getters 的值；
		    state.car.forEach(item => c += item.count)
		    return c
		}
	}   
})

//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//按需导入Mint-UI中的组件
// import { Header,Swipe, SwipeItem, Button ,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

// 完全导入Mint-UI中的组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)



//1.3导入自己的 router.js 路由模块
import router from './router.js'

//导入App和组件
import app from './App.vue'
var vm = new Vue({
	el:'#app',
	render: c => c(app),
	router, //1.4 挂载路由对象到 VM 实例上	
	store //挂载store 状态管理对象
	
})