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
<style lang="scss" scoped>
.propsTwo{
  display: flex;
  align-items: center;
  justify-content: center;
  .state{
    margin-left:12px;
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
