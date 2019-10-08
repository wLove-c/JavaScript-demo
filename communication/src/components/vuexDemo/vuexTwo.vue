<template>
  <div class="vuexTwo">
    <div class="vuex-two-box">
      <div>我是vuexTwo组件：</div>
      <div class="show-count">{{ getCount}}</div>
    </div>

  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import qs from 'qs'
export default {
  name: 'VuexTwo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    // ...mapGetters(['getCount']),  // 辅助函数方式使用，需要组件import {mapGetters} from 'vuex'
    getCount () {
      return this.$store.getters.getCount
    }
  },
  mounted () {
    console.log(qs.stringify({a: 1, b: 2, c: 3}))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vuex-two-box{
  display: flex;
  justify-content: center;
  align-items: center;
.show-count{
  font-size: 40px;
}
}

</style>
