import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  actions: {
    addCart(content, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = content.state.cartList.find(item => item.iid == payload.iid)
        if (oldProduct) {
          oldProduct.count += 1
          resolve('商品数量+1')
        } else {
          payload.count = 1
          payload.checked = true
          content.state.cartList.push(payload)
          resolve('添加了新的商品')
        }
      })
    }
  }
})

export default store
