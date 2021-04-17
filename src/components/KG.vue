<template>
  <div id="box">
    <div id="myChart"></div>

    <div id="text-box">
      <el-tabs v-model="activeName">
      <el-tab-pane label="基础设置" name="first">
        <div id="selector-box" class="box-item">
          <div id="selector-title">样式选择:</div>
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
<!--        上传知识图谱-->
        <div class="box-item ">
          <el-upload
              action=""
              :before-upload="beforeJSONUpload"
          >
            <el-button type="primary" plain icon="el-icon-upload" id="upload_button">导入知识图谱</el-button>

          </el-upload>
          <el-button type="text" id="tip" @click="dialogVisible=true">导入须知</el-button>
          <el-dialog
              title="导入须知"
              :visible.sync="dialogVisible"
              width="30%">
          <span>目前只支持json文件。<br/>json对象中必须包含nodes，links，categories，pic_name四个属性。<br/>每一个node须包含name，symbolSize，category属性。<br/>每一个link须包含source，target属性。<br/>每一个category须包含name属性。
          </span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" id="tipclose" @click="dialogVisible=false">确 定</el-button>
          </span>
          </el-dialog>
          <el-dialog
              title="已存在"
              :visible.sync="haveGraphInDatabase"
              width="30%">
          <span>查询到数据库已存在同名知识图谱，是否导入？（之后的操作将对同名知识图谱造成影响，如有必要，请重命名pic_name）</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ifimportfromDatabase(false)">取 消</el-button>
            <el-button type="primary" @click="ifimportfromDatabase(true)">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <el-popover
            ref="popover1"
            placement="left"
            trigger="click"
        >
          <el-form ref="input" :model="input" :rules="editRulesE" status-icon>
            <el-table max-height="250" v-if="selectedType==='edge'" :data="selectedItem">
              <el-table-column width="100" property="source" label="source">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.source }}</div>
                  <el-form-item v-else prop="source">
                    <el-input v-model="input.source"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" property="target" label="target">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.target }}</div>
                  <el-form-item v-else prop="source">
                    <el-input v-model="input.target"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="250" label="option">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-button v-if="!editable" @click="startEdit(scope.row, 'edge')">编辑</el-button>
                    <el-button type="primary" v-if="editable" @click="handleEdit(scope.row, 'edge')">确认</el-button>
                    <el-button v-if="editable" @click="editable=false">取消</el-button>
                    <el-button type="danger" @click="deleteEdge(scope.row, 'edge')">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>

          <el-form ref="input" :model="input" :rules="editRulesN" status-icon>
            <el-table max-height="250" v-if="selectedType==='node'" :data="selectedItem">
              <el-table-column width="100" property="id" label="id">
                <template slot-scope="scope">
                  <div>{{ scope.row.id }}</div>
                </template>
              </el-table-column>
              <el-table-column width="150" property="name" label="name">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.name }}</div>
                  <el-form-item v-else prop="name">
                    <el-input v-model="input.name"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" property="category" label="category">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.category }}</div>
                  <el-form-item v-else prop="category">
                    <el-input v-model="input.category"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="200" property="symbolSize" label="symbolSize">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.symbolSize }}</div>
                  <el-form-item v-else prop="symbolSize">
                    <el-input v-model="input.symbolSize"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="150" property="value" label="value">
                <template slot-scope="scope">
                  <div v-if="!editable">{{ scope.row.value }}</div>
                  <el-form-item v-else prop="value">
                    <el-input v-model="input.value"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="250" label="option">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-button v-if="!editable" @click="startEdit(scope.row, 'node')">编辑</el-button>
                    <el-button type="primary" v-if="editable" @click="handleEdit(scope.row, 'node')">确认</el-button>
                    <el-button v-if="editable" @click="editable=false">取消</el-button>
                    <el-button type="danger" @click="deleteNode(scope.row)">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-popover>
        <div class="box-item">
          <el-button @click="showAllInfo" type="primary" plain v-popover:popover1>查 看 数 据</el-button>
          <el-checkbox v-model="checked" id="checkbox1">更多信息</el-checkbox>
        </div>

        <div class="box-item">
          <el-popover
              width="400px"
              class="form"
              ref="popover2"
              placement="left"
              trigger="click">
            <el-form v-if="addNodeVisible" :model="addNodeForm" status-icon :rules="rulesN" ref="addNodeForm">
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

        <div class="box-item">
          <el-checkbox v-if="nowOption===1" v-model="changeLayout" @change="fixLayoutChange" border>改变布局</el-checkbox>
          <el-button type="primary" plain @click="chexiao" v-if="changeLayout && nowOption===1">撤销</el-button>
          <el-button type="primary" plain @click="saveLayout">保存布局</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="展示效果" name="second">
        <div class="block">
          <span class="demonstration">调整线条曲度(长度)</span>
          <el-slider v-model="value1" @change="changeCurveness" :min=0.1 :max=1 :step=0.1></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">调整节点图标大小</span>
          <el-slider v-model="value2" @change="changeSymbolSize" :min=0.1 :max=2 :step=0.1></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">调整节点文字大小</span>
          <el-slider v-model="value3" :min=5 :max=30 @change="changeFontSize"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">缩放等级</span>
          <el-slider v-model="value4" :min=0.1 :max=3 :step="0.1" @change="changeZoom"></el-slider>
          <el-button type="primary" plain @click="gobackZoom">恢复</el-button>
        </div>
        <div class="block">
          <el-checkbox v-model="showTooltip" @change="changeTooltip" border>是否显示标签</el-checkbox>
        </div>
      </el-tab-pane>
      </el-tabs>



    </div>
  </div>
