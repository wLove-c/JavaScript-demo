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
      this.count = this.$refs.refOne.count
    }
  }
}
</script>
<style lang="scss" scoped>
 .add-count-button{
    height: 30px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    background: #706c70;
    border-radius: 15px;
    color: #ffffff;

  }
</style>
