<template>
	<div class="goodsinfo-container">
		<!-- 要实现动画的小球 -->
	    <!-- 注意：钩子函数动画，这些钩子函数，都是通过事件绑定机制，绑定到 transition 元素上的 -->
	    <transition
	      @before-enter="beforeEnter"
	      @enter="enter"
	      @after-enter="afterEnter">
	      <div class="ball" v-show="ballFlag"></div>
	    </transition>

		<!-- 商品轮播图区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>

		<!-- 商品购买区域 -->
		<div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价: <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
						</p>
						<p>购买数量：<numbox @getCount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox></p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>

							<!-- 这里若要完成获取numbox中数值，需要用到父子组件通讯。因为numbox是另外的组件 -->
						</p>
					</div>
				</div>
			</div>



		<!-- 商品参数区域 -->
		<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{ goodsinfo.goods_no }}</p>
						<p>库存情况:{{ goodsinfo.stock_quantity }}</p>
						<p>上架时间:{{ goodsinfo.add_time | dateFormat  }}</p>

					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
	</div>
</template>

<script>
    //导入轮播图组件
	import swiper from '../subcomponents/swiper.vue'
	//导入数字选择框组件
	import numbox from '../subcomponents/goodsinfo_numbox.vue'
	export default {
		data(){
			return {
				id:this.$route.params.id,//将路由参数对象中的id挂载到data，方便后期调用
				lunbotu:[], //轮播图的数据
				goodsinfo:{}, //获取到的商品的信息
				ballFlag: false, // 小球的显示与隐藏状态
				selectCount: 1 //保存用户选中的商品数量，默认为1
			};
		},	
		created(){
			this.getLunbotu();
			this.getGoodsInfo();
		},
		methods:{
			getLunbotu(){
				this.$http.get('api/getthumimages/' + this.id).then(
					result => {
						if(result.body.status === 0){
							//先循环轮播图数组的每一项添加img属性，因为轮播图组件中只认识item.img，不认识img.src
							result.body.message.forEach(item => {
								item.img = item.src
							})
							this.lunbotu = result.body.message;
						}
					});
			},
			getGoodsInfo(){
				this.$http.get("api/goods/getinfo/" + this.id).then(result => {
					if(result.body.status === 0){
						this.goodsinfo = result.body.message[0];
					}
				});
			},
			goDesc(id){
				//点击使用编程式导航跳转到图文介绍页面
				this.$router.push({ name:"goodsdesc",params:{ id } })
			},
			goComment(id){
				//点击使用编程式导航跳转到购物车页面
				this.$router.push({ name:"goodscomment",params:{ id } })
			},
			addToShopCar(){
				//添加到购物车
				this.ballFlag=!this.ballFlag;
				// { id:商品id ,count:要购买的数量, price:商品的单价, selected:true }
				// 拼接出一个要保存到 store 中 car 数组里的商品信息对象
				var goodsinfo = {
					id:this.id, 
					count:this.selectCount,
					price:this.goodsinfo.sell_price, 
					selected:true
				};
				// 调用 store 中的 mutations 来将商品加入购物车
				this.$store.commit('addToCar', goodsinfo);
			},
			beforeEnter(el){
			    // 入场动画开始之前，设置小球的起始状态
			    el.style.transform = "translate(0, 0)";
			},
			enter(el,done) {
				el.offsetWidth;


			    // 动态获取小球的横纵坐标
		        const ballPos = el.getBoundingClientRect();
		        // 动态获取徽标的横纵坐标【注意：这里获取徽标的位置，和双向数据绑定没有任何关系，所以，可以直接使用普通的DOM操作】
		        // DOM操作的优势：不论要操作的元素属于哪个组件，只要这个元素属于document，那么就能够直接获取到
		        const badgePos = document.getElementById("badge").getBoundingClientRect();
		        const left = badgePos.left - ballPos.left;
		        const top = badgePos.top - ballPos.top;
		        // 动态设置 top 和 left 值
		        el.style.transform = "translate(" + left + "px, " + top + "px)";
		        el.style.transition = "all 1s cubic-bezier(.4,-0.3,0.5,.68)";
				done();
			},
			afterEnter(el) {
		      // 入场动画完成之后的回调函数
		      this.ballFlag = !this.ballFlag;
		    },
		    getSelectCount(count){
		    	//用一个变量 count 来接收 子组件 numbox上传来的数据
		    	//当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 中的 selectCount 上
		    	this.selectCount = count;
		    	console.log("父组件拿到的数量值：" + this.selectCount);
		    }
		},
		components:{
			swiper,numbox
		}
	};
</script>

<style lang="scss" scoped>
	.goodsinfo-container{
		background-color: #eee;
		overflow:hidden;

		.now_price{
			color:red;
			font-weight:bold;
		}

		.mui-card-footer{
			display:block;
			button{
				margin:10px 0;
			}
		}

		.ball{
			width:15px;
			height:15px;
			border-radius:50%;
			background-color: red;
			position:absolute;
			z-index:99;
			top:390px;
			left:146px;
		}
	}
</style>