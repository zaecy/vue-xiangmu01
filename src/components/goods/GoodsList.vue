<template>
	<div class="goods-list">
		<!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo' + item.id" tag="div">
			<img src="https://img.alicdn.com/img/bao/uploaded/i4/i4/1714128138/O1CN01YthLib29zFgqVDOPf_!!0-item_pic.jpg_240x5000Q50s50.jpg" alt="">
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</router-link> -->

		<!-- 网页中有两种跳转方式 -->
		<!-- 方式1：使用a标签的形式叫做标签跳转 -->
		<!-- 方式2：使用window.location.href的形式，叫做编程式导航 -->
		<div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
			<img src="https://img.alicdn.com/img/bao/uploaded/i4/i4/1714128138/O1CN01YthLib29zFgqVDOPf_!!0-item_pic.jpg_240x5000Q50s50.jpg" alt="">
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>


		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>			
	</div>
</template>

<script>
export default {
	data(){
		//data是往自己组建内部挂载一些私有数据的
		return {
			pageindex: 1,//分页的页数
			goodslist: [] //存放商品列表的数组
		};
	},
	created(){
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			//获取商品列表
			this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
				if(result.body.status === 0){
					// this.goodslist = result.body.message;
					this.goodslist = this.goodslist.concat(result.body.message);
				}
			})
		},
		getMore(){
			this.pageindex++;
			this.getGoodsList();
		},
		goDetail(id){
			//使用js形式进行路由导航
			// this.$router.push({path:'/home/goodsinfo/' + id});
			this.$router.push({ name: 'goodsinfo', params: { id }})
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-list{
	display:flex;
	flex-wrap:wrap;
	padding:7px;
	justify-content:space-between;

	.goods-item{
		width:49%;
		border:1px solid #ccc;
		box-shadow:0 0 8px #ccc;
		margin:4px 0;
		padding:2px;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		min-height:293px;

		img{
			width:100%;
		}
		.title{
			font-size:14px;
		}

		.info{
			background-color: #eee;
			p{
				margin:0;
				padding:5px;
			}
			.price{
				.now{
					color:red;
					font-weight: bold;
					font-size: 16px;
				}
				.old{
					text-decoration: line-through;
					font-size: 12px;
					margin-left:10px;
				}
			}
			.sell{
				display:flex;
				justify-content: space-between;
				font-size: 13px;
			}
		}
	}
}
</style>