import Vue from 'vue'
import Router from 'vue-router'
import SkuDemo from '@/components/SkuDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SkuDemo',
      component: SkuDemo
    }
  ]
})
