import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router/router'
import vueClapButton from 'vue-clap-button'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vueClapButton)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
