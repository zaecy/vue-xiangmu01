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
						<p>购买数量：<numbox></numbox></p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
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
				ballFlag: false // 小球的显示与隐藏状态
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
			}
			,
			beforeEnter(el) {
			      // 入场动画开始之前，设置小球的起始状态
			    el.style.transform = "translate(0, 0)";
			},
			enter(el,done){
				el.offsetWidth;
				el.style.transform = "translate(93px, 425px)";
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el) {
		      // 入场动画完成之后的回调函数
		      this.ballFlag = !this.ballFlag;
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