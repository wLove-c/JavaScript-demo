<template>
<div class="props">
  <propsOne></propsOne>
</div>
</template>

<script>
import propsOne from '../components/propsDemo/propsOne'

export default {
  name: 'Props',
  components: {
    propsOne
  },
  data () {
    return {
      count: 1
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>

</style>
