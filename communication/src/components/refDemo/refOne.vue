<template>
  <div class="refOne">
    <refTwo ref="refTwo"></refTwo>
    <refTwo></refTwo>
  </div>
</template>

<script>
import refTwo from './refTwo'
export default {
  name: 'RefOne',
  components: {
    refTwo
  },
  data () {
    return {
      count: 2
    }
  },
  methods: {
    getCount () {
      console.log('refOne========', this.$parent) // refOne
      console.log('refOne========', this.$children) // [refTwo,refTwo]
      return this.$refs.refTwo.getCount()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refOne{
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
