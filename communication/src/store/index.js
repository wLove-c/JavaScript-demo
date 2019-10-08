import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * 状态树
 */
const state = {
  count: 0
}

/**
 * 和组件计算属性一样， store 的计算属性
 * getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
 */
const getters = {
  getCount (state) {
    return state.count || 0
  }
}

/**
 * Vuex 中的 mutation 非常类似于事件：
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
 */
const mutations = {
  mutaCount (state, payload) {
    state.count = state.count + 1
  }

}
/**
 * Action 类似于 mutation，不同在于：
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 */
const actions = {
  actCount ({commit}, payload) {
    commit('mutaCount', payload)
  }
}

const store = new Vuex.Store(
  {
    state,
    getters,
    mutations,
    actions
  }
)

export default store
