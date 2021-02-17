<template>
  <div class="carousel-container" :style="{ paddingTop }">
    <transition-group
      v-if="list.length"
      name="slide"
      tag="ul"
      :class="{ immediate }"
      :style="{
        width: carouselWidth,
        transform: `translate3d(${carouselTransformX}px,0,0)`,
        'transition-duration': `${transitionTime}ms`,
        'transition-timing-function': timingFunctionName,
      }"
    >
      <li
        v-for="(item, index) in list"
        :key="item[listKeyName] || index"
        :style="{
          backgroundImage: `url(${item[listImgName]})`,
          transform: item.transform,
        }"
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
        @touchend="handleTouchEnd($event, { detail: item })"
      ></li>
    </transition-group>
    <div v-if="list.length && showIndicators" class="indicators">
      <i
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index === indicatorIndex }"
        :style="{ 'background-color': indicatorColor }"
      ></i>
    </div>
  </div>
</template>

<script>
const TimeToWait = 50; // 函数节流中延时时间

export default {
  name: "Carousel",
  props: {
    list: {
      type: Array,
      required: true,
    },
    listKeyName: {
      type: String,
      required: true,
    },
    listImgName: {
      type: String,
      required: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplayTime: {
      type: Number,
      default: 3000,
    },
    transitionTime: {
      // 轮播图的transform动画时间
      type: Number,
      default: 300,
    },
    paddingTop: {
      type: String,
      default: "50%",
    },
    timingFunctionName: {
      type: String,
      default: "linear",
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
    indicatorColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      screenWidth: 0,
      carouselWidth: "0px",
      currentIndex: 0, // 展示的图片的index
      timer: null,
      initialX: "", // 每次touchstart时的pageX
      moveX: "", // 每次touchmove时的pageX
      previousTime: null, // 每次touchmove时的时间戳
      immediate: false, // transformX是否该瞬间切换（是否有过渡状态）
    };
  },
  computed: {
    indicatorIndex() {
      // 指示点的index
      if (this.currentIndex === this.list.length + 1) {
        return 0;
      } else if (this.currentIndex === -1) {
        return this.list.length;
      } else {
        return this.currentIndex;
      }
    },
    carouselTransformX() {
      return -this.currentIndex * this.screenWidth;
    },
  },
  watch: {
    currentIndex: {
      handler: "handleEmitChange",
    },
  },
  created() {
    // 这一步的目的是循环时可以改变第一张和最后一张的transformX
    if (this.loop) {
      this.list.forEach((el) => {
        this.$set(el, "transform", "translate3d(0,0,0)");
      });
    }

    this.currentIndex = this.initialIndex;
    this.screenWidth = document.body.clientWidth;
    this.carouselWidth = this.list.length * this.screenWidth + "px";
  },
  mounted() {
    this.slide();
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    slideToLeft() {
      // 在此之前可能因为处于最后一张往左滑动的缘故，将immediate设置成了true
      if (this.immediate) {
        this.immediate = false;
      }

      if (!this.loop) {
        if (this.currentIndex === this.list.length - 1) {
          this.stop();
        } else {
          this.currentIndex++;
        }
      } else {
        if (this.currentIndex === this.list.length - 1) {
          // 下面的动作使轮播图继续往前进，就像回到了第一张，实际上轮播图仍旧继续往前
          this.list[0].transform = `translate3d(${this.screenWidth *
            this.list.length}px,0,0)`; // 更改第一张图片的transformX，使轮播图能够无缝滚动
          this.currentIndex++;

          // 再完成上述动作（耗时300毫秒）后，瞬间将第一张的图片transformX恢复为0，且将轮播图位置移到初始位置
          const timer = setTimeout(() => {
            this.immediate = true;
            this.list[0].transform = "translate3d(0,0,0)";
            this.currentIndex = 0;
            clearTimeout(timer);
          }, this.transitionTime);
        } else {
          this.currentIndex++;
        }
      }
    },
    slide() {
      this.timer = setInterval(() => {
        this.slideToLeft();
      }, this.autoplayTime);
    },
    handleTouchstart(e) {
      this.initialX = e.touches[0].pageX;
      this.moveX = e.touches[0].pageX;
      this.stop(); // 每次手指触摸屏幕的时候即暂停掉轮播
    },
    handleTouchmove(e) {
      // handleTouchmove用来处理两个边缘情况下的瞬间展示

      // 节流
      const now = new Date().getTime();
      if (!this.previousTime) {
        this.previousTime = now;
      }
      this.moveX = e.changedTouches[0].pageX;
      if (now - this.previousTime > TimeToWait) {
        const direction = this.moveX - this.initialX < 0 ? "toLeft" : "toRight";

        // 当处于最后一张且往左边滑动时，切换第一张的translateX使之能够足够快的展示（最慢为函数节流中延时时间）
        if (
          this.loop &&
          direction === "toLeft" &&
          this.currentIndex === this.list.length - 1
        ) {
          this.list[0].transform = `translate3d(${this.screenWidth *
            this.list.length}px,0,0)`;
        }

        // 同上，当处于第一张且往右边滑动时，切换最后一张的translateX
        if (this.loop && direction === "toRight" && this.currentIndex === 0) {
          this.list[this.list.length - 1].transform = `translate3d(${-this
            .screenWidth * this.list.length}px,0,0)`;
        }
      }

      this.previousTime = now;
    },
    handleTouchEnd(e, params) {
      const endX = e.changedTouches[0].pageX;
      if (endX === this.initialX) {
        // 这里判断为单击事件
        this.$emit("clickItem", {
          detail: params.detail,
        });
        this.slide();
        return;
      }

      const distance = endX - this.initialX;
      const direction = distance < 0 ? "toLeft" : "toRight";

      clearTimeout(this.timer);

      const _slide = () => {
        const timer = setTimeout(() => {
          this.slide();
          clearTimeout(timer);
        }, this.transitionTime);
      };

      if (!this.loop) {
        if (direction === "toRight") {
          if (this.currentIndex === 0) {
            // 回到第一张后继续向左滚动
            this.currentIndex = 0;
          } else {
            // 滚动到上一张后继续向左滚动
            this.currentIndex--;
          }
          _slide();
        } else {
          if (this.currentIndex === this.list.length - 1) {
            // 回到最后一张且停下
            this.currentIndex = this.list.length - 1;
          } else {
            // 滚动到下一张且继续向左滚动
            this.currentIndex++;
            _slide();
          }
        }
      } else {
        this.immediate = false;

        if (direction === "toRight") {
          if (this.currentIndex === 0) {
            // 滚动到最后一张后继续向左滚动
            this.currentIndex = -1;

            const timer = setTimeout(() => {
              this.immediate = true;
              this.list[this.list.length - 1].transform = "translate3d(0,0,0)";
              this.currentIndex = this.list.length - 1;
              this.slide();
              clearTimeout(timer);
            }, this.transitionTime);
          } else {
            // 滚动到上一张后继续向左滚动
            this.currentIndex--;
            _slide();
          }
        } else if (direction === "toLeft") {
          if (this.currentIndex === this.list.length - 1) {
            // 切换到第一张后继续向左滚动
            this.currentIndex++;

            const timer = setTimeout(() => {
              this.immediate = true;
              this.list[0].transform = "translate3d(0,0,0)";
              this.currentIndex = 0;
              this.slide();
              clearTimeout(timer);
            }, this.transitionTime);
          } else {
            // 继续向左滚动
            this.currentIndex++;
            _slide();
          }
        }
      }
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    handleEmitChange(newVal, oldVal) {
      if (newVal !== -1 && newVal !== this.list.length) {
        this.$emit("change", newVal);
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.carousel-container {
  position: relative;
  height: 0;
  overflow: hidden;
  background-color: #eee;
  box-sizing: border-box;
}

.carousel-container ul {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition-property: transform;
  margin: 0;
  padding: 0;
}

.carousel-container ul.immediate {
  transition-duration: 0s !important;
}

.carousel-container ul li {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.indicators {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.indicators i {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 0 3px;
  opacity: 0.3;
}

.indicators i.active {
  opacity: 1;
}
</style>
