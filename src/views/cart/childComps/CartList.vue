<template>
  <div>
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem
  },
  methods: {},
  computed: {
    cartList() {
      return this.$store.state.cartList;
    }
  },
  activated() {
      this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  width: 100%;
  overflow: hidden;
}
</style>