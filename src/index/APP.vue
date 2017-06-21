<template>
	 <div class="wrap">

	 	<div class="contain">
		     <transition name="router-fade" mode="out-in">
		        <router-view></router-view>
		      </transition>
	     </div>
   </div>
</template>
<style lang="sass" scoped>
@import '../common/css/reset.css';//在页面最大的顶层router中加入reset样式表
@import '../common/css/mixin';
.router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
      opacity: 0;
}
</style>
<script>
export default {
	data(){
		return{
			sessions:"",
		}
	},
	created(){
		this.checkLogin();//主入口进来验证登录
	},
	methods:{
  		checkLogin(){
  			let sessions = localStorage.getItem("appsession");
			if(sessions != "goxuecheapp"){
				
				// this.$router.push('/login');// 在使用了 vue-router 的应用中,路由对象会被注入每个组件中,赋值为 this.$route ,并且当路由切换时,路由对象会被更新
			}
  		}
    }  
}

</script>