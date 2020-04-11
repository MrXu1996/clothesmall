<template>
  <div class="bottom-bar">
    <div class="check-contetn">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: ￥{{totalPrice}}</div>
    <div class="caclulate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton";

export default {
  name: "",
  data() {
    return {};
  },
  components: {
    checkButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      // return  this.$store.state.cartList.filter(item => item.checked).length
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  background-color: #eee;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: 44px;
  display: flex;
  font-size: 14px;
}
.check-contetn {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.caclulate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>