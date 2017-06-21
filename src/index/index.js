// import Vue from 'vue';
import Vue from 'vue/dist/vue.js'; 
import VueRouter from 'vue-router';
Vue.config.productionTip = false;
import App from './App.vue';
import routes from './router.js';
import '../common/js/config';
import '../common/js/rem';
Vue.use(VueRouter);//明确地安装路由模块
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来

const router = new VueRouter({
  routes
})//  创建 router 实例
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
//。。可以放在created或者ready里面运行来获取或者更新数据...可以放在created或者ready里面运行来获取或者更新数据...