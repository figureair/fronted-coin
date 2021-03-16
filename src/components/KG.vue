<template>
  <div id="box">
    <div id="myChart"></div>

    <div id="text-box">
      <div id="selector-box" class="box-item">
        <div id="selector-title" >样式选择:</div>
        <el-select id="selector" v-model="value" @change="changeTo">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <el-button type="primary" plain icon="el-icon-download" @click="downloadImg" id="downimg">下载Img</el-button>
      </div>
      <div class="box-item">
        <el-button type="primary" plain icon="el-icon-download" @click="downloadJson" id="downjson">下载Json</el-button>
      </div>
      <div class="box-item">
        <el-button type="primary" plain icon="el-icon-download" @click="downloadXml" id="downxml">下载Xml</el-button>
      </div>
      <!--      暂时不引入后端接口-->
      <div class="box-item ">
        <el-upload
                action=""
                :on-progress="initpage"
                :before-upload="beforeJSONUpload"
        >
          <el-button type="primary" plain icon="el-icon-upload" id="upload_button">导入知识图谱</el-button>

        </el-upload>
        <el-button type="text" id="tip" @click="dialogVisible=true">导入须知</el-button>
        <el-dialog
                title="导入须知"
                :visible.sync="dialogVisible"
                width="30%">
          <span>目前只支持json文件。<br/>json对象中必须包含nodes，links，categories三个属性。<br/>每一个node须包含name，symbolSize，category属性。<br/>每一个link须包含source，target属性。<br/>每一个category须包含name属性。
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" id="tipclose" @click="dialogVisible=false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-popover
              ref="popover1"
              placement="left"
              trigger="click"
      >
        <el-table max-height="250" v-if="selectedType==='edge'" :data="selectedItem">
          <el-table-column width="100" property="source" label="source">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.source }}</div>
              <el-input v-else v-model="scope.row.source"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100" property="target" label="target">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.target }}</div>
              <el-input v-else v-model="scope.row.target"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="250" label="option">
            <template slot-scope="scope">
              <el-button v-if="!editable" @click="startEdit(scope.row, 'edge')">编辑</el-button>
              <el-button type="primary" v-if="editable" @click="handleEdit(scope.row, 'edge')">确认</el-button>
              <el-button v-if="editable" @click="editable=false">取消</el-button>
              <el-button type="danger" @click="deleteEdge(scope.row, 'edge')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table max-height="250" v-if="selectedType==='node'" :data="selectedItem">
          <el-table-column width="100" property="id" label="id">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.id }}</div>
              <el-input v-else v-model="scope.row.id"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150" property="name" label="name">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.name }}</div>
              <el-input v-else v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100" property="category" label="category">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.category }}</div>
              <el-input v-else v-model="scope.row.category"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200" property="symbolSize" label="symbolSize">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.symbolSize }}</div>
              <el-input v-else v-model="scope.row.symbolSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150" property="value" label="value">
            <template slot-scope="scope">
              <div v-if="!editable">{{ scope.row.value }}</div>
              <el-input v-else v-model="scope.row.symbolSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="250" label="option">
            <template slot-scope="scope">
              <el-button v-if="!editable" @click="startEdit(scope.row, 'node')">编辑</el-button>
              <el-button type="primary" v-if="editable" @click="handleEdit(scope.row, 'node')">确认</el-button>
              <el-button v-if="editable" @click="editable=false">取消</el-button>
              <el-button type="danger" @click="deleteNode(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
      <div class="box-item">
        <el-button type="primary" plain v-popover:popover1>查 看 数 据</el-button>
      </div>

      <div class="box-item">
        <el-popover
                width="400px"
                class="form"
                ref="popover2"
                placement="left"
                trigger="click">
          <el-form v-if="addNodeVisible" :model="addNodeForm" status-icon :rules="rulesN" ref="addNodeForm">
            <el-form-item label="id" prop="id">
              <el-input v-model="addNodeForm.id" placeholder="id"></el-input>
            </el-form-item>
            <el-form-item label="name" prop="name" :required="true">
              <el-input v-model="addNodeForm.name" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item label="symbolSize" prop="symbolSize" :required="true">
              <el-input v-model="addNodeForm.symbolSize" placeholder="symbolSize"></el-input>
            </el-form-item>
            <el-form-item label="category" prop="category" :required="true">
              <el-input v-model="addNodeForm.category" placeholder="category"></el-input>
            </el-form-item>
            <el-form-item label="value" prop="value">
              <el-input v-model="addNodeForm.value" placeholder="value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addNode">添加</el-button>
              <el-button @click="cancel('node')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-popover>
        <el-button v-popover:popover2 type="primary" plain @click="addNodeVisible=true">添加节点</el-button>


        <el-popover
                width="400px"
                class="form"
                ref="popover3"
                placement="left"
                trigger="click">
          <el-form v-if="addEdgeVisible" :inline="true" status-icon :model="addEdgeForm" ref="addEdgeForm">
            <el-form-item label="source" prop="source" :required="true">
              <el-input v-model="addEdgeForm.source" placeholder="source"></el-input>
            </el-form-item>
            <el-form-item label="target" prop="target" :required="true">
              <el-input v-model="addEdgeForm.target" placeholder="target"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addEdge">添加</el-button>
            </el-form-item>
          </el-form>
        </el-popover>
        <el-button v-popover:popover3 type="primary" plain @click="addEdgeVisible=true">添加边</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'

const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/les-miserables.json';


