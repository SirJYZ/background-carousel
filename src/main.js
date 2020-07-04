import Vue from "vue";
import App from "./App.vue";

// 引入插件
import BgCarousel from "./components/BgCarousel/index";
// 使用插件
Vue.use(BgCarousel);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
