<template>
  <div id="box">
    <div id="myChart">
    </div>
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
          tooltip: {
            position: 'right',
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
          },
          //图例
          legend: [{
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quadraticIn',
          series: [
            {
              type: 'graph',
              //不采用任何布局
              layout: 'none',
              //关闭悬停图例高亮
              legendHoverLink: false,
              //节点大小不随鼠标缩放而缩放
              nodeScaleRatio: 0,
              //开启鼠标缩放和漫游
              roam: true,
              //边两端的标记
              edgeSymbol: ['none', 'arrow'],
              //边两端的标记大小
              edgeSymbolSize: 5,
              //悬停时鼠标样式
              cursor: 'pointer',

              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,

              label: {
                position: 'right',
                formatter: '{b}'
              },

              lineStyle: {
                color: 'source',
                curveness: 0.3
              },

              emphasis: {
                scale: true,
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
          node.label = {
            show: node.symbolSize > 30
          };
          node.symbolSize = 5;
        });
        option2 = {
          tooltip: {
            position: 'right',
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
          },
          //图例
          legend: [{
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          series: [
            {
              //当前视角的缩放比例
              zoom: 2,
              //是否可拖动
              draggable: true,
              type: 'graph',
              //类型为力引导图
              layout: 'force',

              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,

              //开启鼠标缩放和漫游
              roam: true,
              label: {
                position: 'right'
              },
              force: {
                //斥力
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
          tooltip: {
            position: 'right',
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
          },
          //图例
          legend: [{
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
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
      let index = document.getElementById("selector").selectedIndex + 1;
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
  height: 80vh;
  border: 1px solid rgba(200, 200, 200, 0.75);
  border-radius: 10px;
  margin-left: 30px;
}

#text-box {
  width: 24%;
  height: 80vh;
  border: 1px solid rgba(200, 200, 200, 0.75);
  border-radius: 10px;
  margin-left: 20px;
}

</style>