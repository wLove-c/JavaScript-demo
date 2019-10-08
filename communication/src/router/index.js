import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import eventbus from '@/views/eventbus'
import props from '@/views/props'
import ref from '@/views/ref'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/eventbus',
      name: 'eventbus',
      component: eventbus
    },
    {
      path: '/props',
      name: 'props',
      component: props
    },
    {
      path: '/ref',
      name: 'ref',
      component: ref
    }
  ]
})
