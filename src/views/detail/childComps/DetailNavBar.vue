<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <span v-for="(item, index) in titles" 
              :key="index"
              :class="{active: currentIndex === index}"
              @click="titleClick(index)">
                  {{item}}
              </span>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar  from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评价', '推荐'],
      currentIndex: 0
    };
  },
  components: {
      NavBar
  },
  methods: {
      titleClick(index) {
          this.currentIndex = index
          this.$emit('titleClick', index)
      },
      backClick() {
          this.$router.back()
      }
  }
}
</script>

<style scoped>
.back{
    margin-top: 5px;
}
.title{
    display: flex;
    font-size: 14px;
}
.title span {
    flex: 1;
}
.active {
    color: #ff5777;
}
</style>