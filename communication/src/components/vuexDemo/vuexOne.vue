<template>
  <div class="vuexOne">
    <div class="add-count-button-box">
      <div>我是vuexOne组件：</div>
      <div class="add-count-button" @click="addCount">state++</div>
    </div>

  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'VuexOne',
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    // ...mapActions(['actCount']), // 辅助函数方式使用，需要组件import {mapActions} from 'vuex'
    addCount () {
      // this.actCount()
      this.$store.dispatch('actCount')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vuexOne{
  .add-count-button-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-count-button{
    width: 100px;
    height: 30px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    background: #706c70;
    border-radius: 15px;
    color: #ffffff;

  }
}
</style>
