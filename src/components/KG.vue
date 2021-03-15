<template>
  <div id="box">
    <div id="myChart"></div>

    <div id="text-box">
      <div id="selector-box">
        <div>样式选择:</div>
        <el-select id="selector" v-model="value" @change="changeTo">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadImg" id="downimg">下载Img</el-button>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadJson" id="downjson">下载Json</el-button>
      <el-button type="primary" plain icon="el-icon-download" @click="downloadXml" id="downxml">下载Xml</el-button>
      <!--      暂时不引入后端接口-->
      <el-upload
          action=""
          :on-progress="initpage"
          :before-upload="beforeJSONUpload"
      >
        <el-button id="upload_button" type="primary" plain icon="el-icon-upload">导入知识图谱</el-button>

      </el-upload>
      <el-button type="text" id="tip" @click="dialogVisible = true">导入须知</el-button>
      <el-dialog
          title="导入须知"
          :visible.sync="dialogVisible"
          width="30%">
        <span>目前只支持json文件。<br/>json对象中必须包含nodes，links，categories三个属性。<br/>每一个node须包含name，symbolSize，category属性。<br/>每一个link须包含source，target属性。<br/>每一个category须包含name属性。
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button id="tipclose" type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-popover
              ref="popover1"
              placement="left"
              trigger="click"
      >
        <el-table max-height="250" v-if="selectedType==='edge'" :data="selectedItem">
          <el-table-column width="100" property="source" label="source">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.source}}</div>
              <el-input v-else v-model="scope.row.source"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100" property="target" label="target">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.target}}</div>
              <el-input v-else v-model="scope.row.target" ></el-input>
            </template>
          </el-table-column>
          <el-table-column width="250" label="option">
            <template slot-scope="scope">
              <el-button v-if="!editable" @click="startEdit(scope.row, 'edge')">编辑</el-button>
              <el-button v-if="editable" @click="handleEdit(scope.row, 'edge')">确认</el-button>
              <el-button v-if="editable" @click="editable=false">取消</el-button>
              <el-button @click="deleteEdge(scope.row, 'edge')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table max-height="250" v-if="selectedType==='node'" :data="selectedItem">
          <el-table-column width="100" property="id" label="id">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.id}}</div>
              <el-input v-else v-model="scope.row.id"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150" property="name" label="name">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.name}}</div>
              <el-input v-else v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100" property="category" label="category">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.category}}</div>
              <el-input v-else v-model="scope.row.category"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200" property="symbolSize" label="symbolSize">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.symbolSize}}</div>
              <el-input v-else v-model="scope.row.symbolSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150" property="value" label="value">
            <template slot-scope="scope">
              <div v-if="!editable">{{scope.row.value}}</div>
              <el-input v-else v-model="scope.row.symbolSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="250" label="option">
            <template slot-scope="scope">
              <el-button v-if="!editable" @click="startEdit(scope.row, 'node')">编辑</el-button>
              <el-button v-if="editable" @click="handleEdit(scope.row, 'node')">确认</el-button>
              <el-button v-if="editable" @click="editable=false">取消</el-button>
              <el-button @click="deleteNode(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
      <el-button type="primary" plain v-popover:popover1>查 看 数 据</el-button>

      <el-button type="primary" plain @click="addNodeVisible =true">添加节点</el-button>
      <el-form v-if="addNodeVisible" :inline="true">
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-button type="primary" plain @click="addEdgeVisible = true">添加边</el-button>
      <el-form v-if="addEdgeVisible" :inline="true">
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-form>


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


