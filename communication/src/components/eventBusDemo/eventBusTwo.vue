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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.eventBusTwo{
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
