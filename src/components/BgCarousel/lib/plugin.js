import BgCarousel from "./BgCarousel";

const plugin = {
  install(Vue, options) {
    Vue.component("BgCarousel", BgCarousel);
  }
};

export default plugin;
