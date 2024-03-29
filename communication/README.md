# communication

> A Vue.js project

## Build Setup

``` bash
cd  ./communication

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
@[TOC](vue组件之间如何通信？vue通信的多种方式)
### 前言:
> 写在前面: vue已经更新到V2.6.10版本(相信很快就会出3.0版本)，相信我们也遇到了需要组件之间通信的需求，除了主流的[vuex](https://vuex.vuejs.org/zh/)状态管理模式，还有哪些方式解决组件之间的通信的问题，接下来就由我一一介绍给大家；

![镇楼图](https://upload-images.jianshu.io/upload_images/11447772-c566955a5b42bfb5.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 一、vuex状态管理模式
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式（）。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。具体介绍请转[vuex](https://vuex.vuejs.org/zh/)；
#### 其数据流向如下:

![数据流向](https://upload-images.jianshu.io/upload_images/11447772-2976a11f26c318d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 使用:
- [安装](https://vuex.vuejs.org/zh/installation.html)

```javascript
// cdn
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>

// npm 
npm install vuex --save

//yarn 
yarn add vuex

```
- 使用
```javascript
//  /src/store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
```javascript
//  /src/store.js
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
```
```javascript
// src/main.js
...
import store from './store'


/* eslint-disable no-new */
new Vue({
  ...
  store,
  ...
})
```
以上已经把vuex注入到vue实例；

