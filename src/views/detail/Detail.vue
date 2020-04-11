<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
    <toast :message="message" :isShow="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/common/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "@/common/utils";
import { itemListenerMixin } from "@/common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      showBackTop: false,
      message: '',
      show: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Scroll,
    Toast
  },
  mixins: [itemListenerMixin],
  created() {
    this.iid = this.$route.params.iid;
    // 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 1.获取顶部的轮播数据
      this.topImgs = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取商家信息
      this.shops = new Shop(data.shopInfo);

      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取商品参数xinx
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100);
    });
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();

      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y
      
      let length = this.themeTopYs.length
      for(let i = 0; i < length -1 ; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
        }
      }
      this.$refs.nav.currentIndex = this.currentIndex

      this.showBackTop = -position.y > 600;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.title = this.goods.title
      product.iid = this.iid
      product.img = this.topImgs[0]
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      // 2.将商品添加到购物车里
      this.$store.dispatch('addCart', product).then(res => {
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = '';
        },1500)
      })
      
      // 3.添加到购物车成功
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>