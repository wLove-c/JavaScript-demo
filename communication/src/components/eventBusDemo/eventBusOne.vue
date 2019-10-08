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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.eventBusOne{
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
