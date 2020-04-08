<template>
  <div>
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'


export default {
  name: 'Cart',
  data () {
    return {
      
    };
  },
  components: {
    NavBar,
    CartList
  },
  methods: {},
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    }
  },
}
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: #fff;
}
</style>