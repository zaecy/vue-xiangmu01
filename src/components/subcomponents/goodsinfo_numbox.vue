<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="numberChanged"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>

</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';

export default {
	mounted(){
		//初始化数字选择框组件
		mui('mui-numbox').numbox();
		console.log(this.max);
	},
	methods:{
		numberChanged(){
			//每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
			//传到父组件GoodsInfo上的getCount事件所绑定的函数getSelectCount()中
			// console.log(this.$refs.numbox.value);
			this.$emit('getCount',parseInt(this.$refs.numbox.value));
		}
	},
	//子组件接收父组件goodsinfo中的值用props来接收父组件绑定的属性
	props:["max"],
	watch:{
		//监听属性max,最新的max会被监听到
		max:function(newval, oldval){
			mui(".mui-numbox")
			.numbox()
			.setOption('max',newval);
		}
	}
};
</script>

<style lang="scss" scoped></style>