import Vue from "vue";
import App from "./App.vue";

import BackgroundCarousel from "BackgroundCarousel";
Vue.use(BackgroundCarousel);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
