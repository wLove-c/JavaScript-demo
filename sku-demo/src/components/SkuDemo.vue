<template>
  <div class="sku-demo">

  </div>
</template>

<script>
export default {
  name: 'SkuDemo',
  data () {
    return {
      arr: [
        {
          skuName: '1',
          skuValuePOS: [
            { value: '1' },
            { value: '2' },
          ]
        },
        {
          skuName: '2',
          skuValuePOS: [
            { value: '4' },
            { value: '5' },
          ]
        },
        {
          skuName: '3',
          skuValuePOS: [
            { value: '8' },
            { value: '9' },
          ]
        }
      ],
      listData:[]
    }
  },
  created () {
    this.createDikaer()
  },
  methods: {
    createDikaer(){
      let list = this.arr
      this.listData = this.formatData(list)
    },
    formatData (list) {
      let allArr = []
      this.doCombination(allArr,list,)
      return allArr
    },
    doCombination ( allArr, list, index=0,arr=[] ) {
      if (!list[0]) {
        allArr = []
        return
      }
      list[index].skuValuePOS.map((item) => {
        let obj = [{
          skuName:list[index].skuName||'',
          value:item.value||''
        }]
        let newArr =[...arr,...obj]
        if (list[index + 1]) {
          this.doCombination(allArr, list, index + 1, newArr)
        } else {
          allArr.push(newArr)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
