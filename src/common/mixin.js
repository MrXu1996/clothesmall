import {
  debounce
} from "@/common/utils"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.imgLoad, 200);
    this.itemListenerMixin = () => {
      refresh();
    }
    this.$bus.$on("imgLoad", this.itemListenerMixin);
  },
}