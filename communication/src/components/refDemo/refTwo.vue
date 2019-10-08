<template>
  <div class="refTwo">
    <div class="add-count-button-box">
      <div>我是refTwo组件的count ==== {{count}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefTwo',
  data () {
    return {
      count: 1000
    }
  },
  methods: {
    getCount () {
      console.log('refTwo========', this.$parent) // refOne
      console.log('refTwo========', this.$children) // []
      return this.count
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refTwo{
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
