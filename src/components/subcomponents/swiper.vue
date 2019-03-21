<template>
	<div>
		<mt-swipe :auto="4000">
			<!-- 在组件中，使用 v-for 循环的话，一定要使用 key -->
			<!-- 将来谁使用此组件，谁为我们传递lunbotulist -->
			<!-- 此时，lunbotulist 应该是父组件向子组件传值来设置 -->
		  <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
		  	<img :src="item.img" alt="" :class="{'full':isfull}">
		  	 <!-- 在这里定义一个属性full，让使用轮播图的调用者手动指定是否需要为100%宽度 -->
		  </mt-swipe-item>
		</mt-swipe>

	</div>


</template>

<script>
export default {
	// 接收父组件传来的属性
	props:["lunbotuList", "isfull"]
	};
</script>

<style lang="scss" scoped>
	.mint-swipe{
	height:200px;

	.mint-swipe-item{
		text-align:center;
		
		img{
			height: 100%;
		}
	}
}

.full{
	width:100%;
}
</style>