组件中使用
```
// src/components/vuexOne.vue
//...
methods: {
    // ...mapActions(['actCount']), // 辅助函数方式使用，需要组件import {mapActions} from 'vuex'
    addCount () {
      // this.actCount()
      this.$store.dispatch('actCount')
    }
  }
//...

```
```
// src/components/vuexTwo.vue
//...
computed: {
    // ...mapGetters(['getCount']),  // 辅助函数方式使用，需要组件import {mapGetters} from 'vuex'
    // 常规方式使用
    getCount () {
      return this.$store.getters.getCount
    }
  }
//...

```
此时: 触发vuexOne.vue的addCount时间，vuexTwo.vue的页面能改更新；这就是vuex的简单使用；如需了解 **模块module** 及其他 **辅助函数** 等可以阅读文档[vuex](https://vuex.vuejs.org/zh/installation.html)

效果如下:
![vuex.gif](https://upload-images.jianshu.io/upload_images/11447772-71dcd4e50da94b6d.gif?imageMogr2/auto-orient/strip)


> 总结:  **Action和Mutation两者的功能很相似** ，并且很多时候，我们只需要在组件中通过this.$store.commit('xxx') 或者 mapMutations辅助函数来使用 **Mutation** 直接更新state的数据，而不需要通过 **Action** 这一步，但 **Action** 和 **Mutation** 有个非常大的区别就是:  **Mutation 必须是同步函数（因为mutation 中混合异步调用会导致你的程序很难调试，所以在此限制为只能进行同步），而Action 可以包含任意异步操作** 。

### 二、EventBus
**EventBus** 的实现原理是通过一个空的vue实例作为事件中心，通过它来触发事件(\$emit) 和监听事件(\$on), 巧妙而轻量地实现了任何组件间的通信; (适合少而小的项目使用，如果有大量通信，依旧推荐vuex)

#### 使用:
首先在utils创建一个新的vue实例，用作 **事件中心** 
```
// utils/eventbus.js
...
import Vue from 'vue'

export default new Vue({
  name: 'EventBus'
})
```

#### eventBusOne组件引入:
```
<template>
  <div class="eventBusOne">
    <div class="add-count-button-box">
      <div>我是eventBusOne组件：</div>
      <div class="add-count-button" @click="addCount">state++</div>
    </div>
  </div>
</template>
<script>
import eventBus from '../../../utils/eventBus'
export default {
  name: 'EventBusOne',
  data () {
    return {
      count: 1
    }
  },
  methods: {
    addCount () {
      this.count += 1
      eventBus.$emit('data-count', this.count)
    }
  }
}
</script>

```
#### eventBusTwo组件监听:
```
<template>
  <div class="eventBusTwo">
    <div class="add-count-button-box">
      <div>我是eventBusTwo组件：</div>
      <div>{{count}}</div>
    </div>

  </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
  name: 'EventBusTwo',
  data () {
    return {
      count: 1
    }
  },
  computed: {

  },
  mounted () {
    eventBus.$on('data-count', data => {
      this.count = data
    })
  }
}
</script>
```
#### 效果如下：
![eventBus.gif](https://upload-images.jianshu.io/upload_images/11447772-6b6043faf396081c.gif?imageMogr2/auto-orient/strip)

> 总结: eventBus **原理** 是利用一个空的vue实例当做一个事件中心，通过其分发及监听事件来传递数据，也可以实现任何组件间的通信，包括父子、兄弟、跨级等。但当使用过多容易造成命名冲突，因此不利于大项目使用(当大项目使用时，依旧推荐vuex)

----------
> ps：以上是目前使用比较多的可以跨组件包括兄弟组件通信的方法，接下来讲其他有短板的方法，有兴趣的可以花几分钟继续往下了解，否则客官可以止步于此，以免浪费您宝贵的时间 ...

-----------

### 三、使用最多之 props与$emit

> props 由父组件A往子组件B传递数据，当然还可以继续组件B仍然可以往C组件(A的孙组件)继续往下传递，

#### 使用 propsOne(父组件)
```
<template>
<div class="propsOne">
    <div class="add-count-button-box">
      <div>我是propsOne组件：</div>
      <div class="add-count-button" @click="addCount">count++</div>
      <div class="add-count-button" @click="addState">state++</div>
    </div>
  <propsTwo v-model="count" :state="state" @addCount="twoAddCount" @addState="twoAddState"></propsTwo>
</div>
</template>

<script>
import propsTwo from './propsTwo'
export default {
  name: 'PropsOne',
  components: {
    propsTwo
  },
  data () {
    return {
      count: 1,
      state: 1
    }
  },
  methods: {
    addCount () {
      this.count += 1
    },
    addState () {
      this.state += 1
    },
    twoAddCount (value) {
      this.count = value
    },
    twoAddState (value) {
      this.state = value
    }
  }
}

</script>
```

#### 使用 propsTwo(子组件)
```
<template>
<div class="propsTwo">
  <div>count:{{value}}</div>
  <div class="state">state:{{state}}</div>
  <div>我是 propsTwo组件: </div>
  <div class="add-count-button" @click="addCount">count++</div>
  <div class="add-count-button" @click="addState">state++</div>
</div>
</template>

<script>
export default {
  name: 'PropsTwo',
  props: {
    value: {
      type: Number,
      default: 1
    },
    state: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  methods: {
    addCount () {
      let count = this.value
      count++
      this.$emit('addCount', count)
    },
    addState () {
      let state = this.state
      state++
      this.$emit('addState', state)
    }
  }
}
</script>
```
#### 效果如下：
![props.gif](https://upload-images.jianshu.io/upload_images/11447772-984e7d401b864602.gif?imageMogr2/auto-orient/strip)

> 总结: props是单向数据流，即只能从父级传到子级，子级改变，父级的值不会改变(用.sync修饰符修饰可以实现双向数据绑定)，但v-model是双向数据流，即双向绑定，子级改变这个值时，父级也会跟着改变；$emit传值和上面第二种的eventbus的原理一致，不过是事件分发到父级，父级可以监听；[想了解sync修饰符请转vue.org](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

### 四、$refs  、$parent、$children
> ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件

实例:
```
// ref.vue
<template>
<div class="ref">
 <div class="add-count-button" @click="getCount">
     获取refTwo的count，其值为：{{count}}
  </div>
  <refOne ref="refOne"></refOne>

</div>
</template>

<script>
import refOne from '../components/refDemo/refOne'
export default {
  name: 'Props',
  components: {
    refOne
  },
  data () {
    return {
      count: ''
    }
  },
  methods: {
    getCount () {
      console.log('ref========', this.$parent) // Vue
      console.log('ref========', this.$children) // refOne
      this.count = this.$refs.refOne.getCount()
    }
  }
}
</script>
```
```
// refOne
<template>
  <div class="refOne">
    <refTwo ref="refTwo"></refTwo>
    <refTwo></refTwo>
  </div>
</template>

<script>
import refTwo from './refTwo'
export default {
  name: 'RefOne',
  components: {
    refTwo
  },
  data () {
    return {
      count: 2
    }
  },
  methods: {
    getCount () {
      console.log('refOne========', this.$parent) // refOne
      console.log('refOne========', this.$children) // [refTwo,refTwo]
      return this.$refs.refTwo.getCount()
    }
  }
}
</script>
```
```
// refTwo
<template>
  <div class="refTwo">
    <div class="add-count-button-box">
      <div>我是refTwo组件的count ==== {{count}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefTwo',
  data () {
    return {
      count: 1000
    }
  },
  methods: {
    getCount () {
      console.log('refTwo========', this.$parent) // refOne
      console.log('refTwo========', this.$children) // []
      return this.count
    }
  }
}
</script>
```
> 从上面的操作可知，通过ref调用子组件的方法，可以把相应的数据传导到父级；

> 特别地 \$children拿到的当前实例的直接子组件。需要注意 \$children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。


> \$parent、\$children 从上述的打印，依旧可以发现\$parent、\$children能拿到当前组件的父级或者子级组件实例，如果有多个，则为数组，如果为空，则为空数组，如果通过这个实例去拿相应的属性或者方法也是可行的 如下:

```
// ref
methods: {
    getCount () {
      console.log('ref========', this.$parent) // Vue
      console.log('ref========', this.$children) // refOne
      this.count = this.$refs.refOne.count  // count 为 refOne的data里面的count ===2
    }
  }
```
[ref请转vue.org](https://cn.vuejs.org/v2/api/#ref)
[\$parent请转vue.org](https://cn.vuejs.org/v2/api/#vm-parent)
[\$children请转vue.org](https://cn.vuejs.org/v2/api/#vm-children) 


### 其他 
如: provide与inject  

> provide 和 inject (Vue2.2.0新增API) 绑定 并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。 
[provide与inject 转vue.org](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)



如: \$attrs/ \$listeners

> \$attrs/ \$listeners（Vue2.4增加） 版本在普通组件中，没有被定义为 prop 的特性会自动添加到组件的根元素上，将已有的同名特性进行替换或与其进行[智能合并](https://cn.vuejs.org/v2/guide/class-and-style.html)。
[ \$attrs/ \$listeners转vue.org](https://cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8%E7%89%B9%E6%80%A7%E7%BB%A7%E6%89%BF)


### 总结:
万能通信: vuex、eventBus （无论是父级，兄弟，还是无关系组件皆可以通信）
父子通信:\$refs 、 \$parent、 \$children、 provide/inject 、 \$attrs/ \$listeners； 

本文Demo请转 [wLove-c](https://github.com/wLove-c/JavaScript-demo)
楼主博客请转 [王一诺](https://wlove-c.github.io/)




