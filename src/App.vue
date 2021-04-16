<template>
  <div id="app">
    <h1>知识图谱可视化系统</h1>
    <KG/>
    <h6 id="tools">KG666小组呈现</h6>
  </div>
</template>

<script>
import KG from './components/KG.vue'

export default {
  name: 'App',
  components: {
    KG
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#tools{
  margin-top: 10px;
}
</style>
