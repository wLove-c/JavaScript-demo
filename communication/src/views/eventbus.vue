<template>
  <div class="index">
    <div>
      <eventBusOne></eventBusOne>
      <eventBusTwo></eventBusTwo>
    </div>

  </div>
</template>

<script>
import eventBusOne from '../components/eventBusDemo/eventBusOne'
import eventBusTwo from '../components/eventBusDemo/eventBusTwo'
export default {
  name: 'EventBus',
  components: {
    eventBusOne,
    eventBusTwo
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
