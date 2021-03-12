<template>
  <div id="box">
    <div id="myChart"></div>
    <div id="text-box">
      <select id="selector" @change="changeTo()">
        <option>关系图</option>
        <option>力引导图</option>
        <option>环形关系图</option>
      </select>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'

let myChart;
let savedgraph;
const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

//目前存有三种模式，后续迭代将加入更多表现模式
//1.关系图
let option1;
//2.力引导图
let option2;
//3.环形关系图
let option3;

export default {
  name: "KG",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表

      myChart.showLoading();
      $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
        myChart.hideLoading();
        //保存原始数据
        savedgraph = JSON.parse(JSON.stringify(graph))

        //初始设置为option1
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize > 30
          };
        });
        option1 = {
          tooltip: {},
          legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'none',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        };
        myChart.setOption(option1);

        //预存option2
        graph = JSON.parse(JSON.stringify(savedgraph))
        graph.nodes.forEach(function (node) {
          node.symbolSize = 5;
        });
        option2 = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          series: [
            {
              draggable: true,
              name: 'Les Miserables',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right'
              },
              force: {
                repulsion: 100
              }
            }
          ]
        };

        //预存option3
        graph = JSON.parse(JSON.stringify(savedgraph))
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize > 30
          };
        });
        option3 = {
          title: {
            text: 'Les Miserables',
            subtext: 'Circular layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [{
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'circular',
              circular: {
                rotateLabel: true
              },
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        };
      });
    },

    changeTo() {
      let index=document.getElementById("selector").selectedIndex+1;
      console.log(index)
      myChart.clear();
      switch (index) {
        case 1:
          myChart.setOption(option1);
          break;
        case 2:
          myChart.setOption(option2);
          break;
        case 3:
          myChart.setOption(option3);
          break;
      }
    }

  }
}
</script>

<style scoped>
#box {
  display: flex;
  width: 100%;

}

#myChart {
  width: 70%;
  height: 500px;
  border: 1px solid rgba(200, 200, 200, 0.75);
  border-radius: 10px;
  margin-left: 30px;
}

#text-box {
  width: 24%;
  height: 500px;
  border: 1px solid rgba(200, 200, 200, 0.75);
  border-radius: 10px;
  margin-left: 20px;
}
</style>