export default {
  name: "KG",
  data() {
    return {
      options: [{
        value: 1,
        label: '关系图'
      }, {
        value: 2,
        label: '力引导图'
      }, {
        value: 3,
        label: '环形关系图'
      }],
      value: '',
      dialogVisible: false,
      editable: false,
      selectedType: '',
      selectedItem: [],
      input: {},
      nowOption:1,
      addNodeVisible: false,
      addEdgeVisible: false,
    }
  },

  mounted() {
    this.initdata()
  },

  methods: {
    initdata() {
      // 初始化echarts实例
      let that = this
      $(document).ready(function() {

        let echarts = require('echarts');

        myChart = echarts.init(document.getElementById('myChart'))
        myChart.showLoading();
        $.getJSON(ROOT_PATH, function (graph) {
          myChart.hideLoading();
          //保存原始数据
          savedgraph = JSON.parse(JSON.stringify(graph))
          that.initpage()
        });


        myChart.on('click', 'series.graph', function (event) {
          console.log(event);
          that.selectedItem.length = 0;
          let opt = myChart.getOption();
          let id = event.dataIndex;
          console.log(opt);
          switch (event.dataType) {
            case 'node':
              that.selectedType = 'node';
              that.selectedItem.push(opt.series[0].data[id]);
              that.selectedItem[0].index = id;
              break;
            case 'edge':
              that.selectedType = 'edge';
              that.selectedItem.push(opt.series[0].links[id]);
              that.selectedItem[0].index = id;
              break;
            default:
              break;
          }
        })
      })
    },

    initpage() {

      $("#selector").val('关系图');

      //初始设置为option1
      let graph = JSON.parse(JSON.stringify(savedgraph))
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize >= 30
        };
      });
      graph.links.forEach(function (link) {
        if(link.name==="dot"){
          link.lineStyle={type:'dotted'}
        }
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
              curveness: 1,
              width:2,
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
          show: node.symbolSize >= 30
        };
      });
      graph.links.forEach(function (link) {
        if(link.name==="dot"){
          link.lineStyle={type:'dotted',width:'2'}
        }
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
          show: node.symbolSize >= 30
        };
      });
      graph.links.forEach(function (link) {
        if(link.name==="dot"){
          link.lineStyle={type:'dotted',width:'2'}
        }
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
        // let targetId = e.data.id;

        let opt = myChart.getOption();

        console.log(opt);


      });
    },

    changeTo(value) {
      var that=this
      $(document).ready(function() {
        console.log(value)
        myChart.clear();
        switch (value) {
          case 1:
            myChart.setOption(option1);
            that.nowOption=1;
            break;
          case 2:
            myChart.setOption(option2);
            that.nowOption=2;
            break;
          case 3:
            myChart.setOption(option3);
            that.nowOption=3;
            break;
        }
      })
    },

    beforeJSONUpload(file) {

      //判断是否为json文件
      const isJSON = file.type === 'application/json';
      if (!isJSON) {
        this.$message.error('上传文件只能是 JSON 格式!');
        return false
      } else {
        //读取json文件并存入tmpjson
        let reader = new FileReader()
        let tmpjson
        reader.readAsText(file);
        reader.onload = () => {
          tmpjson = JSON.parse(reader.result)
          console.log(tmpjson)

          //判断是否为符合格式的json文件
          if (!('nodes' in tmpjson)) {
            this.$message.error('内容格式错误!(无nodes属性)');
            return false
          }
          if (!('links' in tmpjson)) {
            this.$message.error('内容格式错误!(无links属性)');
            return false
          }
          if (!("categories" in tmpjson)) {
            this.$message.error('内容格式错误!(无categories属性)');
            return false
          }
          //links是否都包含了source和target
          for (let i = 0; i < tmpjson.links.length; i++) {
            let prop = tmpjson.links[i]
            if (!('source' in prop) || !('target' in prop)) {
              this.$message.error('内容格式错误!(links是否都包含了source/target属性)');
              return false
            }
          }
          //nodes是否都包含了name/symbolSize/category
          for (let i = 0; i < tmpjson.nodes.length; i++) {
            let prop = tmpjson.nodes[i]
            if (!('name' in prop) || !('symbolSize' in prop) || !('category' in prop)) {
              this.$message.error('内容格式错误!(nodes是否都包含了name/symbolSize/category属性)');
              return false
            }
          }
          //判断nodes是否有x,y值,否则随机
          if (!('x' in tmpjson.nodes[0]) || !('y' in tmpjson.nodes[0])) {
            this.$message.info('检查到nodes中未包含x/y值,正在随机设置')
            for (let i = 0; i < tmpjson.nodes.length; i++) {
              let prop = tmpjson.nodes[i]
              prop.x = 100 * Math.random()
              prop.y = 100 * Math.random()
            }
          }

          savedgraph = JSON.parse(JSON.stringify(tmpjson))
        }
      }
      return true
    },

    downloadImg() {
      $(document).ready(function() {
        let img = new Image();
        img.src = myChart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          excludeComponents: ['toolbox']
        })
        let a = document.createElement('a');
        let e = new MouseEvent('click');
        a.download =  "knowledge-graph.png";
        a.href = img.src;
        a.dispatchEvent(e);
      })
    },

    downloadJson(){
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedgraph));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "knowledge-graph" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },

    downloadXml(){
      console.log(savedgraph)
      let a = savedgraph;
      let c = document.createElement("resources");
      let t = function (v) {
        return {}.toString.call(v).split(' ')[1].slice(0, -1).toLowerCase();
      };
      let f = function (f, c, a, s) {

        if (t(a) != "array" && t(a) != "object") {
          if (t(a) != "null") {
            c.appendChild(document.createTextNode(a));
          }
        } else {
          for (let k in a) {
            let v = a[k];
            if (k == "ki" && t(a) == "object") {
              c.setAttribute("__pi", v);
            } else {
              if (t(v) == "object") {
                let cd = c.appendChild(document.createElementNS(null, s ? "bh" : "string"));
                f(f, cd, v);
              } else if (t(v) == "array") {
                let ce = c.appendChild(document.createElementNS(null, s ? "ni" : "string"));
                f(f, ce, v, true);
              } else {
                let va = document.createElementNS(null, s ? "ki" : "string");
                if (t(v) != "null") {
                  va.appendChild(document.createTextNode(v));
                }
                let cf = c.appendChild(va);
                cf.setAttribute("name", k);
              }
            }
          }
        }
      };
      f(f, c, a, t(a) == "array");
      let xml = '<?xml version="1.0" encoding="utf-8"?>' + c.outerHTML;
      let filename = "knowledge-graph.xml";
      let pom = document.createElement('a');
      let bb = new Blob([xml], {type: 'text/plain'});
      pom.setAttribute('href', window.URL.createObjectURL(bb));
      pom.setAttribute('download', filename);
      pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
      pom.draggable = true;
      pom.classList.add('dragout');
      pom.click();
    },

    handleEdit(row, mode) {
      console.log(row, mode);
      console.log(this.selectedItem);
      this.editable = false;
    },

    startEdit(row, mode) {
      let that = this;
      that.input = {};
      console.log(row, mode);
      console.log(this.selectedItem);

      // if (mode === 'node') {
      //   that.input.id = row.id;
      //   that.input.name = row.name;
      //   that.input.category = row.category;
      //   that.input.symbolSize = row.symbolSize;
      //   that.input.value = row.value;
      // }
      // else if (mode === 'edge') {
      //   that.input.source = row.source;
      //   that.input.target = row.target;
      // }
      that.editable = true;
    },

    deleteNode(row) {
      console.log(row);
    },

    deleteEdge(row) {
      console.log(row);
    },

    addNode() {
      console.log("sdad");
    },

    addEdge() {
      console.log("addd");
    },
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