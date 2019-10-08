<template>
  <div class="index">
    <div>
      <vuexOne></vuexOne>
      <vuexTwo></vuexTwo>
    </div>

  </div>
</template>

<script>
import vuexOne from '../components/vuexDemo/vuexOne'
import vuexTwo from '../components/vuexDemo/vuexTwo'
export default {
  name: 'HelloWorld',
  components: {
    vuexOne,
    vuexTwo
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
