<template>
	<div class="mui-numbox" data-numbox-min='1' style="heigt:25px">
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
	},
	methods:{
		numberChanged(){
			//数量改变了
		}
	}
};
</script>

<style lang="scss" scoped></style>