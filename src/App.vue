<template>
  <div id="app">
    <h1>知识图谱可视化系统</h1>
    <h4 id="tools">Echarts+Vue+SpringBoot+Neo4j</h4>
    <KG/>
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
  margin-top: -20px;
}
</style>
