import BackgroundCarousel from "./BackgroundCarousel";

const plugin = {
  install(Vue, options) {
    Vue.component("BackgroundCarousel", BackgroundCarousel);
  }
};

export default plugin;
