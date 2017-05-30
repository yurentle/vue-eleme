<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
}

html,body{
  width: 100%;
  user-select: none;
  background-color: #f4f4f4;
}
.el-rate__item .el-rate__icon{
  font-size: 10px;
}
#app {
  width: 100%;
  overflow: hidden;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.1);
}

[v-cloak] {
  display: none;
}


</style>
