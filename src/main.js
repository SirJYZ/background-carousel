import Vue from "vue";
import App from "./App.vue";

import BgCarousel from "./components/BgCarousel/lib/plugin";
Vue.use(BgCarousel);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
