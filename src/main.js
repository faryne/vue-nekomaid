import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import filters from './components/Filters'
import VueCarousel from 'vue-carousel';


Vue.config.productionTip = false

Vue.filter('siteConverted', filters.siteConverted);
Vue.use(VueCarousel);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
