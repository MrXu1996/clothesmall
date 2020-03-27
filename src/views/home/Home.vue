<template>
  <div id="home">
      <nav-bar class="home-nav">
          <div slot="center">购物街</div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Home',
  data () {
    return {
      
    };
  },
  components: {
      NavBar
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
    .home-nav {
        background-color: #ff8198;
        color: #fff;
    }
</style>