<template>
  <div id="app">
    <bg-carousel
      :list="carouselList"
      list-key-name="id"
      list-img-name="src"
      padding-top="40%"
      :initial-index="1"
      :autoplay-time="4000"
      :transition-time="500"
      :loop="true"
      timing-function-name="linear"
      :showIndicators="true"
      indicator-color="orange"
      @clickItem="handleClickItem"
      @change="handleChange"
    />
  </div>
</template>

<script>
import BgCarousel from "./components/BgCarousel";

export default {
  name: "App",
  components: {
    BgCarousel
  },
  data() {
    return {
      carouselList: [
        {
          id: 0,
          src:
            "https://images.pexels.com/photos/1352251/pexels-photo-1352251.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          id: 1,
          src:
            "https://images.pexels.com/photos/1425174/pexels-photo-1425174.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          id: 2,
          src:
            "https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
      ]
    };
  },
  methods: {
    handleClickItem(e) {
      // console.log(e);
    },
    handleChange(e) {
      // console.log(e);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
