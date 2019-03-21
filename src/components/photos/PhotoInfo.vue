<template>
	<div class="photoinfo-container">
		<h3>{{ photoinfo.title }}</h3>
		<p class="subtitle">
			<span>{{ photoinfo.add_time | dateFormat}}</span>
			<span>点击:{{ photoinfo.click }}次</span>
		</p>

		<hr>

		<!-- 缩略图区域 -->
		<div>
			<vue-preview
	      :list="list"
	      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px', boxShadow:'0 0 8px #999'}"
	      :previewBoxStyle="{border: '1px solid #eee'}"
	      :tapToClose="true"
	      @close="closeHandler"
	      @destroy="destroyHandler"
	    />

		</div>
		<!-- 图片内容区域 -->

		<div class="content" v-html="photoinfo.content"></div>

		<!-- 放置现成的评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'


export default {
	data(){
		return {
			id:this.$route.params.id, //路由中获得的图片id
			photoinfo: {}, //图片详情
			list:[] //缩略图的数组
		};
	},
	created(){
		this.getPhotoInfo();
		this.getThumbs();
	},
	methods:{
		getPhotoInfo(){
			//获取图片的详情
			this.$http.get('api/getimageInfo/'+ this.id).then(result => {
				if(result.body.status === 0){
					this.photoinfo = result.body.message[0];
				}
			});
		},
		getThumbs(){
			//获取缩略图
			this.$http.get('api/getthumimages/' +this.id).then(result => {
				if(result.body.status === 0) {
					//循环每个图片数据，补全图片宽高
					result.body.message.forEach(item => {
						item.w = 600;
						item.h = 400;
					});
					//把完整的数据保存到list中
					this.list = result.body.message;
				}
			})
		},
		closeHandler () {
        	console.log('closeHandler')
      	},
      	destroyHandler() {
      		console.log('destroyHandler')
    	}
	},

	components:{
		//注册评论子组件
		'cmt-box':comment
	}
};
</script>


<style lang="scss" scoped>
.photoinfo-container{
	padding:3px;
	h3{
		color:#26A2FF;
		font-size:15px;
		text-align:center;
		margin:15px 0;
	}
	.subtitle{
		display:flex;
		justify-content:space-between;
		font-size:13px;
	}

	.content{
		font-size:13px;
		line-heightL:30px;
	}
}
</style>