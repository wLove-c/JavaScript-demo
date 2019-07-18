<template>
  <div id="app">
    <div id="loader">
      <div id="top"></div>
      <div id="bottom"></div>
      <div id="line"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
#app {
  body {
    background: #0b7286;
  }
  #loader {
    animation: loader 3s cubic-bezier(0.7, 0, 0.2, 1) infinite;
    height: 40px;
    width: 41px;
    position: absolute;
    top: 20%;
    left: 50%;
    margin: -20px 0px 0px -20px;
  }
  @keyframes loader {
    90% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  #loader #top {
    animation: top 3s linear infinite;
    border-top: 20px solid #f57323;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    height: 0px;
    width: 1px;
    transform-origin: 50% 100%;
  }
  @keyframes top {
    90% {
      transform: scale(0);
    }
    100% {
      transform: scale(0);
    }
  }
  #loader #bottom {
    animation: bottom 3s linear infinite;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #f57323;
    border-left: 20px solid transparent;
    height: 0px;
    width: 1px;
    transform: scale(0);
    transform-origin: 50% 100%;
  }
  @keyframes bottom {
    10% {
      transform: scale(0);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
  #loader #line {
    animation: line 3s linear infinite;
    border-left: 1px solid #f57323;
    height: 0px;
    width: 0px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  @keyframes line {
    10% {
      height: 20px;
    }
    100% {
      height: 20px;
    }
  }
}
</style>