export default {
  name: "KG",
  data() {
    return {
      //目前存有三种模式，后续迭代将加入更多表现模式
//1.关系图
      option1:'',
//2.力引导图
      option2:'',
//3.环形关系图
      option3:'',
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
      addNodeVisible: false,
      addEdgeVisible: false,
      savedgraph:'',
      myChart:'',
    }
  },

  mounted() {
    this.initdata()
  },

  methods: {
    initdata() {
      // 初始化echarts实例
      let that = this
      $(document).ready(function () {

        let echarts = require('echarts');

        that.myChart = echarts.init(document.getElementById('myChart'))
        that.myChart.showLoading();
        $.getJSON(ROOT_PATH, function (graph) {
          that.myChart.hideLoading();
          //保存原始数据
          that.savedgraph = JSON.parse(JSON.stringify(graph))
          that.initpage()
          that.myChart.setOption(that.option1);
        });


        that.myChart.on('click', 'series.graph', function (event) {
          console.log(event);
          that.selectedItem.length = 0;
          let opt = that.myChart.getOption();
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

        let that = this
        //初始设置为option1
        let graph = JSON.parse(JSON.stringify(that.savedgraph))
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize >= 30
          };
        });
        graph.links.forEach(function (link) {
          if (link.name === "dot") {
            link.lineStyle = {type: 'dotted'}
          }
        });
        that.option1 = {
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
                width: 2,
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



        //预存option2
        graph = JSON.parse(JSON.stringify(that.savedgraph))
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize >= 30
          };
        });
        graph.links.forEach(function (link) {
          if (link.name === "dot") {
            link.lineStyle = {type: 'dotted', width: '2'}
          }
        });
        that.option2 = {
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
        graph = JSON.parse(JSON.stringify(that.savedgraph))
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize >= 30
          };
        });
        graph.links.forEach(function (link) {
          if (link.name === "dot") {
            link.lineStyle = {type: 'dotted', width: '2'}
          }
        });
        that.option3 = {
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
    },

    changeTo(value) {
      let that=this

        that.myChart.clear();
        switch (value) {
          case 1:
            that.myChart.setOption(that.option1);
            return 1
          case 2:
            that.myChart.setOption(that.option2);
            return 2
          case 3:
            that.myChart.setOption(that.option3);
            return 3
        }

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
          this.checkjson(tmpjson)
        }
      }
      return true
    },

    checkjson(tmpjson){
      //判断是否为符合格式的json对象
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

      if(tmpjson.links.length===0||tmpjson.nodes.length===0||tmpjson.categories.length===0){
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
      for (let i = 0; i < tmpjson.categories.length; i++) {
        let prop = tmpjson.categories[i]
        if (!('name' in prop)) {
          this.$message.error('内容格式错误!(categories是否都包含了name属性)');
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

      this.savedgraph = JSON.parse(JSON.stringify(tmpjson))
      return true
    },

    downloadImg() {
        let img = new Image();
        img.src = this.myChart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          excludeComponents: ['toolbox']
        })
        let a = document.createElement('a');
        let e = new MouseEvent('click');
        a.download = "knowledge-graph.png";
        a.href = img.src;
        a.dispatchEvent(e);
    },

    downloadJson() {
      let that=this
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(that.savedgraph));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "knowledge-graph" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },

    downloadXml(){
      let that=this
      let js2xml = require('json2xml');
      let xml = '<?xml version="1.0" encoding="utf-8"?>' + js2xml(that.savedgraph);
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
        this.savedgraph.nodes.splice(row.index, 1);
        this.initpage();
      },

      deleteEdge(row) {
        this.savedgraph.links.splice(row.index, 1);
        this.initpage();
      },

      addNode() {
        let that = this;
        this.$refs['addNodeForm'].validate((valid) => {
          that.isValid(valid, 'node')
        })
      },

      isValid(valid, mode) {
        let that = this;
        if (valid) {
          if (mode === 'node') {
            const tmp = {
              category: that.addNodeForm.category,
              name: that.addNodeForm.name,
              symbolSize: that.addNodeForm.symbolSize,
              id: that.addNodeForm.id,
              value: that.addNodeForm.value
            };
            that.savedgraph.nodes.push(tmp);
            console.log(that.savedgraph.nodes);
            that.initpage();
            that.$refs['addNodeForm'].resetFields();
          }
          else if (mode === 'edge') {
            const tmp = {
              source: that.addEdgeForm.source,
              target: that.addEdgeForm.target
            }
            that.savedgraph.links.push(tmp);
            that.initpage();
            that.$refs['addEdgeForm'].resetFields();
          }
          console.log("SUCCESS!!!!!!!!")
        }
      },

      addEdge() {
        let that=this;
        console.log(this.$refs['addEdgeForm'])
        console.log(this.addEdgeForm)
        this.$refs['addEdgeForm'].validate((valid) => {
          that.isValid(valid, 'edge')
        })
      },

      cancel(mode) {
        if (mode === 'node') {
          this.$refs['addNodeForm'].resetFields();
          this.addNodeVisible = false;
        }
        else if (mode === 'edge') {
          this.$refs['addEdgeForm'].resetFields();
          this.addEdgeVisible = false;
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

  .box-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    text-align: center;
    margin: 10px 0;
  }

  #selector-box {
    justify-content: center;
  }

  #selector-title {
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
    overflow: visible;
  }

  .form {
    max-width:400px;
    max-height:280px;
    border:1px;
  }

</style>