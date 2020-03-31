<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :class="{fixed: isTabFixed}"
      v-show="isTabFixed" 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl1"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @SwiperImgLoad="SwiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-views></feature-views>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureViews from "./childComps/FeatureViews";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backtop/BackTop";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "@/common/utils"
import { itemListenerMixin } from "@/common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: "pop",
      showBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureViews,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  created() {
    // 获取多个数据
    this.getHomeMultidata(),
      // 获取商品分类数据
      this.getHomeGoods("pop"),
      this.getHomeGoods("new"),
      this.getHomeGoods("sell");
  },
  mounted() {},
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {    
    this.$refs.scroll.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {    
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      };
      this.$refs.tabControl1.currentIndex = index; 
      this.$refs.tabControl2.currentIndex = index; 
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.showBackTop = -position.y > 600;
      // 2.判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    SwiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 防抖函数
    // debounce(func, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }

    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8198;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.fixed {
  background-color: #fff;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  /* 下面两个属性设置滚动44px后吸附到顶端效果 */
  /* position: sticky; */
  /* top: 44px; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>