<template>
  <div id="app">
    <background-carousel
      :list="carouselList"
      list-key-name="id"
      list-img-name="src"
      padding-top="40%"
      :initial-index="0"
      :autoplay-time="4000"
      :transition-time="500"
      :loop="true"
      timing-function-name="linear"
      :showIndicators="true"
      indicator-color="orange"
      @clickItem="handleClickItem"
      @change="handleChange"
    />
    <img
      src="https://images.pexels.com/photos/1352251/pexels-photo-1352251.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      alt=""
      style="display:block;width:100%;transform:translate3d(100px,0,0)"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      carouselList: [
        {
          id: 0,
          src:
            "https://images.pexels.com/photos/1352251/pexels-photo-1352251.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
          id: 1,
          src:
            "https://images.pexels.com/photos/1425174/pexels-photo-1425174.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
          id: 2,
          src:
            "https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
      ],
    };
  },
  methods: {
    handleClickItem(e) {
      // console.log(e);
    },
    handleChange(e) {
      // console.log(e);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
