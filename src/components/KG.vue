<template>
  <div id="all">
    <div id="sidebar">
      <div id="system_title">
        <div id="system_title_pic">
          <img id="movieImg" src="../img/play.png"/>
        </div>
        <div id="system_title_text">
          <div class="system_title_text_box">电影图谱</div>
          <div class="system_title_text_box">可视化系统</div>
        </div>
      </div>
      <div id="system_tools">
        <div id="tools_box">
          <div class="system_tools_title">工具</div>
          <div class="system_tools_box" :class="{system_tools_box_primary:activePart===1,system_tools_box:activePart!==1}" @click="changePart(1)">
            <div class="system_tools_pic">
              <img class="toolsImg" src="../img/light.png"/>
            </div>
            <div class="system_tools_text_box">知识图谱</div>
          </div>
          <div class="system_tools_box" :class="{system_tools_box_primary:activePart===2,system_tools_box:activePart!==2}" @click="changePart(2)">
            <div class="system_tools_pic">
              <img class="toolsImg" src="../img/search.png"/>
            </div>
            <div class="system_tools_text_box">搜索问答</div>
          </div>
          <div class="system_tools_box" :class="{system_tools_box_primary:activePart===3,system_tools_box:activePart!==3}" @click="changePart(3)">
            <div class="system_tools_pic">
              <img class="toolsImg" src="../img/who.png"/>
            </div>
            <div class="system_tools_text_box">用户画像</div>
          </div>
          <div class="system_tools_title">其他</div>
          <div class="system_tools_box" :class="{system_tools_box_primary:activePart===4,system_tools_box:activePart!==4}" @click="changePart(4)">
            <div class="system_tools_pic">
              <img class="toolsImg" src="../img/help.png"/>
            </div>
            <div class="system_tools_text_box">需要帮助</div>
          </div>
          <div class="system_tools_box" @click="logout">
            <div class="system_tools_pic">
              <img class="toolsImg" src="../img/exit.png"/>
            </div>
            <div class="system_tools_text_box">退出登录</div>
          </div>
        </div>
      </div>
    </div>
    <div id="main">

      <div class="box" v-show="activePart===1">

        <div id="myChart"></div>

      </div>
      <div class="box" v-show="activePart===2">
        <div id="QA_box">
          <div style="width: 20%;">
            <img id="chatImg" src="../img/chatbot.png"/>
          </div>
          <div id="QA_inner_box">
            <el-form id="bottom">
              <div v-for="(item,index) in message_array" v-bind:key="index">
                <el-form-item v-if="item.from===0">
                  <div style="white-space:pre-line;border-radius: 30px;background: #3a8ee6; margin-bottom: 10px; padding-left: 10px; padding-right: 10px; color:#ffffff; width: fit-content; float: left;text-align:left">
                    {{ item.message }}
                  </div>
                </el-form-item>
                <el-form-item v-if="item.from===1">
                  <div style="white-space:pre-line;border-radius: 30px;background: #13ce66; margin-bottom: 10px; padding-left: 10px; padding-right: 10px; color:#ffffff; width: fit-content; float: right;text-align:left">
                    {{ item.message }}
                  </div>
                </el-form-item>
              </div>
            </el-form>
            <el-form :inline="true" style="margin-top: 10px">
              <div v-if="isAnswered">
                <div style="text-align: center">
                  <el-form-item>
                    <el-tooltip content="点击喜欢加入图谱!" placement="top" effect="light">
                      <el-button style="width: 100px" v-show="QALikeShow" @click="QALike" type="primary" round>喜欢</el-button>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item>
                    <el-tooltip content="评价可以帮助我们优化模型!" placement="top" effect="light">
                      <el-button style="width: 100px" type="success" @click="isAnswered=false" round>好评</el-button>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item>
                    <el-tooltip content="评价可以帮助我们优化模型!" placement="top" effect="light">
                      <el-button style="width: 100px" type="danger" @click="badAnswer" round>差评</el-button>
                    </el-tooltip>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="Message.message" οnsubmit="return false;" placeholder="请输入想搜索询问的内容"
                          style="width: 310px" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="dealMessage">发送</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="box" v-show="activePart===3">
        <div id="user_pic" :key="'user_pic_count'+user_pic_count">
          <div id="user_pic_box1" v-if="ifUserPic">
            <div style="width: 100%;height:30%; display: flex;flex-direction: column;justify-content: center;align-items:center;">
              <div style="width:20vh;height:20vh;border-radius: 50%;border: 1px solid rgba(140, 138, 138, 0.25);display: flex;flex-direction: column;justify-content: center;align-items:center;">
                <img id="conImg" src="../img/face.png"/>
              </div>
            </div>
            <div style="width: 100%;display: flex;flex-direction: row;justify-content: center">
              <div style="width: 80%;text-align: left">
                <div id="user_pic_box1_item1">
                  总结报告
                </div>
                <div class="user_pic_box1_item2">
                  <h3>喜欢电影平均评分: </h3>
                  <h3>{{ avgRate }}</h3>
                  <h3>喜欢电影最老年代: </h3>
                  <h3>{{ oldShowtime }}年</h3>
                  <h3>喜欢电影最新年代: </h3>
                  <h3>{{ newShowtime }}年</h3>
                  <h3>喜欢电影平均时长: </h3>
                  <h3>{{ avgLength }}分钟</h3>
                </div>
              </div>
            </div>
          </div>
          <div id="user_pic_box2">
            <div class="four">
            <div class="user_pic_box2_item" id="user_pic1">

            </div>
            </div>
            <div class="four">
            <div class="user_pic_box2_item" id="user_pic2">

            </div>
            </div>
              <div class="four">
            <div class="user_pic_box2_item" id="user_pic3">

            </div>
              </div>
                <div class="four">
            <div class="user_pic_box2_item" id="user_pic4">

            </div>
                </div>
          </div>
          <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;position: absolute" v-if="!ifUserPic">
          <div style="width:30%;height:30%;">
            <img id="emptyImg" src="../img/empty.jpg"/>
            <h3>没有电影数据哦!</h3>
            <h3>暂时无法生成总结报告!</h3>
          </div>
          </div>
        </div>
      </div>
      <div class="box" v-show="activePart===4"></div>

      <div class="box" v-show="activePart===6">
        <div id="person_info" v-show="isPerson">
          <div id="person_info_box1">
            <div class="simple_person_info">
              <div style="height: 100%;width: 70%;display: flex;flex-direction: column;text-align: left;justify-content: center">
                <h2>姓名: {{ person['info'][0]['name'] }} </h2>
                <h2>参与电影综合评分: {{ person['info'][0]['rate'] }}</h2>
              </div>

            </div>
            <div id="movie_list" :key="'movie_list'+recommendCount">
              <div class="movie_list_item">
                <h2>出演电影</h2>
                <div class="movie_list_items">
                  <el-collapse v-model="play">
                    <el-collapse-item v-for="(v, idx) in person['play']" :key="idx">
                      <template slot="title">
                        <div style="width:100%;height:100%;overflow:hidden;color:#123963;">
                          {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                        </div>
                      </template>
                      <h4>别名: {{ v.othername }}</h4>
                      <h4>年代：{{ v.showtime }}</h4>
                      <h4>国家: {{ v.district }}</h4>
                      <h4>时长: {{ v.length }}分钟</h4>
                      <h4>语言: {{ v.language }}</h4>
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
                        <div style="width:100%;height:100%;overflow:hidden;color:#471263;">
                          {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                        </div>
                      </template>
                      <h4>别名: {{ v.othername }}</h4>
                      <h4>年代：{{ v.showtime }}</h4>
                      <h4>国家: {{ v.district }}</h4>
                      <h4>时长: {{ v.length }}分钟</h4>
                      <h4>语言: {{ v.language }}</h4>
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
                        <div style="width:100%;height:100%;overflow:hidden;color:#0e5727;">
                          {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                        </div>
                      </template>
                      <h4>别名: {{ v.othername }}</h4>
                      <h4>年代：{{ v.showtime }}</h4>
                      <h4>国家: {{ v.district }}</h4>
                      <h4>时长: {{ v.length }}分钟</h4>
                      <h4>语言: {{ v.language }}</h4>
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
            <div class="simple_person_info">
              <div style="height: 100%;width: 70%;display: flex;flex-direction: column;text-align: left;justify-content: center">
            <h2>演员电影类型占比</h2>
              </div>
            </div>
            <div style="width: 70%;height: 100%;display: flex;flex-direction: column;justify-content: center">
            <div id="person_pic"></div></div>
          </div>
        </div>
        <div id="movie_info" v-show="isMovie">
          <div id="movie_info_box1">
            <h2>电影名称: {{ movie['info'][0]['name'] }}</h2>
          </div>
          <div id="movie_info_box2">
            <div class="movie_info" >
              <div class="movie_info_item" style="margin: 0">
                <div class="movie_info" id="rate_info">
                  <div class="rate_words">
                    <span style="font-size: 15px">电影评分</span>
                    <span id="rate_number">{{ movie['info'][0]['rate'] }}</span>
                  </div>
                  <div class="rate_stars">
                    <el-rate
                        :value="movie['info'][0]['rate'] / 2"
                        disabled
                        text-color="#ff9900">
                    </el-rate>
                  </div>
                </div>
              </div>
              <div class="movie_info_item">导演: {{ movie['director'][0] }}</div>
              <div class="movie_info_item">编剧: {{ movie['composer'][0] }}</div>
              <div class="movie_info_item">主演: {{ actors }}</div>
              <div class="movie_info_item">地区: {{ movie['info'][0]['district'] }}</div>
              <div class="movie_info_item">语言: {{ movie['info'][0]['language'] }}</div>
              <div class="movie_info_item">上映时间: {{ movie['info'][0]['showtime'] }}年</div>
              <div class="movie_info_item">时长: {{ movie['info'][0]['length'] }}分钟</div>
              <div class="movie_info_item">别名: {{ movie['info'][0]['othername'] }}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100%; width: 10%; right: 0; position: fixed" v-show="activePart===1 || activePart===6">

        <el-popover ref="searchPopover" placement="left" trigger="click">
          <div>
            <el-tabs type="card" id="search-tab" v-model="searchTab">
              <el-tab-pane label="搜索节点" name="fourth-1">
                <div class="search-box-item">
                  <el-form style="max-height: 1000px" ref="searchNodeForm" :model="searchNodeForm" class="search-form">
                    <el-form-item label="类型" prop="label">
                      <el-autocomplete
                          class="inline-input"
                          v-model="searchNodeForm.label"
                          :fetch-suggestions="labelComplete"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="节点名" prop="name">
                      <el-autocomplete
                          class="inline-input"
                          v-model="searchNodeForm.name"
                          :fetch-suggestions="nnameComplete"></el-autocomplete>
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
                    <el-form-item label="起点" prop="source">
                      <el-autocomplete
                          class="inline-input"
                          v-model="searchEdgeForm.source"
                          :fetch-suggestions="sourceComplete"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="终点" prop="target">
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
          </div>
        </el-popover>
        <el-popover ref="editPopover" placement="left" trigger="click">
          <div class="block">

            <el-button style="width: 100%" type="text" v-if="editmode==='none'" icon="el-icon-edit"
                       class="edit-button" @click="startGraphicalEdit" :disabled="graph_readOnly">创建删除模式
            </el-button>
            <el-button-group id="editOpts" v-if="editmode!=='none'">
              <el-popover ref="addnodepopover" placement="left" trigger="click" width="330px" class="popover4">
                <el-form v-if="editmode==='add'" ref="graphicalAddNodeForm" :model="graphicalAddNodeForm"
                         :rules="graphicalAddNodeRules" status-icon label="添加节点" style="width: 300px"
                         label-position="top" label-width="180px">
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
              <el-button class="edit-button1" v-if="editmode!=='delete'" type="text" icon="el-icon-plus"
                         @click="setEditMode('addNode')" v-popover:addnodepopover>节点新增
              </el-button>
              <el-button class="edit-button1" v-if="editmode!=='delete'" type="text" icon="el-icon-plus"
                         @click="setEditMode('addEdge')">边新增
              </el-button>
              <el-button class="edit-button1" v-if="editmode!=='addNode' && editmode!=='addEdge'" type="text"
                         icon="el-icon-delete" @click="setEditMode('delete')">删除
              </el-button>
              <el-button class="edit-button1" type="text" icon="el-icon-refresh-left" @click="backtrack">撤销操作
              </el-button>
              <el-button class="edit-button1" type="text" icon="el-icon-document" @click="saveGraphicalEdit">保存
              </el-button>
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
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column width="200" prop="data">
                    <template slot-scope="scope">
                      <div v-if="!editable || !scope.row.editable">{{ scope.row.data }}</div>
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
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column width="200" prop="data">
                    <template slot-scope="scope">
                      <div v-if="!editable || !scope.row.editable">{{ scope.row.data }}</div>
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
              <el-button @click="showAllInfo" type="primary" plain v-popover:popover1 class="inside-box">查 看 数 据
              </el-button>
              <el-checkbox v-model="checked" id="checkbox1" class="inside-box">更多信息</el-checkbox>
            </div>
          </div>
        </el-popover>
        <el-popover ref="basicInfoPopover" placement="left" trigger="click">
          <div id="selector-box" class="box-item">
            <div id="selector-title">样式选择:</div>
            <el-select :disabled="savedgraph===''" id="selector" v-model="value" @change="changeTo">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="box-item" v-if="false">
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
              <span>目前只支持json文件。<br/>json对象中必须包含nodes，links，categories，pic_name四个属性。<br/>每一个node须包含name，symbolSize，category属性。<br/>每一个link须包含source，target属性。<br/>每一个category须包含name属性。</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" id="tipclose" @click="dialogVisible=false">确 定</el-button>
              </span>
            </el-dialog>

          </div>

          <div class="box-item" v-if="false">
            <el-checkbox :disabled="savedgraph===''" v-if="nowOption===1" v-model="changeLayout"
                         @change="fixLayoutChange" border>改变布局
            </el-checkbox>
            <el-button :disabled="savedgraph===''" type="primary" plain @click="revokeAction"
                       v-if="changeLayout && nowOption===1">撤销
            </el-button>
            <el-button type="primary" plain @click="saveLayout" :disabled="isMoviePic||savedgraph===''">保存布局</el-button>
          </div>


          <div class="box-item">
            <span style="font-size: 12px">{{ info }}</span>
          </div>

          <div class="box-item like" v-if="cancelLoveButton">
            <span class="like-text">喜欢这部电影请点亮爱心</span>
            <div class="love_button heart">
              <vue-clap-button icon="love" :size="45" :initClicked="1"
                               @cancel="cancelLLoveNode"/>
            </div>
          </div>
        </el-popover>
        <el-popover ref="viewPopover" placement="left" trigger="click">
          <div class="view">
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
              <el-checkbox v-model="isRoam" @change="fixRoam" >ROAM关闭</el-checkbox>
            </div>
          </div>
        </el-popover>
        <div class="options">

          <el-row class="option" style="top: 0">
            <el-button v-show="activePart===1" icon="el-icon-more" circle v-popover:basicInfoPopover></el-button>
          </el-row>
          <el-row class="option" style="top: 20px" >
            <el-button v-show="activePart===1" icon="el-icon-search" circle v-popover:searchPopover></el-button>
          </el-row>
          <el-row class="option" style="top: 40px" >
            <el-button v-show="activePart===1" icon="el-icon-view" circle v-popover:viewPopover></el-button>
          </el-row>
          <el-row class="option" style="top: 60px" v-if="false">
            <el-button icon="el-icon-edit" circle v-popover:editPopover></el-button>
          </el-row>
          <el-row class="option" style="top: 60px" v-show="(isPerson||isMovie)">
            <el-button v-show="activePart===1" icon="el-icon-s-unfold" circle @click="changePart(6)"></el-button>
            <el-button v-show="activePart===6" icon="el-icon-s-fold" circle @click="changePart(1)"></el-button>
          </el-row>

        </div>
      </div>

    </div>
    <el-button round class="mini_button" v-show="activePart===1" @click="showRecommend">
      展开推荐
    </el-button>
    <div class="mini_box" v-show="isShowRecommend&activePart===1">
      <i class="el-icon-bottom-right" id="recommend_exit" @click="showRecommend"></i>
      <div id="recommend" :key="'recommendCount'+recommendCount">
        <div class="recommend_item" v-if="recommendUser && (!recommendOther)">
          <div class="recommend_title">
            <h4 @click="changeUserAndOther">智能推荐电影(点这儿切换推荐)</h4>
          </div>
          <div class="recommend_list_items">
            <el-collapse>
              <el-collapse-item v-for="(v, index) in recommendByUserShow" :key="index" style="text-align: left">
                <template slot="title">
                  <div style="width:100%;height:100%;overflow:hidden;color:#123963;text-align: left">
                    {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                  </div>
                </template>
                <h4>别名: {{ v.othername }}</h4>
                <h4>年代：{{ v.showtime }}</h4>
                <h4>国家: {{ v.district }}</h4>
                <h4>时长: {{ v.length }}分钟</h4>
                <h4>语言: {{ v.language }}</h4>
                <div class="love_button">
                  <vue-clap-button icon="love" :size="10" :initClicked="v.like" @cancel="handleLoveCancel(v)"
                                   @clap="handleLoveClap(v)"/>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="recommend_bottom">
            <el-button type="text" @click="recommendChange">换一换</el-button>
            <el-button type="text" @click="recommendAgain" v-show="ifRecommendAgain">重新获取</el-button>
          </div>
        </div>
        <div class="recommend_item" v-if="recommendUser && recommendOther">
          <div class="recommend_title">
            <h4 @click="changeUserAndOther">协同过滤推荐(点这儿切换推荐)</h4>
          </div>
          <div class="recommend_list_items" v-if="recommendByOther.length===0">
            <div style="color:#5b9bde;">暂无用户与您口味一致哦！</div>
            <img class="recommendImg" src="../img/KG-01.png"/>
          </div>
          <div class="recommend_list_items" v-if="recommendByOther.length!==0">
            <el-collapse>
              <el-collapse-item v-for="(v, index) in recommendByOther" :key="index">
                <template slot="title">
                  <div style="width:100%;height:100%;overflow:hidden;color:#123963;">
                    {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                  </div>
                </template>
                <h4>别名: {{ v.othername }}</h4>
                <h4>年代：{{ v.showtime }}</h4>
                <h4>国家: {{ v.district }}</h4>
                <h4>时长: {{ v.length }}分钟</h4>
                <h4>语言: {{ v.language }}</h4>
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
                  <div style="width:100%;height:100%;overflow:hidden;color:#123963;">
                    {{ v.name + ' 评分:' + v.rate + ' 年代:' + v.showtime }}
                  </div>
                </template>
                <h4>别名: {{ v.othername }}</h4>
                <h4>年代：{{ v.showtime }}</h4>
                <h4>国家: {{ v.district }}</h4>
                <h4>时长: {{ v.length }}分钟</h4>
                <h4>语言: {{ v.language }}</h4>
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
  </div>
</template>

import {logout} from "Login.vue";
<script src="./KG.js"></script>

<style scoped src="./KG.css">

</style>
