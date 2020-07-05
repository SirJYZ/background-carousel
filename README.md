# bgCarousel

## Purpose
#### BgCarousel is a simple vue carousel plugin. By setting the aspect ratio of the carousel image, the carousel image component can occupy a place in advance before the image rendering is completed.The picture will be presented as div-background.

## Quick start
```
npm install
```
```
npm run serve
```

## Usage
#### Import components on pages that require carousel image component
##### app.vue:
```html
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
      indicator-color="red"
      @clickItem="handleClickItem"
      @change="handleChange"
    ></bg-carousel>
  </div>
</template>
```
```javascript
export default {
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
```

##### main.js
```javascript
import Vue from "vue";
import BgCarousel from "./components/BgCarousel/index";
Vue.use(BgCarousel);
````

## Props
* list
    * type: Array
    * required: true
    * Description: List of pictures provided to the carousel component

* listKeyName
    * type: String
    * required: true
    * Description: The value of v-bind: key in the loop of the carousel component list. For example,the list is [{imgId:0,img:'picName'}], then listKeyName is 'imgId'. 

* listImgName
    * type: String
    * required: true
    * Description: The key value of the picture in the cycle of the carousel component list. For example,the list is [{imgId:0,img:'picName'}], then listImgName is 'img'. 

* paddingTop
    * type: String
    * default: "50%"
    * Description: Picture aspect ratio

* initialIndex
    * type: Number
    * default: 0
    * Description: Which picture to show at the beginning

* loop
    * type: Boolean
    * default: true
    * Description: Whether to enable loop 

* autoplayTime
    * type: Number
    * default: 3000
    * Description: Time to switch pictures

* transitionTime
    * type: Number
    * default: 300
    * Description: Picture transform animation time

* timingFunctionName
    * type: String
    * default: "linear"
    * Description: Transition-timing-function name. For example, 'ease-out' or 'ease-out'.

* showIndicators
    * type: Boolean
    * default: true
    * Description: Whether to show the indicator

* indicatorColor
    * type: String
    * default: "#fff"
    * Description: Indicator background color

## Methods
* clickItem
    * Description: Trigger event when clicked
    * Callback parameter: event: Event

* change
    * Description: Trigger event after the end of each carousel
    * Callback parameter: index(Index of current Picture)




