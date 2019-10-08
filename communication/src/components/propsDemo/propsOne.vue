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
<style lang="scss" scoped>
.propsOne{
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
