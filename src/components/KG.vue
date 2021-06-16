<template>
  <div id="main">
    <h1>知识图谱可视化系统</h1>
    <div id="menu">
      <el-menu id="menu-content" :collapse="true" @select="selectGraph">
        <el-submenu index="first">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户知识图谱列表</span>
          </template>
          <el-menu-item-group>
            <span slot="title">用户知识图谱列表</span>
            <el-menu-item v-for="(item, index) in usr_graph" :key="index" :index="String(index)">
              {{item}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <el-dialog
            title="已存在"
            :visible.sync="haveGraphInDatabase"
            width="30%">
      <span>查询到数据库已存在同名知识图谱，是否导入？（之后的操作将对同名知识图谱造成影响，如有必要，请重命名pic_name）</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="importFromDatabase(false)">取 消</el-button>
            <el-button type="primary" @click="importFromDatabase(true)">确 定</el-button>
          </span>
    </el-dialog>

    <div id="chat">
      <template>
        <el-popover
            placement="bottom"
            width="400"
            trigger="hover"
            >
          <ul>
            <li v-for="item in message_array" v-bind:key="item">{{item}}</li>
          </ul>
          <input type="text" v-model="message" float="left">
          <button v-on:click="dealMessage">发送</button>
          <el-button slot="reference">智能问答</el-button>
        </el-popover>
      </template>
    </div>

    <div class="box">
    <div id="myChart"></div>

    <div id="text-box">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基础信息" name="first">
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

          </div>

          <div class="box-item">
            <el-checkbox v-if="nowOption===1" v-model="changeLayout" @change="fixLayoutChange" border>改变布局</el-checkbox>
            <el-button type="primary" plain @click="revokeAction" v-if="changeLayout && nowOption===1">撤销</el-button>
            <el-button type="primary" plain @click="saveLayout" :disabled="true">保存布局</el-button>
          </div>


          <div class="box-item">
            <span style="font-size: 12px">{{ info }}</span>
          </div>

            <div class="box-item like" v-if="selectedItem[0].category === 'movie'">
                <span class="like-text">喜欢这部电影请点亮爱心</span>
                <div class="love_button heart">
                    <vue-clap-button icon="love" :size="45" :initClicked="1"
                                     @cancel="cancelLLoveNode"/>
                </div>
            </div>

        </el-tab-pane>

        <el-tab-pane label="展示效果" name="second">
            <div class="style-box-item">
              <span class="demonstration">调整线条曲度(长度)</span>
              <el-slider v-model="changedCurveness" @change="changeCurveness" :min=0.1 :max=1 :step=0.1></el-slider>
            </div>
            <div class="style-box-item">
              <span class="demonstration">调整节点图标大小</span>
              <el-slider v-model="changedSymbolSize" @change="changeSymbolSize" :min=0.1 :max=2 :step=0.1></el-slider>
            </div>
            <div class="style-box-item">
              <span class="demonstration">调整节点文字大小</span>
              <el-slider v-model="changedFontSize" :min=5 :max=30 @change="changeFontSize"></el-slider>
            </div>
            <div class="style-box-item">
              <span class="demonstration">缩放等级</span>
              <i class="el-icon-refresh-left" @click="goBackZoom" style="margin-left: 10px"></i>
              <el-slider v-model="zoom_value" :min=0.1 :max=3 :step="0.1" @change="changeZoom"></el-slider>
            </div>
            <div class="style-box-item">
              <el-checkbox v-model="showTooltip" @change="changeTooltip">是否显示标签</el-checkbox>
            </div>
            <div class="style-box-item">
              <el-checkbox v-model="isRoam" @change="fixRoam" border>ROAM关闭</el-checkbox>
            </div>

        </el-tab-pane>

        <el-tab-pane label="图元编辑" name="third">
          <div class="block">
            <el-button type="text" v-if="editmode==='none'" icon="el-icon-edit"
                       class="edit-button" @click="startGraphicalEdit" :disabled="graph_readOnly">创建删除模式</el-button>
            <el-button-group v-if="editmode!=='none'">
              <el-popover ref="addnodepopover" placement="left" trigger="click" width="330px" class="popover4">
                <el-form v-if="editmode==='add'" ref="graphicalAddNodeForm" :model="graphicalAddNodeForm"
                         :rules="graphicalAddNodeRules" status-icon label="添加节点" style="width: 300px" label-position="top" label-width="180px">
                  <el-form-item label="name" :required="true" prop="name">
                    <el-input v-model="graphicalAddNodeForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="category" :required="true" prop="category">
                    <el-select v-model="graphicalAddNodeForm.category">
                      <el-option v-for="(item, index) in savedgraph.categories"
                                 :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="itemStyle" :required="true" prop="itemStyle">
                    <el-color-picker label="color" v-model="graphicalAddNodeForm.itemStyle.color"></el-color-picker>
                  </el-form-item>
                  <el-form-item label="label" :required="true" prop="label">
                    <el-input label="fontSize" v-model="graphicalAddNodeForm.label.fontSize"></el-input>
                  </el-form-item>
                  <el-form-item label="symbol" :required="true" prop="symbol">
                    <el-select v-model="graphicalAddNodeForm.symbol">
                      <el-option v-for="(item, index) in ECHARTS_SYMBOLS"
                                 :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="symbolSize" :required="true" prop="symbolSize">
                    <el-input v-model="graphicalAddNodeForm.symbolSize"></el-input>
                  </el-form-item>
                  <el-form-item label="value" prop="value">
                    <el-input v-model="graphicalAddNodeForm.value"></el-input>
                  </el-form-item>
                  <el-form-item label="x-position" prop="x">
                    <el-input v-model="graphicalAddNodeForm.x"></el-input>
                  </el-form-item>
                  <el-form-item label="y-position" prop="y">
                    <el-input v-model="graphicalAddNodeForm.y"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="graphicalAddNode">添加</el-button>
                  </el-form-item>
                </el-form>
              </el-popover>
              <el-button class="edit-button1" v-if="editmode!=='delete'" type="text" icon="el-icon-plus" @click="setEditMode('addNode')" v-popover:addnodepopover>节点新增</el-button>
                <el-button class="edit-button1" v-if="editmode!=='delete'" type="text" icon="el-icon-plus" @click="setEditMode('addEdge')">边新增</el-button>
                <el-button class="edit-button1" v-if="editmode!=='addNode' && editmode!=='addEdge'" type="text" icon="el-icon-delete" @click="setEditMode('delete')">删除</el-button>
              <el-button class="edit-button1" type="text" icon="el-icon-refresh-left" @click="backtrack">撤销操作</el-button>
              <el-button class="edit-button1" type="text" icon="el-icon-document" @click="saveGraphicalEdit">保存</el-button>
              <el-button class="edit-button1" type="text" icon="el-icon-close" @click="endGraphicalEdit">退出</el-button>
            </el-button-group>
              <el-popover
                    ref="popover1"
                    placement="left"
                    trigger="click"
            >
              <el-form ref="input" :model="input" :rules="editRulesE" status-icon v-if="selectedType==='edge'">
                <el-table max-height="450" :data="displayedItemData">
                  <el-table-column width="200" prop="name">
                    <template slot-scope="scope">
                      {{scope.row.name}}
                    </template>
                  </el-table-column>
                  <el-table-column width="200" prop="data">
                    <template slot-scope="scope">
                      <div v-if="!editable || !scope.row.editable">{{scope.row.data}}</div>
                      <el-form-item v-else :prop="scope.row.name">
                        <el-input v-model="input[scope.row.name]"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form-item>
                  <el-button v-if="!editable" @click="startEdit('edge')" :disabled="graph_readOnly">编辑</el-button>
                  <el-button type="primary" v-if="editable" @click="handleEdit('edge')">确认</el-button>
                  <el-button v-if="editable" @click="editable=false">取消</el-button>
                  <el-button type="danger" @click="handleDelete('edge')" :disabled="graph_readOnly">删除</el-button>
                </el-form-item>
              </el-form>

              <el-form ref="input" :model="input" :rules="editRulesN" status-icon v-if="selectedType==='node'">
                <el-table max-height="450" :data="displayedItemData">
                  <el-table-column width="200" prop="name">
                    <template slot-scope="scope">
                      {{scope.row.name}}
                    </template>
                  </el-table-column>
                  <el-table-column width="200" prop="data">
                    <template slot-scope="scope">
                      <div v-if="!editable || !scope.row.editable">{{scope.row.data}}</div>
                      <el-form-item v-else :prop="scope.row.name">
                        <el-select v-if="scope.row.name==='symbol'" v-model="input.symbol">
                          <el-option v-for="(item, index) in ECHARTS_SYMBOLS"
                                     :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-input v-else v-model="input[scope.row.name]"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form-item>
                  <el-button v-if="!editable" @click="startEdit('node')" :disabled="graph_readOnly">编辑</el-button>
                  <el-button type="danger" @click="handleDelete('node')" :disabled="graph_readOnly">删除</el-button>
                  <el-button type="primary" v-if="editable" @click="handleEdit('node')">确认</el-button>
                  <el-button v-if="editable" @click="editable=false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <div class="box-item">
              <el-button @click="showAllInfo" type="primary" plain v-popover:popover1>查 看 数 据</el-button>
              <el-checkbox v-model="checked" id="checkbox1">更多信息</el-checkbox>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="搜索" name="fourth">
          <el-tabs type="card" id="search-tab" v-model="searchTab">
            <el-tab-pane label="搜索节点" name="fourth-1">
              <div class="search-box-item">
                <el-form ref="searchNodeForm" :model="searchNodeForm" class="search-form">
                  <el-form-item label="category" prop="label">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchNodeForm.label"
                        :fetch-suggestions="labelComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="name" prop="name">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchNodeForm.name"
                        :fetch-suggestions="nnameComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="lowerBound" prop="lowerbound">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchNodeForm.lowerbound"
                        :fetch-suggestions="lbComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="upperBound" prop="upperbound">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchNodeForm.upperbound"
                        :fetch-suggestions="ubComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleNodeSearch" icon="el-icon-search">搜索</el-button>
                    <el-button @click="cancelSearch">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="搜索关系" name="fourth-2">
              <div class="search-box-item">
                <el-form ref="searchEdgeForm" :model="searchEdgeForm" class="search-form">
                  <el-form-item label="name" prop="name">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchEdgeForm.name"
                        :fetch-suggestions="enameComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="source" prop="source">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchEdgeForm.source"
                        :fetch-suggestions="sourceComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="target" prop="target">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchEdgeForm.target"
                        :fetch-suggestions="targetComplete"></el-autocomplete>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleEdgeSearch" icon="el-icon-search">搜索</el-button>
                    <el-button @click="cancelSearch">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="下载" name="fifth">
          <div class="download-box">
            <div class="download-box-item">
              <el-button type="primary" plain icon="el-icon-download" @click="downloadImg">下载Img
              </el-button>
            </div>
            <div class="download-box-item">
              <el-button type="primary" plain icon="el-icon-download" @click="downloadJson">下载Json
              </el-button>
            </div>
            <div class="download-box-item">
              <el-button type="primary" plain icon="el-icon-download" @click="downloadXml">下载Xml
              </el-button>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
    <div class="box">
      <div id="user_pic">
      <div id="user_pic_box1">
        <div id="user_pic_box1_item1">
          <h2>用户画像</h2>
        </div>
        <div id="user_pic_box1_item2">
          <h3>喜欢电影平均评分: {{avgRate}}</h3>
          <h3>喜欢电影最老年代: {{oldShowtime}}年</h3>
          <h3>喜欢电影最新年代: {{newShowtime}}年</h3>
          <h3>喜欢电影平均时长: {{avgLength}}分钟</h3>
        </div>
      </div>
      <div id="user_pic_box2">
        <div class="user_pic_box2_item" id="user_pic1"></div>
        <div class="user_pic_box2_item" id="user_pic2"></div>
        <div class="user_pic_box2_item" id="user_pic3"></div>
        <div class="user_pic_box2_item" id="user_pic4"></div>
      </div>
    </div>
      <div id="recommend" :key="recommendCount">
        <div class="recommend_item" v-if="recommendUser && (!recommendOther)">
        <div class="recommend_title">
          <h4 @click="changeUserAndOther">智能推荐电影</h4>
        </div>
        <div class="recommend_list_items">
        <el-collapse>
          <el-collapse-item v-for="(v, index) in recommendByUserShow" :key="index">
            <template slot="title">
              <div style="width:100%;height:100%;overflow:hidden;color:#123963;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
            </template>
            <h4>别名: {{v.othername}}</h4>
            <h4>年代：{{v.showtime}}</h4>
            <h4>国家: {{v.district}}</h4>
            <h4>时长: {{v.length}}分钟</h4>
            <h4>语言: {{v.language}}</h4>
            <div class="love_button">
              <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                               @clap="handleLoveClap(v)"/>
            </div>
          </el-collapse-item>
        </el-collapse>
        </div>
        <div class="recommend_bottom">
          <el-button type="text" @click="recommendChange">换一换</el-button>
        </div>
      </div>
        <div class="recommend_item" v-if="recommendUser && recommendOther">
          <div class="recommend_title">
            <h4 @click="changeUserAndOther">协同过滤推荐</h4>
          </div>
          <div class="recommend_list_items" v-if="recommendByOther.length===0">
            <div style="color:#5b9bde;">暂无用户与您口味一致哦！</div>
            <img class="recommendImg" src="../img/KG-01.png"/>
          </div>
          <div class="recommend_list_items" v-if="recommendByOther.length!==0">
            <el-collapse>
              <el-collapse-item v-for="(v, index) in recommendByOther" :key="index">
                <template slot="title">
                  <div style="width:100%;height:100%;overflow:hidden;color:#123963;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
                </template>
                <h4>别名: {{v.othername}}</h4>
                <h4>年代：{{v.showtime}}</h4>
                <h4>国家: {{v.district}}</h4>
                <h4>时长: {{v.length}}分钟</h4>
                <h4>语言: {{v.language}}</h4>
                <div class="love_button">
                  <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                   @clap="handleLoveClap(v)"/>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="recommend_item" v-if="!recommendUser">
        <div class="recommend_title">
          <h4>当前电影类似推荐</h4>
        </div>
        <div class="recommend_list_items">
          <el-collapse>
            <el-collapse-item v-for="(v, index) in recommendByMovieShow" :key="index">
              <template slot="title">
                <div style="width:100%;height:100%;overflow:hidden;color:#123963;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
              </template>
              <h4>别名: {{v.othername}}</h4>
              <h4>年代：{{v.showtime}}</h4>
              <h4>国家: {{v.district}}</h4>
              <h4>时长: {{v.length}}分钟</h4>
              <h4>语言: {{v.language}}</h4>
              <div class="love_button">
                <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                 @clap="handleLoveClap(v)"/>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="recommend_bottom">
          <el-button type="text" @click="recommendChange">换一换</el-button>
        </div>
      </div>
    </div>
    </div>
    <div class="box">
    <div id="person_info" v-show="isPerson">
          <div id="person_info_box1">
            <div id="simple_person_info">
              <h1>姓名: {{person['info'][0]['name']}} 参演电影平均评分: {{person['info'][0]['rate']}}</h1>
            </div>
            <div id="movie_list">
              <div class="movie_list_item">
                <h2>出演电影</h2>
                <div class="movie_list_items">
                  <el-collapse v-model="play">
                    <el-collapse-item v-for="(v, idx) in person['play']" :key="idx">
                      <template slot="title">
                        <div style="width:100%;height:100%;overflow:hidden;color:#123963;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
                      </template>
                      <h4>别名: {{v.othername}}</h4>
                      <h4>年代：{{v.showtime}}</h4>
                      <h4>国家: {{v.district}}</h4>
                      <h4>时长: {{v.length}}分钟</h4>
                      <h4>语言: {{v.language}}</h4>
                      <div class="love_button">
                        <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                         @clap="handleLoveClap(v)"/>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
              <div class="movie_list_item">
                <h2>担任导演</h2>
                <div class="movie_list_items">
                  <el-collapse v-model="direct">
                    <el-collapse-item v-for="(v, idx) in person['direct']" :key="idx">
                      <template slot="title">
                        <div style="width:100%;height:100%;overflow:hidden;color:#471263;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
                      </template>
                      <h4>别名: {{v.othername}}</h4>
                      <h4>年代：{{v.showtime}}</h4>
                      <h4>国家: {{v.district}}</h4>
                      <h4>时长: {{v.length}}分钟</h4>
                      <h4>语言: {{v.language}}</h4>
                      <div class="love_button">
                        <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                         @clap="handleLoveClap(v)"/>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
              <div class="movie_list_item">
                <h2>担任编剧</h2>
                <div class="movie_list_items">
                  <el-collapse v-model="write">
                    <el-collapse-item v-for="(v, index) in person['write']" :key="index">
                      <template slot="title">
                        <div style="width:100%;height:100%;overflow:hidden;color:#0e524b;">{{v.name+' 评分:'+v.rate+' 年代:'+v.showtime}}</div>
                      </template>
                      <h4>别名: {{v.othername}}</h4>
                      <h4>年代：{{v.showtime}}</h4>
                      <h4>国家: {{v.district}}</h4>
                      <h4>时长: {{v.length}}分钟</h4>
                      <h4>语言: {{v.language}}</h4>
                      <div class="love_button">
                        <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                         @clap="handleLoveClap(v)"/>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </div>
          </div>
          <div id="person_info_box2">
            <h2>演员电影类型占比</h2>
            <div id="person_pic"></div>
          </div>
        </div>
    <div id="movie_info" v-show="isMovie">
      <div id="movie_info_box1">
        <h2>电影名称: {{movie['info'][0]['name']}} 电影评分: {{movie['info'][0]['rate']}}</h2>
      </div>
      <div id="movie_info_box2">
        <div class="movie_info_item">
          <h4>别名: {{movie['info'][0]['othername']}}</h4>
          <h4>上映时间: {{movie['info'][0]['showtime']}}年 时长: {{movie['info'][0]['length']}}分钟</h4>
          <h4>地区: {{movie['info'][0]['district']}}</h4>
          <h4>语言: {{movie['info'][0]['language']}}</h4>
        </div>
        <div class="movie_info_item">
          <h4>导演: {{movie['director'][0]}} 编剧: {{movie['composer'][0]}}</h4>
          <h4>主演: {{actors}}</h4>
        </div>
      </div>
    </div>
  </div>
    <h6 id="tools">KG666小组呈现</h6>
  </div>
</template>

import {logout} from "Login.vue";
<script src="./KG.js"></script>

<style scoped src="./KG.css">

</style>
