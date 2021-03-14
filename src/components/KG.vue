<template>
  <div id="box">
    <div id="myChart">
    </div>
    <div id="text-box">
      <div id="selector-box">
        <div>样式选择:</div>
        <el-select id="selector" v-model="value" @change="changeTo" placeholder="关系图">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadImg">下载Img</el-button>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadJson">下载Json</el-button>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadXml">下载Xml</el-button>
      <!--      暂时不引入后端接口-->
      <el-upload
          action=""
          :on-change="analysis"
      >
        <el-button type="primary" plain icon="el-icon-upload">导入知识图谱</el-button>
        <div slot="tip">只能导入json文件，且需符合格式</div>
      </el-upload>

    </div>
  </div>
</template>


<script>
import $ from 'jquery'

let myChart;
let savedgraph;
const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/les-miserables.json';

//目前存有三种模式，后续迭代将加入更多表现模式
//1.关系图
let option1;
//2.力引导图
let option2;
//3.环形关系图
let option3;

let localFile;

export default {
  name: "KG",
  data() {
    return {
      options: [{
        value: '1',
        label: '关系图'
      }, {
        value: '2',
        label: '力引导图'
      }, {
        value: '3',
        label: '环形关系图'
      }],
      value: '',
    }
  },
  mounted() {
    this.initdata(ROOT_PATH)
  },
  methods: {
    initdata() {
      // 初始化echarts实例
      var that = this
      myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.showLoading();
      $.getJSON(ROOT_PATH, function (graph) {
        myChart.hideLoading();
        //保存原始数据
        savedgraph = JSON.parse(JSON.stringify(graph))
        that.initpage()
      });
    },

    initpage() {
      //初始设置为option1
      let graph = JSON.parse(JSON.stringify(savedgraph))
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
        ],

        toolbox: {
          id: 'pie-chart',
          itemSize: 15,
          itemGap: 10,
          right: 10,

          feature: {
            dataView: {
              show: true,
            },

            restore: {
              show: true,
            }
          }
        }
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

      console.log(option1.toString());

      myChart.on('click', 'series.graph', function (e) {
        console.log(e);
        // var targetId = e.data.id;

        var opt = myChart.getOption();

        console.log(opt);


      });
    },

    changeTo(value) {
      console.log(value)
      myChart.clear();
      switch (value) {
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
    },

    analysis(event) {
      var that = this
      localFile = event.raw
      let reader = new FileReader()
      reader.readAsText(localFile);
      reader.onload = () => {
        savedgraph = JSON.parse(reader.result)
        console.log(savedgraph)
        that.initpage()
      }
    },

    downloadImg() {
      var img = new Image();
      img.src = myChart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        excludeComponents: ['toolbox']
      })
      var a = document.createElement('a');
      var e = new MouseEvent('click');
      a.download = this.$data.value || "knowledge-graph.png";
      a.href = img.src;
      a.dispatchEvent(e);
    },

    downloadJson(){
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedgraph));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "knowledge-graph" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },

    downloadXml(){

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
  border: 1px solid rgba(140, 138, 138, 0.25);
  border-radius: 10px;
  margin-left: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#text-box {
  width: 24%;
  height: 80vh;
  border: 1px solid rgba(140, 138, 138, 0.25);
  border-radius: 10px;
  margin-left: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#selector-box {
  display: flex;
  flex-direction: row;
  text-align: center;
}

</style>