</template>


<script>
import $ from 'jquery'

const ROOT_PATH = 'https://figureair.github.io/data/les-miserables.json';


export default {
  name: "KG",
  data() {
    return {
      old_value4:1,
      value4:1,
      last_value2:1,
      tmpgraph: {},
      haveGraphInDatabase:false,
      showTooltip:true,
      activeName:"first",
      changeStyle:false,
      value1:0,
      value2:1,
      value3:12,
      nowOption:1,
      previouschangeLayout:[],
      changeLayout:false,
      checked:false,
      //目前存有三种模式，后续迭代将加入更多表现模式
      // 1.关系图
      option1: '',
      //2.力引导图
      option2: '',
      //3.环形关系图
      option3: '',
      //4.排版模式
      option4:'',
      options: [{
        value: 1,
        label: '关系图'
      }, {
        value: 2,
        label: '力引导图'
      }, {
        value: 3,
        label: '环形关系图'
      },{
        value:4,
        label:'排版模式'
      }],
      value: '',
      dialogVisible: false,
      editable: false,
      selectedType: '',
      selectedItem: [],
      input: {},
      addNodeVisible: false,
      addEdgeVisible: false,
      savedgraph: '',
      myChart: '',

      addEdgeForm: {
        source: '',
        target: ''
      },

      addNodeForm: {
        name: '',
        symbolSize: '',
        category: ''
      },

      editRulesN: {
        name: [
          { required: true, validator: this.checkEditName, trigger: 'blur' }
        ],

        symbolSize: [
          { required: true, validator: this.checkSymbolSize, trigger: 'blur' }
        ],

        category: [
          { required: true, validator: this.checkCategory, trigger: 'blur' }
        ],
      },

      editRulesE: {
        source: [
          { required: true, trigger: 'blur', validator: this.checkEditSource }
        ],

        target: [
          { required: true, trigger: 'blur', validator: this.checkEditTarget }
        ]
      },

      rulesN: {
        name: [
          { validator: this.checkName, trigger: 'blur' }
        ],

        symbolSize: [
          { validator: this.checkSymbolSize, trigger: 'blur' }
        ],

        category: [
          { validator: this.checkCategory, trigger: 'blur' }
        ]
      },

      rulesE: {
        source: [
          { validator: this.checkSource, trigger: 'blur' }
        ],

        target: [
          { validator: this.checkTarget, trigger: 'blur' }
        ]
      },
    }
  },

  mounted() {
    this.initdata()
  },

  methods: {

    gobackZoom(){
      this.myChart.setOption({
        series:{
          center:null,
          zoom:this.old_value4
        }
      })
    },

    changeZoom(){



      this.myChart.setOption({
        series: {
          zoom: this.value4
        }
      })
    },

    changeTooltip(){
      let tmptooltip=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))
      for (let i=0;i<this.option1.series[0].links.length;i++)
      {
        tmptooltip[i].tooltip.show=this.showTooltip;
      }

      this.myChart.setOption({
        series:[{
          links:tmptooltip
        }]
      })
    },

    changeCurveness(){
      let tmpcurveness=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))
      for (let i=0;i<this.option1.series[0].links.length;i++)
      {
        tmpcurveness[i].lineStyle.curveness=this.value1;
      }

      this.myChart.setOption({
        series:[{
          links:tmpcurveness
        }]
      })
    },

    changeFontSize(){
      let tmpfontsize=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))
      for (let i=0;i<this.option1.series[0].data.length;i++)
      {
        tmpfontsize[i].label.fontSize=this.value3;
      }

      this.myChart.setOption({
        series:[{
          data:tmpfontsize
        }]
      })
    },

    changeSymbolSize(){
      let tmpcurveness=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))
      for (let i=0;i<this.option1.series[0].data.length;i++)
      {
        tmpcurveness[i].symbolSize=tmpcurveness[i].symbolSize/this.last_value2*this.value2;
      }
      this.last_value2=this.value2

      this.myChart.setOption({
        series:[{
          data:tmpcurveness
        }]
      })
    },

    showAllInfo(){
      this.editable=false
      if(this.checked){this.$message.info(JSON.stringify(this.selectedItem[0]))}
    },

    checkCategory (rule, value, callback) {
      let that = this;
      if (value === '') {
        return callback(new Error('类型不能为空'));
      }

        if (isNaN(value)) {
          callback(new Error('请输入数字'))
        }
        else if (value < 0) {
          callback(new Error('类型不能为负数'))
        }
        else if (value >= that.savedgraph.categories.length) {
          callback(new Error('输入类型不在已有类型中'))
        }
        else {
          callback()
        }
    },

    checkSource(rule, value, callback){
      if (value === '') {
        return callback(new Error('起点不能为空'))
      }
    },

    checkTarget(rule, value, callback) {
      console.log(value)
      if (value === '') {
        return callback(new Error('终点不能为空'))
      }
    },

    checkSymbolSize(rule, value, callback) {
      if (value === '') {
        return callback(new Error('图形大小不能为空'));
      }
        if (isNaN(value)) {
          // console.log(value)
          callback(new Error('请输入数字'));
        }
        else if (value < 0) {
          callback(new Error('图形大小不能为负'))
        } else {
          callback()
        }
    },

    checkName (rule, value, callback) {
      let that = this;
      if (value === '') {
        callback(new Error('节点名称不能为空'));
      }
      if (that.savedgraph.nodes.find(function(element) {
        return element.name === value;
      })) {
        callback(new Error('存在相同名称的节点'))
      }
      else {
        callback();
      }
    },

    checkEditSource (rule, value, callback) {
        if (value === '') {
          return callback(new Error('起点不能为空'))
        }
        let that = this;
        if (!that.savedgraph.nodes.find(function (element) {
          return element.id === value;
        })) {
          callback(new Error('不存在与该起始节点相同id的节点'))
        }
        else {
          callback()
        }
    },

    checkEditTarget (rule, value, callback) {
      if (value === '') {
        return callback(new Error('终点不能为空'))
      }
      let that = this;
      if (!that.savedgraph.nodes.find(function (element) {
        return element.id === value;
      })) {
        callback(new Error('不存在与该终点节点相同id的节点'))
      }
      else {
        callback()
      }
    },

    checkEditName (rule, value, callback) {
      if (value === '') {
        return callback(new Error('名称不能为空'))
      }
      let that = this;
      let id = that.savedgraph.nodes.findIndex(function (element) {
        return element.name === value;
      })
      if (id !== -1 && id !== that.selectedItem[0].index) {
        callback(new Error('存在相同名称的节点'))
      }
      else {
        callback()
      }
    },

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
        });


        that.myChart.on('click', 'series.graph', function (event) {
          console.log(event);
          that.selectedItem.length = 0;
          let id = event.data.index;


          // console.log(opt);
          switch (event.dataType) {
            case 'node':
              that.selectedType = 'node';
              that.selectedItem.push(that.savedgraph.nodes[id]);
              that.selectedItem[0].index = id;
              console.log(that.savedgraph)
              break;
            case 'edge':
              that.selectedType = 'edge';
              that.selectedItem.push(that.savedgraph.links[id]);
              that.selectedItem[0].index = id;
              console.log(that.savedgraph)
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
      let index = 0;
      if(graph.zoom==null){
        graph.zoom=1
      }
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize >= 30
        };
        node.index = index++;
        if(typeof(node.category)!='number'){
          for(let i=0;i<graph.categories.length;i++){
            if(graph.categories[i].name===node.category){
              node.category=i;
              break;
            }
          }
        }
        if(node.value==null)node.value=null
        if(node.symbol==null)node.symbol=null
        if(node.itemStyle==null)node.itemStyle={color:null}
        else if (node.itemStyle.color==null)node.itemStyle.color=null
        if(node.tooltip==null)node.tooltip={show:true}
        else if(node.tooltip.show==null)node.tooltip.show=true
        if(node.label.fontSize==null)node.label.fontSize=12
      });
      index = 0;
      graph.links.forEach(function (link) {
        if (link.name === "dot") {
          link.lineStyle = {type: 'dotted'}
        }
        link.id=index+''
        link.index = index++;
        if(link.lineStyle==null)link.lineStyle={color:null,width:2,type:'solid',curveness:1}
        else {
          if (link.lineStyle.color== null) link.lineStyle.color = null
          if (link.lineStyle.width== null) link.lineStyle.width = 2
          if (link.lineStyle.type== null) link.lineStyle.type = 'solid'
          if (link.lineStyle.curveness== null) link.lineStyle.curveness = 1
        }

        if(link.tooltip==null)link.tooltip={show:true}
        else if(link.tooltip.show==null)link.tooltip.show=true

        if(link.label==null)link.label={show:false,fontSize:12}
        else {
          if (link.label.show == null) link.label.show = false
          if (link.label.fontSize == null) link.label.fontSize = false
        }
      });
      that.option1 = {
        tooltip: {
          position: 'right',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          formatter: '{b}'
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
            center:null,
            zoom:graph.zoom,
            selectedMode:'single',
            select: {
              itemStyle: {
                borderWidth: 10
              },
              lineStyle: {
                width: 5,
                color: "rgba(0, 0, 0, 1)"
              }
            },
            type: 'graph',
            //不采用任何布局
            layout: 'none',
            //关闭悬停图例高亮
            legendHoverLink: false,
            //节点大小不随鼠标缩放而缩放
            nodeScaleRatio: 1,
            //开启鼠标缩放和漫游
            roam: true,
            draggable:false,
            //边两端的标记
            edgeSymbol: ['none', 'arrow'],
            //边两端的标记大小
            edgeSymbolSize: 5,
            //悬停时鼠标样式
            cursor: 'pointer',

            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,

            itemStyle:{
              color:null
            },

            label: {
              fontsize:12,
              position: 'right',
              formatter: '{b}'
            },

            lineStyle: {
              color: 'source',
              curveness: 1,
              width: 2,
              type:'solid'
            },

            emphasis: {
              scale: true,
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            },
            tooltip:{
              show:true
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
      index = 0;
      if(graph.nodes.length>=15 || graph.links.length>=30){
        graph.zoom=3
      }
      else{
        graph.zoom=0.6
      }
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize >= 30
        };
        node.index = index++;
      });
      index = 0;
      graph.links.forEach(function (link) {
        if (link.name === "dot") {
          link.lineStyle = {type: 'dotted', width: '2'}
        }
        link.index = index++;
      });
      that.option2 = {
        tooltip: {
          position: 'right',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          formatter: '{b}'
        },
        //图例
        legend: [{
          data: graph.categories.map(function (a) {
            return a.name;
          })
        }],
        series: [
          {
            selectedMode:'single',
            select: {
              itemStyle: {
                borderWidth: 10
              },
              lineStyle: {
                width: 5,
                color: "rgba(0, 0, 0, 1)"
              }
            },

            //当前视角的缩放比例
            zoom: graph.zoom,
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
            nodeScaleRatio: 0.1,
            label: {
              position: 'right',
              fontSize:12
            },
            lineStyle: {
              curveness: 0
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
      index = 0;
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize >= 30
        };
        node.index = index++;
      });
      index = 0;
      graph.links.forEach(function (link) {
        if (link.name === "dot") {
          link.lineStyle = {type: 'dotted', width: '2'}
        }
        link.index = index++;
      });
      that.option3 = {
        tooltip: {
          position: 'right',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          formatter: '{b}'
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
            zoom:1,
            selectedMode:'single',
            select: {
              itemStyle: {
                borderWidth: 10
              },
              lineStyle: {
                width: 5,
                color: "rgba(0, 0, 0, 1)"
              }
            },

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
              formatter: '{b}',
              fontSize:12
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

      graph = JSON.parse(JSON.stringify(that.savedgraph))
      if(graph.nodes.length>=15 || graph.links.length>=30){
        graph.zoom=1
      }
      else{
        graph.zoom=0.6
      }
      index = 0;
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize >= 30
        };
        node.index = index++;
      });
      index = 0;
      graph.links.forEach(function (link) {
        if (link.name === "dot") {
          link.lineStyle = {type: 'dotted', width: '2'}
        }
        link.index = index++;
      });
      let whichy=[]
      for(let i=0;i<graph.categories.length;i++){
        whichy.push(0)
      }
      for(let i=0;i<graph.nodes.length;i++){
        let myx=0;
        if(typeof(graph.nodes[i].category)=='number') {
          myx=graph.nodes[i].category
        }
        else{
          for(let j=0;j<graph.categories.length;j++){

            if(graph.categories[j].name===graph.nodes[i].category){
              myx=j;
              break;
            }
          }
        }
        graph.nodes[i].x = myx * 50
        graph.nodes[i].y = whichy[myx]
        whichy[myx] += 50
      }
      that.option4 = {
        tooltip: {
          position: 'right',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          formatter: '{b}'
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
            zoom:graph.zoom,
            selectedMode:'single',
            select: {
              itemStyle: {
                borderWidth: 10
              },
              lineStyle: {
                width: 5,
                color: "rgba(0, 0, 0, 1)"
              }
            },
            type: 'graph',
            //不采用任何布局
            layout: 'none',
            //关闭悬停图例高亮
            legendHoverLink: false,
            //节点大小不随鼠标缩放而缩放
            nodeScaleRatio: 0,
            //开启鼠标缩放和漫游
            roam: true,
            draggable:false,
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
              formatter: '{b}',
              fontSize:12
            },

            lineStyle: {
              color: 'source',
              curveness: 0.2,
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
        ]
      };

      that.value=1;
      that.changeTo(1)

    },

    chexiao(){

      let len=this.previouschangeLayout.length
      if(len>0) {
        let dataIndex = this.previouschangeLayout[len - 1][0]
        let position = this.previouschangeLayout[len - 1][1]

        this.option1.series[0].data[dataIndex].x = position[0];
        this.option1.series[0].data[dataIndex].y = position[1];
        let tmpg=this.option1.series[0]
        this.savedgraph={uid:tmpg.uid,nodes:tmpg.data,links:tmpg.links,categories:tmpg.categories,
          itemStyle:tmpg.itemStyle,lineStyle:tmpg.lineStyle,pic_name:tmpg.pic_name,
          label:tmpg.label,tooltip:tmpg.tooltip}

        this.myChart.setOption(this.option1);
        this.updatePosition()
        this.previouschangeLayout.splice(len - 1)
      }
      else{
        this.$message.info("已撤销到底!")
      }
    },

    saveLayout(){
      this.$message.info("将下载本地json，并上传至服务器")
      let tmpOption=this.myChart.getOption().series[0]

      let res={'pic_name':this.savedgraph.pic_name,'uid':0,'center':tmpOption.center,
        'zoom':tmpOption.zoom,'itemStyle':tmpOption.itemStyle,
        'lineStyle':tmpOption.lineStyle,'label':tmpOption.label,'tooltip':tmpOption.tooltip,
        'categories':tmpOption.categories,'nodes':tmpOption.data,'links':tmpOption.links}
      console.log(res)

      $.ajax({
        url: 'http://47.99.190.169:8888/saveLayout',
        type: 'post',
        data: JSON.stringify(res),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (res) {if(res.success)console.log("样式上传成功!")
        else console.log("样式上传失败")}
      })

      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "knowledge-graph" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

    },

    fixLayoutChange(){
      if(this.changeLayout) {
        this.$message.info("关闭roam以方便操作!")
        this.myChart.setOption({
          series:[
            {
              roam:false
            }
          ]
        });

        this.initInvisibleGraphic();
      }
      else{
        this.$message.info("开启roam!")
        this.previouschangeLayout=[]
        this.myChart.setOption({
          graphic:[],
          series:[
            {
              roam:true
            }
          ]
        },{
          replaceMerge: ['graphic']
        });
      }
    },

    //在每个节点上覆盖一个圆形节点
    initInvisibleGraphic() {
      let that = this
      let echarts = require('echarts');
      this.myChart.setOption({
        graphic: echarts.util.map(that.option1.series[0].data, function (item, dataIndex) {

          let tmpPos = that.myChart.convertToPixel({seriesIndex: 0}, [item.x, item.y]);

          return {
            type: 'circle',
            id: dataIndex,
            position: tmpPos,
            shape: {
              cx: 0,
              cy: 0,
              r: 20
            },

            invisible: true,
            draggable: true,
            ondragend: echarts.util.curry(that.onPointDragging, dataIndex),
            z: 100
          };
        })
      });


    },

    //更新节点定位的函数
    updatePosition() {
      let that=this
      let echarts = require('echarts');
      this.myChart.setOption({
        graphic:[],
        series:[
          {
            roam:false
          }
        ]
      },{
        replaceMerge: ['graphic']
      });
      this.myChart.setOption({
        graphic: echarts.util.map(that.option1.series[0].data, function (item,dataIndex) {
          let tmpPos=that.myChart.convertToPixel({seriesIndex: 0},[item.x,item.y]);
          return {
            type: 'circle',
            id: dataIndex,
            position: tmpPos,
            shape: {
              cx: 0,
              cy: 0,
              r: 20
            },

            invisible: true,
            draggable: true,
            ondragend: echarts.util.curry(that.onPointDragging, dataIndex),
            z: 100
          };
        },{
          replaceMerge: ['graphic']
        })
      });

    },

    //节点上图层拖拽执行的函数
    onPointDragging(dataIndex) {
      let that=this

      let position=that.myChart.convertFromPixel({seriesIndex: 0},this.myChart.getOption().graphic[0].elements[dataIndex].position);

      this.previouschangeLayout.push([dataIndex,[this.option1.series[0].data[dataIndex].x,this.option1.series[0].data[dataIndex].y]]);


      this.option1.series[0].data[dataIndex].x = position[0];
      this.option1.series[0].data[dataIndex].y = position[1];

      let tmpg=this.option1.series[0]
      this.savedgraph={uid:tmpg.uid,nodes:tmpg.data,links:tmpg.links,categories:tmpg.categories,
      itemStyle:tmpg.itemStyle,lineStyle:tmpg.lineStyle,pic_name:tmpg.pic_name,
      label:tmpg.label,tooltip:tmpg.tooltip}

      this.myChart.setOption(that.option1)

      this.updatePosition()
    },

    changeOption(option){
      this.myChart.setOption(option);
      this.value2=1;
      this.last_value2=1;
      if(option.series[0].lineStyle.curveness!=null)
        this.value1=option.series[0].lineStyle.curveness;
      else
        this.value1=option.series[0].links[0].lineStyle.curveness;
      if(option.series[0].label.fontSize!=null)
        this.value3=option.series[0].label.fontSize;
      else
        this.value3=option.series[0].data[0].label.fontSize;
      this.value4=option.series[0].zoom
      this.old_value4=option.series[0].zoom
      return true
    },

    changeTo(value) {
      let that = this

      that.myChart.clear();
      switch (value) {
        case 1:
          that.nowOption=1
          that.changeOption(that.option1);
          return 1
        case 2:
          that.nowOption=2
          that.changeOption(that.option2);
          return 2
        case 3:
          that.nowOption=3
          that.changeOption(that.option3);
          return 3
        case 4:
          that.nowOption=4
          that.changeOption(that.option4);
          return 4
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
          if (this.checkjson(tmpjson)) {
            this.initpage()
            let that=this

            $.ajax({
              url: 'http://47.99.190.169:8888/?pic_name=' + tmpjson.pic_name + '&uid=0',
              type: 'get',
              data: {},
              dataType: 'json',
              success: function (res) {
                console.log(res)
                if (res.content == null) {
                  //that.uploadJSON()
                }
                else{
                  console.log(res)
                  that.haveGraphInDatabase=true
                  that.tmpgraph=res.content
                  if (!('x' in that.tmpgraph.nodes[0]) || !('y' in that.tmpgraph.nodes[0])) {
                    for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                      let prop = that.tmpgraph.nodes[i]
                      prop.x = 100 * Math.random()
                      prop.y = 100 * Math.random()
                    }
                  }
                }
              }
            })
          }
        }
      }
      return true
    },

    ifimportfromDatabase(bool){
      this.haveGraphInDatabase=false
      if(bool) {
        this.savedgraph = this.tmpgraph
        this.initpage()
      }
    },

    uploadJSON(){
      let tmpOption=this.myChart.getOption().series[0]

      let res={'pic_name':this.savedgraph.pic_name,'uid':0,'center':tmpOption.center,
        'zoom':tmpOption.zoom,'itemStyle':tmpOption.itemStyle,
        'lineStyle':tmpOption.lineStyle,'label':tmpOption.label,'tooltip':tmpOption.tooltip,
        'categories':tmpOption.categories,'nodes':tmpOption.data,'links':tmpOption.links}
      console.log(res)

      $.ajax({
        url: 'http://47.99.190.169:8888/save',
        type: 'post',
        data: JSON.stringify(res),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (res) {if(res.success)console.log("数据上传成功!")
        else console.log("数据上传失败")}
      })

      $.ajax({
        url: 'http://47.99.190.169:8888/saveLayout',
        type: 'post',
        data: JSON.stringify(res),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (res) {if(res.success)console.log("样式上传成功!")
        else console.log("样式上传失败")}
      })

    },

    checkjson(tmpjson) {
      //判断是否为符合格式的json对象
      if (!('pic_name' in tmpjson)) {
        this.$message.error('内容格式错误!(无pic_name属性)');
        return false
      }
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

      if (tmpjson.links.length === 0 || tmpjson.nodes.length === 0 || tmpjson.categories.length === 0) {
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
      let that = this
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(that.savedgraph));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "knowledge-graph" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },

    downloadXml() {
      let that = this
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
      let that = this;
      console.log(that.$refs['input'])
      if (mode === 'edge') {
        that.$refs['input'].validate((valid) => {
          that.checkValidEdit(valid, mode)
        })
      }
      else if (mode === 'node') {
        that.$refs['input'].validate((valid) => {
          that.checkValidEdit(valid, mode)
        })
      }
      this.editable = false;
    },

    checkValidEdit(valid, mode) {
      let that = this;
      if (valid) {
        that.selectedItem.length = 0;
        if (mode === 'edge') {
          console.log("??!?>")
          const tmp = that.savedgraph.links[that.input.index];
          tmp.source = that.input.source;
          tmp.target = that.input.target;
          that.initpage()
          that.selectedItem.push(that.savedgraph.links[that.input.index]);
        }
        else if (mode === 'node') {
          const tmp = that.savedgraph.nodes[that.input.index];
          tmp.name = that.input.name;
          tmp.value = that.input.value;
          tmp.symbolSize = that.input.symbolSize;
          tmp.category = parseInt(that.input.category);
          that.initpage();
          that.selectedItem.push(that.savedgraph.nodes[that.input.index]);
        }
      }
    },

    startEdit(row, mode) {
      let that = this;
      that.input = {};

      if (mode === 'node') {
        that.input = {
          index: row.index,
          id: row.id,
          name: row.name,
          category: row.category,
          symbolSize: row.symbolSize,
          value: row.value
        }

      }
      else if (mode === 'edge') {
        that.input = {
          index: row.index,
          source: row.source,
          target: row.target
        }
      }
      that.editable = true;
    },

    deleteNode(row) {
      this.savedgraph.nodes.splice(row.index, 1);
      this.initpage();
      this.editable = false;
      this.selectedType = '';
      this.selectedItem = [];
    },

    deleteEdge(row) {
      console.log(row);
      this.savedgraph.links.splice(row.index, 1);
      console.log(this.savedgraph.links)
      this.initpage();
      this.editable = false;
      this.selectedType = '';
      this.selectedItem = [];
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
            category: parseInt(that.addNodeForm.category),
            name: that.addNodeForm.name,
            symbolSize: that.addNodeForm.symbolSize,
            id: that.savedgraph.nodes[that.savedgraph.nodes.length - 1].id+1,
            value: that.addNodeForm.value,
            x: Math.random()*1000,
            y: Math.random()*1000
          };
          that.savedgraph.nodes.push(tmp);
          that.initpage();
          that.cleanField(mode)
        } else if (mode === 'edge') {
          const tmp = {
            source: that.addEdgeForm.source,
            target: that.addEdgeForm.target
          }
          that.savedgraph.links.push(tmp);
          that.initpage();
          that.cleanField(mode)
        }
        console.log("SUCCESS!!!!!!!!")
      }
    },

    addEdge() {
      let that = this;
      this.$refs['addEdgeForm'].validate((valid) => {
        that.isValid(valid, 'edge')
      })
    },

    cancel(mode) {
      if (mode === 'node') {
        this.cleanField(mode)
        this.addNodeVisible = false;
      } else if (mode === 'edge') {
        this.cleanField(mode)
        this.addEdgeVisible = false;
      }
    },

    cleanField(mode){
      if(mode==='node') {
        this.$refs['addNodeForm'].resetFields();
      }
      else{
        this.$refs['addEdgeForm'].resetFields();
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
  max-width: 400px;
  max-height: 280px;
  border: 1px;
}

#checkbox1 {
  margin-top: 10px;
}

</style>