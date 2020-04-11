<template>
  <div class="toast"  v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      
    };
  },
  props:{
      message: {
          type: String,
          default: ''
      },
      isShow: {
          type: Boolean,
          default: false
      }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    border-radius: 5px;
}
</style>