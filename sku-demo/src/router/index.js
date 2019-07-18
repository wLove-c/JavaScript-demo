import Vue from 'vue'
import Router from 'vue-router'
import skuDemo from '@/components/skuDemo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'skuDemo',
      component: skuDemo
    }
  ]
})
