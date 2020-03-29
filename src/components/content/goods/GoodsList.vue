<template>
  <div class="goods">
      <goods-list-item v-for="(item, index) in goods" 
      :key="index"
      :goodsItem="item">
      </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  data () {
    return {
      
    };
  },
  props: {
      goods: {
          type: Array,
          default() {
              return []
          }
      }
  },
  components: {
      GoodsListItem
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px;
}
</style>