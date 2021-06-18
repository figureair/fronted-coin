import $ from 'jquery'
// const ROOT_PATH = 'https://figureair.github.io/data/les-miserables.json';

export default {
    name: "KG",
    data() {
        return {
            ifRecommendAgain:false,
            isAnswered:false,
            isMoviePic:false,
            isRoam:false,
            cancelLoveButton: false,
            initialDialog:false,
            message_array:[],
            tmpMessage:'',
            Message:{
                message:'',
                from: Number, //0:Question 1:Answer
            },
            graphChange: 0,
            isPerson:false,
            isMovie:false,
            mids:[],
            avgRate:0,
            oldShowtime:2100,
            newShowtime:0,
            avgLength:0,
            play:['1'],
            direct:['1'],
            write:['1'],
            actors:"",
            movie:{
                "actor": [],
                "composer": [],
                "director": [],
                "info": [{
                    "othername": "",
                    "rate": 0,
                    "showtime": 0,
                    "district": "",
                    "length": 0,
                    "name": "",
                    "language": ""
                }
                ]
            },
            person:{
                "play": [],
                "direct": [],
                "genre": [],
                "write": [],
                "info": [
                    {
                        "rate": 0,
                        "name": "",
                        "id": 0,
                        "category": "Person"
                    }
                ]
            },
            userinfo: {},
            ifUserPic:true,
            user_pic_count:0,

            // recommend 相关变量

            // 判断是用户推荐和电影推荐
            recommendUser:true,
            // 判断是用户推荐还是协同过滤推荐
            recommendOther:false,
            // 当前推荐最后一部电影的index
            recommendByUserIndex:0,
            recommendByMovieIndex:0,
            // 展示的推荐列表
            recommendByUserShow:[{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            },{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            },{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            }],
            recommendByMovieShow:[{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            },{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            },{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            }],
            // 所有推荐列表
            recommendByUser:[],
            recommendByOther:[],
            recommendByMovie:[{
                "image": "",
                "othername": "",
                "rate": 0,
                "showtime": 0,
                "district": "",
                "name": "",
                "genre": "",
                "length": 0,
                "language": "",
                "id": 0,
                "category": "",
                "url": ""
            }],

            recommendCount:0,

            uid:0,
            // 最初的缩放程度
            zoom_old_value:1,
            zoom_value:1,
            lastSymbolSize:1,
            tmpgraph: {},
            haveGraphInDatabase:false,
            showTooltip:true,
            activeName:"first",
            changeStyle:false,
            changedCurveness:0,
            changedSymbolSize:1,
            changedFontSize:12,
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
            selectedType: 'edge',
            selectedItem: [
                {
                    "name": "提交",
                    "id": "3",
                    "source": "0",
                    "target": "1"
                },
            ],
            displayedItemData: [],
            displayedNodeTitle: ['id', 'name', 'category', 'symbol', 'symbolSize', 'value', 'x', 'y'],
            displayedEdgeTitle: ['source', 'target'],

            input: {},
            addNodeVisible: false,
            addEdgeVisible: false,
            savedgraph: '',
            myChart: '',
            info: '',
            infovisible: false,
            editmode: 'none',
            editions: [],

            searchMode: 'node',
            ECHARTS_SYMBOLS: ['circle','rect','roundRect','triangle','diamond','pin','arrow'],
            graphicalAddNodePopoverVisible: true,

            copiedgraph: '',

            searchNodeForm: {label:'',lowerbound:'',upperbound:'',name:''},
            searchNodeHistory: [],

            searchEdgeForm: {name:'',source:'',target:''},
            searchEdgeHistory: [],
            searchTab: 'fourth-1',

            isCollapse: true,
            user_graphs: [],

            usr_graph: [],

            labelComplete: (queryString, cb) => {
                let labels = this.searchNodeHistory.map((item) => Object.assign({}, { value: item.label }))
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            nnameComplete: (queryString, cb) => {
                let labels = this.searchNodeHistory.map((item) => Object.assign({}, { value: item.name }))
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            lbComplete: (queryString, cb) => {
                let labels = this.searchNodeHistory.map((item) => Object.assign({}, { value: item.lowerBound }))
                console.log(labels);
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            ubComplete: (queryString, cb) => {
                let labels = this.searchNodeHistory.map((item) => Object.assign({}, { value: item.upperBound }))
                console.log(labels);

                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            enameComplete: (queryString, cb) => {
                let labels = this.searchEdgeHistory.map((item) => Object.assign({}, { value: item.name }))
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            sourceComplete: (queryString, cb) => {
                let labels = this.searchEdgeHistory.map((item) => Object.assign({}, { value: item.source }))
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            targetComplete: (queryString, cb) => {
                let labels = this.searchEdgeHistory.map((item) => Object.assign({}, { value: item.target }))
                let results = queryString? labels.filter((his) =>
                    his.value && his.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                ): labels
                cb(results);
            },

            graphicalAddNodeForm: {
                name: '',
                category: '',
                itemStyle: {
                    color: null,
                },
                label: {
                    fontSize: '',
                },
                symbol: '',
                symbolSize: '',
                value: '',
                x: '',
                y: '',
            },
            graphicalAddNodeVisible: false,

            addTypes: [
                '节点',
                '边'
            ],

            addEdgeForm: {
                source: '',
                target: ''
            },

            addNodeForm: {
                name: '',
                symbolSize: '',
                category: ''
            },

            graphicalAddNodeRules: {
                name: [
                    { required: true, validator: this.checkName, trigger: 'blur'}
                ],

                category: [
                    { required: true, trigger: 'change', message: '请选择节点所属类别'}
                ],

                label: [
                    { trigger: 'change', validator: this.checkLabel }
                ],

                value: [
                    { required: true }
                ],

                symbolSize: [
                    { required: true, validator: this.checkSymbolSize, trigger: 'blur' }
                ],

                x: [
                    { trigger: 'change', validator: this.checkPosition }
                ],

                y: [
                    { trigger: 'change', validator: this.checkPosition }
                ]
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
        this.uid=parseInt(this.$route.params.uid)

        console.log(this.uid)

        // 方便刷新暂用
        // if (!this.uid) {
        //     this.uid = 5;
        // }

        console.log('uid: ' + this.uid)

        this.openNotify()

        this.getUserGraph()
        this.initialDialog = true;

        this.initdata()
    },

    methods: {

        // 功能:用户进入时提示
        openNotify() {

            this.$notify({
                title: '使用提示',
                message: '欢迎使用知识图谱系统!请本地导入或数据库拉取图谱,你也可以点击图谱列表创建专属电影知识图谱!',
                type: 'success'
            });
        },

        // 功能:锁定缩放
        fixRoam(){
            if(this.isRoam) {
                this.myChart.setOption({
                    series: [
                        {
                            roam: false
                        }
                    ]
                });
            }
            else {
                this.myChart.setOption({
                    series: [
                        {
                            roam: true
                        }
                    ]
                });
            }
        },

        // 功能:切换智能推荐和协同过滤推荐
        changeUserAndOther(){
          this.recommendOther=!this.recommendOther
        },

        // 功能:获取电影知识图谱
        getMovie(){
            let that=this

            // 功能:getMovie后更新person和recommend列表
            function listCheck(){
                if(that.person['info']['name']!=='') {

                    that.personListChange=false

                    for (let i = 0; i < that.person['play'].length; i++) {
                        if (that.mids.indexOf(that.person['play'][i]['id']) !== -1) {
                            that.person['play'][i]['like'] = 1
                        } else {
                            that.person['play'][i]['like'] = 0
                        }
                    }
                    for (let i = 0; i < that.person['direct'].length; i++) {
                        if (that.mids.indexOf(that.person['direct'][i]['id']) !== -1) {

                            that.person['direct'][i]['like'] = 1
                        } else {
                            that.person['direct'][i]['like'] = 0
                        }
                    }
                    for (let i = 0; i < that.person['write'].length; i++) {
                        if (that.mids.indexOf(that.person['write'][i]['id']) !== -1) {
                            that.person['write'][i]['like'] = 1
                        } else {
                            that.person['write'][i]['like'] = 0
                        }
                    }

                }
                for (let i = 0; i < that.recommendByUser.length; i++) {
                    if (that.mids.indexOf(that.recommendByUser[i]['id'])!==-1) {
                        that.recommendByUser[i]['like'] = 1
                    } else {
                        that.recommendByUser[i]['like'] = 0
                    }
                }
                that.recommendCount++


            }

            // 调用接口获取图谱
            $.ajax({
                url: 'http://47.99.190.169:8888/?pic_name=movie' + '&uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.content!==null) {
                        // 暂存返回的图谱
                        that.tmpgraph = res.content

                        // 如果没有位置参数，则自动分配
                        if (!('x' in that.tmpgraph.nodes[0]) || !('y' in that.tmpgraph.nodes[0])) {
                            for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                                let prop = that.tmpgraph.nodes[i]
                                prop.x = 100 * Math.random()
                                prop.y = 100 * Math.random()
                            }
                        }
                        for (let i = 0; i < that.tmpgraph.links.length; i++) {
                            let prop = that.tmpgraph.links[i]
                            prop.source = prop.source + ""
                            prop.target = prop.target + ""
                        }

                        // 存入savedgraph
                        that.savedgraph = that.tmpgraph

                        // 存储已喜欢的电影ID
                        that.mids = []
                        for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                            let prop = that.tmpgraph.nodes[i]
                            if (prop.category === 'movie') {
                                that.mids.push(prop.mid)
                            }
                        }

                        that.ifRecommendAgain=false
                        that.initpage()
                    }
                    else{
                        that.mids=[]
                        that.info=''
                        that.recommendUser=true
                        that.recommendAgain()
                        that.myChart.clear()
                        that.isMovie=false
                        that.isPerson=false
                    }
                    that.showUserPic()
                    listCheck()
                    that.isMovie=false
                    that.recommendUser=true
                    that.cancelLoveButton=false
                }
            })
        },

        // 功能:取消喜欢
        handleLoveCancel(movie){
            let that=this

            // 不喜欢电影的知识图谱里的id
            let unlike_id=-1

            // 在喜欢电影的知识图谱里寻找对应的id
            for(let i=0;i<that.savedgraph.nodes.length;i++){
                if(that.savedgraph.nodes[i].category==='movie'){
                    if(that.savedgraph.nodes[i].mid===movie.id){
                        unlike_id=that.savedgraph.nodes[i].id
                        break
                    }
                }
            }

            // 如果找到就调用接口，找不到不做处理
            if(unlike_id>0) {

                // 调用接口返回该电影id
                $.ajax({
                    url: 'http://47.99.190.169:8888/movie/unlike?id=' + unlike_id + '&uid=' + that.uid,
                    type: 'get',
                    success: function (res) {
                        if (res.success) {
                            console.log('取消喜欢成功!')

                            // 设置对应电影like属性
                            movie.like = 0

                            // 调用接口重新获取电影知识图谱
                            that.getMovie()
                        } else {
                            movie.like = 1
                            console.log('取消喜欢失败!')
                        }
                    }
                })
            }
        },

        // 功能:点击喜欢
        handleLoveClap(movie){

            let that=this

            // 调用接口返回该电影id
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/like?id='+movie.id+'&uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.success){
                        console.log('喜欢成功!')

                        // 设置对应电影like属性
                        movie.like=1

                        // 调用接口重新获取电影知识图谱
                        that.getMovie()
                    }
                    else{
                        movie.like=0
                        console.log('喜欢失败!')
                    }
                }
            })

        },

        // 功能:获取推荐列表
        recommendGet(id){
            let that=this

            // 判断当前是用户推荐
            if(this.recommendUser) {
                // 调用接口获取用户推荐列表
                $.ajax({
                    url: 'http://47.99.190.169:8888/movie/recommend/u?uid='+id,
                    type: 'get',
                    success: function (res) {
                        if(res.content.rec.length!==0) {
                            that.ifRecommendAgain=false

                            // 添加like属性,判断电影是否在知识图谱中,则爱心为红心
                            that.recommendByUser = res.content.rec
                            for (let i = 0; i < that.recommendByUser.length; i++) {
                                if (that.mids.indexOf(that.recommendByUser[i]['id'])!==-1) {
                                    that.recommendByUser[i]['like'] = 1
                                } else {
                                    that.recommendByUser[i]['like'] = 0
                                }
                            }
                            that.recommendByUserShow=[]
                            // 添加前三个到推荐列表中
                            for (let i = 0; i < 3; i++) {
                                that.recommendByUserIndex = i
                                that.recommendByUserShow.push(that.recommendByUser[i])
                            }

                            // 利用key值重新渲染
                            that.recommendCount++
                        }
                        else{
                            that.ifRecommendAgain=true
                            $.ajax({
                                url: 'http://47.99.190.169:8888/movie/recommend/r',
                                type: 'get',
                                success: function (res) {
                                    if(res.content.rec.length!==0) {
                                        // 添加like属性,判断电影是否在知识图谱中,则爱心为红心
                                        that.recommendByUser = res.content.rec
                                        for (let i = 0; i < that.recommendByUser.length; i++) {
                                            if (that.mids.indexOf(that.recommendByUser[i]['id'])!==-1) {
                                                that.recommendByUser[i]['like'] = 1
                                            } else {
                                                that.recommendByUser[i]['like'] = 0
                                            }
                                        }
                                        that.recommendByUserShow = []
                                        // 添加前三个到推荐列表中
                                        for (let i = 0; i < 3; i++) {
                                            that.recommendByUserIndex = i
                                            that.recommendByUserShow.push(that.recommendByUser[i])
                                        }

                                        // 利用key值重新渲染
                                        that.recommendCount++
                                    }
                                }
                            })
                        }
                    }
                })

                // 调用接口获取协同过滤推荐列表
                $.ajax({
                    url: 'http://47.99.190.169:8888/movie/recommend/o?uid='+id,
                    type: 'get',
                    success: function (res) {
                        if(res.content.rec.length!==0) {
                            // 添加like属性,判断电影是否在知识图谱中,则爱心为红心
                            that.recommendByOther = res.content.rec
                            for (let i = 0; i < that.recommendByOther.length; i++) {
                                if (that.mids.indexOf(that.recommendByOther[i]['id'] )!==-1) {
                                    that.recommendByOther[i]['like'] = 1
                                } else {
                                    that.recommendByOther[i]['like'] = 0
                                }
                            }

                            // 利用key值重新渲染
                            that.recommendCount++

                        }
                    }
                })
            }
            // 判断当前是电影推荐
            else{
                // 调用接口
                $.ajax({
                    url: 'http://47.99.190.169:8888/movie/recommend/m?id='+id,
                    type: 'get',
                    success: function (res) {
                        if (res.content.rec.length !== 0) {
                            // 添加like属性,判断电影是否在知识图谱中
                            that.recommendByMovie = res.content.rec
                            console.log(that.recommendByMovie)
                            for (let i = 0; i < that.recommendByMovie.length; i++) {
                                if (that.mids.indexOf(that.recommendByMovie[i]['id'] )!==-1) {
                                    that.recommendByMovie[i]['like'] = 1
                                } else {
                                    that.recommendByMovie[i]['like'] = 0
                                }
                            }
                            that.recommendByMovieShow=[]
                            // 添加前三个到推荐列表中
                            for (let i = 0; i < 3; i++) {
                                that.recommendByMovieIndex = i
                                that.recommendByMovieShow.push(that.recommendByMovie[i])
                            }

                            // 利用key值重新渲染
                            that.recommendCount++
                        }
                    }
                })
            }

        },

        // 功能:重新获取推荐
        recommendAgain(){
            this.recommendGet(this.uid);
        },

        // 功能:点击换一换，切换推荐
        recommendChange(){
            // 判断是用户推荐
            if(this.recommendUser){
                // 切换下三条推荐电影
                for(let i=0;i<3;i++) {
                    let j=this.recommendByUserIndex+1
                    if(j>=this.recommendByUser.length){
                        j=0;
                    }
                    this.recommendByUserShow[i]=this.recommendByUser[j]
                    this.recommendByUserIndex=j
                    j++
                }
            }
            // 判断是电影推荐
            else{
                // 切换下三条推荐电影
                for(let i=0;i<3;i++) {
                    let j=this.recommendByMovieIndex+1
                    if(j>=this.recommendByMovie.length){
                        j=0;
                    }
                    this.recommendByMovieShow[i]=this.recommendByMovie[j]
                    this.recommendByMovieIndex=j
                    j++
                }
            }
            // 利用key值重新渲染
            this.recommendCount++
        },

        // 功能:用户画像生成
        showUserPic(){
            let that=this

            // 展示评分区间比
            function rateShow(){
                // 统计各个评分区间的数量并计算平均评分
                let rates={'8分以上':0,'6~8分':0,'4~6分':0,'4分以下':0}
                let totalRate=0
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    totalRate+=that.userinfo['movie'][i]['rate']
                    if(that.userinfo['movie'][i]['rate']<4){
                        rates['4分以下']=rates['4分以下']+1
                    }
                    else if(that.userinfo['movie'][i]['rate']<6){
                        rates['4~6分']=rates['4~6分']+1
                    }
                    else if(that.userinfo['movie'][i]['rate']<8){
                        rates['6~8分']=rates['6~8分']+1
                    }
                    else{
                        rates['8分以上']=rates['8分以上']+1
                    }

                }
                that.avgRate=(totalRate/that.userinfo['movie'].length).toFixed(2)
                let ratesData = [{name: '8分以上', value: rates['8分以上']}, {name: '6~8分', value: rates['6~8分']}, {
                    name: '4~6分', value: rates['4~6分']}, {name: '4分以下', value: rates['4分以下']}]

                //生成评分饼图
                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic1');

                if (chartDom == null) {
                    return
                }

                echarts.dispose(chartDom)

                let userPic1 = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#ff7373', '#FDD56A', '#6afd94']

                let option = {
                    title: {
                        text: '评分区间比',
                        top:'5%',
                        left:'center',
                        textStyle: {
                            fontSize: 20
                        }
                    },
                    legend:{
                        type:"scroll",
                        top:'bottom',
                        textStyle: {
                            color:'#8C8C8C'
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: {c}部 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            itemStyle: {

                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }

                            },
                            label: {
                                show: false
                            },
                            data:ratesData
                        }
                    ]
                };
                userPic1.setOption(option)

            }

            // 展示时长区间比
            function lengthShow(){
                // 统计各个时长区间的数量并计算平均时长
                let lengths={'100分钟以下':0,'100~110分钟':0,'110~120分钟':0,'120分钟以上':0}
                let totalLength=0
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    totalLength+=that.userinfo['movie'][i]['length']
                    if(that.userinfo['movie'][i]['length']<100){
                        lengths['100分钟以下']=lengths['100分钟以下']+1
                    }
                    else if(that.userinfo['movie'][i]['length']<110){
                        lengths['100~110分钟']=lengths['100~110分钟']+1
                    }
                    else if(that.userinfo['movie'][i]['length']<120){
                        lengths['110~120分钟']=lengths['110~120分钟']+1
                    }
                    else{
                        lengths['120分钟以上']=lengths['120分钟以上']+1
                    }

                }
                that.avgLength=(totalLength/that.userinfo['movie'].length).toFixed(2)
                let lengthsData = [{name: '100分钟以下', value: lengths['100分钟以下']}, {name: '100~110分钟', value: lengths['100~110分钟']}, {
                    name: '110~120分钟', value: lengths['110~120分钟']}, {name: '120分钟以上', value: lengths['120分钟以上']}]

                //生成时长饼图
                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic2');

                if (chartDom == null) {
                    return
                }

                echarts.dispose(chartDom)

                let userPic2 = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#ff7373', '#FDD56A', '#6afd94']

                let option = {
                    title: {
                        text: '时长区间比',
                        top:'5%',
                        left:'center',
                        textStyle: {
                            fontSize: 20
                        }
                    },
                    legend:{
                        type:"scroll",
                        top:'bottom',
                        textStyle: {
                            color:'#8C8C8C'
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: {c}部 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            itemStyle: {

                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }

                            },
                            label: {
                                show: false
                            },
                            data:lengthsData
                        }
                    ]
                };
                userPic2.setOption(option)

            }

            // 展示年代区间比
            function showtimeShow(){
                // 统计各个年代区间的数量并计算最新最老电影
                let showtimes={'2000年以前':0,'2000~2005年':0,'2005~2010年':0,'2010年以后':0}
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    that.oldShowtime=Math.min(that.oldShowtime,that.userinfo['movie'][i]['showtime'])
                    that.newShowtime=Math.max(that.newShowtime,that.userinfo['movie'][i]['showtime'])
                    if(that.userinfo['movie'][i]['showtime']<2000){
                        showtimes['2000年以前']=showtimes['2000年以前']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2005){
                        showtimes['2000~2005年']=showtimes['2000~2005年']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2010){
                        showtimes['2005~2010年']=showtimes['2005~2010年']+1
                    }
                    else{
                        showtimes['2010年以后']=showtimes['2010年以后']+1
                    }

                }

                let showtimesData = [{name: '2000年以前', value: showtimes['2000年以前']}, {name: '2000~2005年', value: showtimes['2000~2005年']}, {
                    name: '2005~2010年', value: showtimes['2005~2010年']}, {name: '2010年以后', value: showtimes['2010年以后']}]

                //生成年代饼图
                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic3');

                if (chartDom == null) {
                    return
                }

                echarts.dispose(chartDom)

                let userPic3 = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#ff7373', '#FDD56A', '#6afd94']

                let option = {
                    title: {
                        text: '年代区间比',
                        top:'5%',
                        left:'center',
                        textStyle: {
                            fontSize: 20
                        }
                    },
                    legend:{
                        type:"scroll",
                        top:'bottom',
                        textStyle: {
                            color:'#8C8C8C'
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: {c}部 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            itemStyle: {

                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }

                            },
                            label: {
                                show: false
                            },
                            data:showtimesData
                        }
                    ]
                };
                userPic3.setOption(option)

            }

            // 展示类型比
            function genreShow(){
                let genreData=[]
                for (let i=0;i<that.userinfo['genre'].length;i++)
                {
                    genreData.push({'name':that.userinfo['genre'][i].genre,'value':parseInt(that.userinfo['genre'][i].num)})
                }

                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic4');

                if (chartDom == null) {
                    return
                }

                echarts.dispose(chartDom)

                let userPic4 = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A',
                    '#FD866A', '#9E87FF', '#58D5FF','#1aff00','#ff0000',
                    '#ff0000','#752c82','#1e4013','#e77d00',
                    '#e3a1a1','#797357','#d25252','#001686',
                ]

                let option = {
                    title: {
                        text: '类型区间比',
                        top:'5%',
                        left:'center',
                        textStyle: {
                            fontSize: 20
                        }
                    },
                    legend:{
                        type:"scroll",
                        top:'bottom',
                        textStyle: {
                            color:'#8C8C8C'
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: {c}部 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            itemStyle: {

                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }

                            },
                            label: {
                                show: false
                            },
                            data:genreData
                        }
                    ]
                };
                userPic4.setOption(option)

            }

            // 调用接口获取数据并生成
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/userdata?uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.content.movie.length!==0){
                        that.ifUserPic=true
                        that.userinfo=res.content
                        rateShow()
                        lengthShow()
                        showtimeShow()
                        genreShow()
                    }
                    else{
                        that.ifUserPic=false

                        // 利用key值更新DOM
                        that.user_pic_count++
                    }
                }
            })
        },

        // 功能:演员图表生成
        showInfoPic(name){
            let that=this

            // 生成图表方法
            function createPic() {
                let personData = []
                // 将各个类型的数据存入personData
                for (let i = 0; i < that.person['genre'].length; i++) {
                    personData.push({'name': that.person['genre'][i].genre, 'value': parseInt(that.person['genre'][i].num)})
                }

                let echarts = require('echarts');
                let chartDom = document.getElementById('person_pic');

                if (chartDom == null) {
                    return
                }

                echarts.dispose(chartDom)

                let personPic = echarts.init(chartDom);

                // 调色盘
                let colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A',
                    '#FD866A', '#9E87FF', '#58D5FF', '#1aff00',
                    '#ff0000','#752c82','#1e4013','#e77d00',
                    '#e3a1a1','#797357','#d25252','#001686',
                ]

                let option = {
                    title: {
                        text: '类型比',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: 20
                        }
                    },

                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: ['24%', '45%'],
                            clockwise: true,
                            avoidLabelOverlap: true,
                            hoverOffset: 15,
                            itemStyle: {

                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }

                            },
                            label: {
                                show: true,
                                position: 'outside',
                                formatter: '{a|{b}：{d}%}\n{hr|}',
                                rich: {
                                    hr: {
                                        backgroundColor: 't',
                                        borderRadius: 3,
                                        width: 3,
                                        height: 3,
                                        padding: [3, 3, 0, -12]
                                    },
                                    a: {
                                        padding: [-30, 15, -20, 15]
                                    }
                                }
                            },
                            labelLine: {

                                    length: 10,
                                    length2: 20,
                                    lineStyle: {
                                        width: 1

                                }
                            },
                            data: personData
                        }
                    ]
                };
                personPic.setOption(option)
            }

            // 调用接口获取人员数据
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/person?name='+name,
                type: 'get',
                success: function (res) {
                    // 接收数据
                    that.person=res.content

                    for (let i = 0; i < that.person['play'].length; i++) {
                        if (that.mids.indexOf(that.person['play'][i]['id'])!==-1) {
                            that.person['play'][i]['like'] = 1
                        } else {
                            that.person['play'][i]['like'] = 0
                        }
                    }
                    for (let i = 0; i < that.person['direct'].length; i++) {
                        if (that.mids.indexOf(that.person['direct'][i]['id'])!==-1) {

                            that.person['direct'][i]['like'] = 1
                        } else {
                            that.person['direct'][i]['like'] = 0
                        }
                    }
                    for (let i = 0; i < that.person['write'].length; i++) {
                        if (that.mids.indexOf(that.person['write'][i]['id'])!==-1) {
                            that.person['write'][i]['like'] = 1
                        } else {
                            that.person['write'][i]['like'] = 0
                        }
                    }

                    // 切换为演员详细信息板块
                    that.isPerson=true
                    createPic()
                }
            })


        },

        // 功能:电影信息展示
        showMovieInfo(id){
            let that=this
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/info?id='+id,
                type: 'get',
                success: function (res) {
                    that.movie=res.content

                    that.actors=''
                    // 生成主演字符串
                    for(let i=0;i<that.movie.actor.length-1;i++){
                        that.actors=that.actors+that.movie.actor[i]+'、'
                    }
                    that.actors=that.actors+that.movie.actor[that.movie.actor.length-1]

                    // 切换为演员详细信息板块
                    that.isMovie=true
                }
            })
        },

        // 功能:切换为原先的缩放程度
        goBackZoom(){
            // 重设zoom值
            this.myChart.setOption({
                series:{
                    center:null,
                    zoom:this.zoom_old_value
                }
            })
            // 切换滑动条值为原先的zoom值
            this.zoom_value=this.zoom_old_value
        },

        // 功能:调节缩放程度
        changeZoom(){
            this.myChart.setOption({
                series: {
                    zoom: this.zoom_value
                }
            })
        },

        // 功能:切换是否显示标签
        changeTooltip(){
            // 深拷贝links数组
            let tmpTooltip=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))

            // 设置每个link的tooltip为对应状态
            for (let i=0;i<this.option1.series[0].links.length;i++)
            {
                tmpTooltip[i].tooltip.show=this.showTooltip;
            }

            // 启用变更
            this.myChart.setOption({
                series:[{
                    links:tmpTooltip
                }]
            })
        },

        // 功能:调节曲度
        changeCurveness(){
            // 深拷贝links数组
            let tmpCurveness=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))

            // 设置每个link的curveness
            for (let i=0;i<this.option1.series[0].links.length;i++) {
                if(tmpCurveness[i].lineStyle==null)tmpCurveness[i].lineStyle={curveness:this.changedCurveness}
                else tmpCurveness[i].lineStyle.curveness = this.changedCurveness;
            }

            // 启用变更
            this.myChart.setOption({
                series:[{
                    links:tmpCurveness
                }]
            })
        },

        // 功能:调节文字大小
        changeFontSize(){
            // 深拷贝data数组
            let tmpFontSize=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))

            // 设置每个node的文字大小
            for (let i=0;i<this.option1.series[0].data.length;i++)
            {
                tmpFontSize[i].label.fontSize=this.changedFontSize;
            }

            // 启用变更
            this.myChart.setOption({
                series:[{
                    data:tmpFontSize
                }]
            })
        },

        // 功能:调节节点倍率
        changeSymbolSize(){
            // 深拷贝data数组
            let tmpSymbolSize=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))

            // 设置每个node的节点倍率
            for (let i=0;i<this.option1.series[0].data.length;i++)
            {
                tmpSymbolSize[i].symbolSize=tmpSymbolSize[i].symbolSize/this.lastSymbolSize*this.changedSymbolSize;
            }
            this.lastSymbolSize=this.changedSymbolSize

            // 启用变更
            this.myChart.setOption({
                series:[{
                    data:tmpSymbolSize
                }]
            })
        },

        showAllInfo(){
            this.editable=false
            this.updateDisplayedData()
            if(this.checked){this.$message.info(JSON.stringify(this.selectedItem[0]))}
        },

        updateDisplayedData(){
            let data = this.selectedItem[0]
            if (this.selectedType === 'node') {
                this.displayedItemData = this.displayedNodeTitle.map((value) => {
                    return {
                        name: value,
                        data: data[value],
                        editable: value !== 'id'
                    };
                })
            }
            else if (this.selectedType === 'edge') {
                this.displayedItemData = this.displayedEdgeTitle.map((value) => {
                    return {
                        name: value,
                        data: data[value],
                        editable: value !== 'id'
                    };
                })
            }

        },

        // 表单验证:节点相关表单的category项
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

        // 表单验证:搜索边表单source项
        checkSource(rule, value, callback){
            if (value === '') {
                return callback(new Error('起点不能为空'))
            }
        },

        // 表单验证:搜索边表单source项
        checkTarget(rule, value, callback) {
            if (value === '') {
                return callback(new Error('终点不能为空'))
            }
        },

        // 表单验证:添加节点表单symbolSize项
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

        // 表单验证:添加节点表单name项
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

        // 表单验证:在线编辑边表单source项
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

        // 表单验证:在线编辑边表单target项
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

        // 表单验证:添加节点表单name项
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

        // 表单验证:添加节点表单label项
        checkLabel (rule, value, callback) {
            console.log(value);
            callback();
        },

        // 表单验证:添加节点表单x, y项
        checkPosition (rule, value, callback) {
            if (value === '') {
                callback();
            }
            if (isNaN(value)) {
                callback(new Error("请输入数字"))
            }
            callback();
        },

        // 功能:初始化知识图谱echarts实例并获取数据
        initdata() {
            // 初始化echarts实例
            let that = this
            $(document).ready(function () {
                // 获取DOM并初始化
                let echarts = require('echarts');
                that.myChart = echarts.init(document.getElementById('myChart'))

                // 显示等待
                // that.myChart.showLoading();
                // // 获取JSON数据
                // $.getJSON(ROOT_PATH, function (graph) {
                //     // 关闭等待
                //     that.myChart.hideLoading();
                //
                //     //保存原始数据
                //     that.savedgraph = JSON.parse(JSON.stringify(graph))
                //
                //     // 初始化页面
                //     that.initpage()
                // });

                // 触发点击（点或边）事件
                that.myChart.on('click', 'series.graph', function (event) {
                    console.log(event);
                    let id = event.data.index;
                    let item;
                    switch (event.dataType) {
                        case 'node':
                            item = that.savedgraph.nodes[id];
                            if (that.editmode === 'delete') {
                                // 记录操作
                                const op = {
                                    option: 'delete',
                                    type: 'node',
                                    dataIndex: id,
                                    data: item
                                };
                                that.editions.push(op);
                                that.deleteNode(id);
                            }
                            else if (that.editmode === 'addEdge') {
                                console.log("addEdge");
                                if (that.selectedItem.length < 2) {
                                    if (that.selectedType === 'edge') {
                                        that.clearSelection();
                                    }
                                    if (that.selectedItem.find((element) =>
                                        element.id === item.id)) {
                                        // 与上一次点击的节点相同则清除
                                        that.selectedItem = [];
                                    }
                                    else {
                                        that.selectedItem.push(item);
                                        if (that.selectedItem.length === 2) {
                                            that.addEdgeOfSelectedNodes();
                                            that.selectedItem = [];
                                        }
                                    }
                                }
                                else {
                                    // 防bug，测试完没问题后删
                                    console.log("出错了")
                                }
                                that.selectedType = 'node';
                            }
                            else {
                                if (that.savedgraph.pic_name === 'movie') {
                                    // 对电影知识图谱单独处理
                                    // 先根据上一次选中的节点对应的类型进行相应操作
                                    if (that.selectedItem.length !== 0 && that.selectedType === 'node') {
                                        let before = that.selectedItem[0];
                                        switch (before.category) {
                                            case 'movie':
                                                that.isMovie = false;
                                                that.recommendUser = true;
                                                break;
                                            case 'person':
                                                that.isPerson = false;
                                                break;
                                            default:
                                                break;
                                        }
                                        if (item.id === before.id) {
                                            that.clearSelection();
                                            break;
                                        }
                                    }
                                    that.resetSelectedItem(item, id, 'node');
                                    // 再根据当下选中的节点类型进行操作
                                    console.log(item.category)
                                    switch (item.category) {
                                        case 'movie':
                                            that.isPerson=false
                                            that.showMovieInfo(item.mid);
                                            that.recommendUser = false;
                                            that.recommendGet(item.mid);
                                            that.cancelLoveButton = true;
                                            break;
                                        case 'person':

                                            that.isMovie=false
                                            that.showInfoPic(item.name);
                                            that.cancelLoveButton = false;
                                            break;
                                        default:
                                            that.cancelLoveButton = false;
                                            break;
                                    }
                                }
                                else {
                                    // 此时取消选中的条件是点到上次选中的那个节点
                                    if (that.selectedItem.length !== 0 && that.selectedItem[0].id === item.id) {
                                        that.clearSelection();
                                    }
                                    else {
                                        that.resetSelectedItem(item, id, 'node');
                                    }
                                }
                            }
                            break;
                        case 'edge':
                            item = that.savedgraph.links[id];
                            if (that.editmode === 'delete') {
                                const op = {
                                    option: 'delete',
                                    type: 'edge',
                                    dataIndex: id,
                                    data: item
                                };
                                that.editions.push(op);
                                that.deleteEdge(id);
                            }
                            else {
                                // 此时取消选中的条件是点到上次选中的那条边
                                if (that.selectedItem.length !== 0 && that.selectedItem[0].source === item.source && that.selectedItem[0].target === item.target) {
                                    that.clearSelection();
                                }
                                else {
                                    that.resetSelectedItem(item, id, 'edge');
                                }
                            }
                            break;

                        default:
                            break;
                    }
                })
            })
        },

        // 功能:重新设置选中对象
        resetSelectedItem(item, id, type) {
            this.selectedItem.length = 0;
            this.selectedItem.push(item);
            this.selectedItem[0].index = id;
            this.selectedType = type;
        },

        // 功能:清空选中
        clearSelection() {
            this.selectedItem = [];
            this.selectedType = '';
            this.cancelLoveButton = false;
            this.isMovie = false;
            this.isPerson = false;
        },

        // 功能:初始化各个配置并加载配置一
        initpage() {
            // 设置选项框为关系图
            $("#selector").val('关系图');

            let that = this

            // 如果传过来的link的source和target为数字，转化为对应的字符串(字符串对应ID，数字对应位置)
            for (let i = 0; i < that.savedgraph.links.length; i++) {
                let prop = that.savedgraph.links[i]
                prop.source = prop.source+""
                prop.target= prop.target+""
            }

            // 初始化index(索引)
            let index=0

            // 预存option1
            function setOption1(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // 如果确实zoom，添加zoom
                if(graph.zoom==null){
                    graph.zoom=1
                }

                // 为每个node添加相关属性
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

                // 重置index
                index = 0;

                // 为每个link添加相关属性
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++
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

                // 统计相关信息
                that.info = '统计:共有' + graph.nodes.length + '个节点,' + graph.links.length + '条边';

                // 配置option1
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
                            draggable: false,
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
                };
            }

            // 预存option2
            function setOption2(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // 设置较合适的zoom
                if(graph.nodes.length>=15 || graph.links.length>=30){
                    graph.zoom=3
                }
                else{
                    graph.zoom=0.6
                }

                // 重置index
                index = 0;

                // 为每个node添加相关属性
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // 重置index
                index = 0;

                // 为每个link添加相关属性
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // 配置option2
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
            }

            // 预存option3
            function setOption3(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // 重置index
                index = 0;

                // 为每个node添加相关属性
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // 重置index
                index = 0;

                // 为每个link添加相关属性
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // 配置option3
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
            }

            // 预存option4
            function setOption4(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // 设置较合适的zoom
                if(graph.nodes.length>=15 || graph.links.length>=30){
                    graph.zoom=1
                }
                else{
                    graph.zoom=0.6
                }

                // 重置index
                index = 0;

                // 为每个node添加相关属性
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // 重置index
                index = 0;

                // 为每个link添加相关属性
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // 按照类别进行y值的分配
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

                // 配置option4
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
            }

            setOption1()
            setOption2()
            setOption3()
            setOption4()

            that.cancelLoveButton = false;
            that.clearSelection();

            // 启用配置一
            that.value=1;
            that.changeTo(1)
        },

        // 功能:撤销改变布局中的操作
        revokeAction(){
            // len为已经操作的步骤数
            let len=this.previouschangeLayout.length

            // 如果有操作
            if(len>0) {
                // 记录index和上一步骤此点位置
                let dataIndex = this.previouschangeLayout[len - 1][0]
                let position = this.previouschangeLayout[len - 1][1]

                // 重设位置
                this.option1.series[0].data[dataIndex].x = position[0];
                this.option1.series[0].data[dataIndex].y = position[1];
                let tmpSeries=this.option1.series[0]

                // 更改savedgraph
                this.savedgraph={uid:tmpSeries.uid,nodes:tmpSeries.data,links:tmpSeries.links,categories:tmpSeries.categories,
                    itemStyle:tmpSeries.itemStyle,lineStyle:tmpSeries.lineStyle,pic_name:tmpSeries.pic_name,
                    label:tmpSeries.label,tooltip:tmpSeries.tooltip}

                // 启用变更，并重新绘制可拖拽圆点
                this.myChart.setOption(this.option1);
                this.updatePosition()

                // 删除此数组中最后一个
                this.previouschangeLayout.splice(len - 1)
            }
            else{
                this.$message.info("已撤销到底!")
            }
        },

        saveLayout(){
            this.$message.info("将上传至服务器")
            let tmpOption=this.myChart.getOption().series[0]

            let res={'pic_name':this.savedgraph.pic_name,'uid':this.uid,'center':tmpOption.center,
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

            $.ajax({
                url: 'http://47.99.190.169:8888/save',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("数据上传成功!")
                else console.log("数据上传失败")}
            })
        },

        fixLayoutChange(){
            if(this.changeLayout) {
                this.$message.info("关闭roam以方便操作!")

                // 如果目前roam开启
                if(this.isRoam){
                    this.fixRoam()
                }

                this.initInvisibleGraphic();
            }
            else{
                this.$message.info("开启roam!")
                this.previouschangeLayout=[]
                this.isRoam=false
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

        // 功能:在每个节点上覆盖一个圆形节点
        initInvisibleGraphic() {
            let that = this
            let echarts = require('echarts');

            // 绘制可拖拽圆点
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

        // 功能:更新节点定位的函数
        updatePosition() {
            let that=this
            let echarts = require('echarts');

            // 将圆点去除并关闭roam方便拖拽
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

            // 以下实现基本与"在每个节点上覆盖一个圆形节点"类似
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

        // 功能:节点上图层拖拽执行的函数
        onPointDragging(dataIndex) {
            let that=this

            let position=that.myChart.convertFromPixel({seriesIndex: 0},this.myChart.getOption().graphic[0].elements[dataIndex].position);

            // 将拖拽的节点index和之前位置存入响应数组
            this.previouschangeLayout.push([dataIndex,[this.option1.series[0].data[dataIndex].x,this.option1.series[0].data[dataIndex].y]]);

            // 更新位置
            this.option1.series[0].data[dataIndex].x = position[0];
            this.option1.series[0].data[dataIndex].y = position[1];

            // 拖拽结果存入savedgraph中
            let tmpSeries=this.option1.series[0]

            for(let i=0;i<tmpSeries.data.length;i++){
                tmpSeries.data[i].category=tmpSeries.categories[tmpSeries.data[i].category].name
            }

            this.savedgraph={uid:tmpSeries.uid,nodes:tmpSeries.data,links:tmpSeries.links,categories:tmpSeries.categories,
                itemStyle:tmpSeries.itemStyle,lineStyle:tmpSeries.lineStyle,pic_name:this.savedgraph.pic_name,
                label:tmpSeries.label,tooltip:tmpSeries.tooltip}

            // 启用变更
            this.myChart.setOption(that.option1)
            this.updatePosition()
        },

        // 功能:下拉框选择样式进行改变
        changeTo(value) {
            let that = this

            that.clearSelection()

            // 改变关系图样式
            function changeOption(option){
                // 启用变更
                that.myChart.setOption(option);

                // 设置展示效果中的相关属性
                that.changedSymbolSize=1;
                that.lastSymbolSize=1;
                if(option.series[0].lineStyle.curveness!=null)
                    that.changedCurveness=option.series[0].lineStyle.curveness;
                else
                    that.changedCurveness=option.series[0].links[0].lineStyle.curveness;
                if(option.series[0].label.fontSize!=null)
                    that.changedFontSize=option.series[0].label.fontSize;
                else
                    that.changedFontSize=option.series[0].data[0].label.fontSize;
                that.zoom_value=option.series[0].zoom
                that.zoom_old_value=option.series[0].zoom

                that.isRoam=false

                return true
            }

            that.myChart.clear();
            switch (value) {
                case 1:
                    that.nowOption=1
                    changeOption(that.option1);
                    return 1
                case 2:
                    that.nowOption=2
                    changeOption(that.option2);
                    return 2
                case 3:
                    that.nowOption=3
                    changeOption(that.option3);
                    return 3
                case 4:
                    that.nowOption=4
                    changeOption(that.option4);
                    return 4
            }




        },

        // 功能:检测并上传JSON
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

                    // 如果检测通过就上传
                    if (this.checkJson(tmpjson)) {
                        this.initpage()
                        let that=this
                        $.ajax({
                            url: 'http://47.99.190.169:8888/?pic_name=' + tmpjson.pic_name + '&uid='+this.uid,
                            type: 'get',
                            data: {},
                            dataType: 'json',
                            success: function (res) {
                                console.log(res)
                                if (res.content == null) {
                                    that.uploadJSON()
                                }
                                else{

                                    that.haveGraphInDatabase=true
                                    that.tmpgraph=res.content
                                    if (!('x' in that.tmpgraph.nodes[0]) || !('y' in that.tmpgraph.nodes[0])) {
                                        for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                                            let prop = that.tmpgraph.nodes[i]
                                            prop.x = 100 * Math.random()
                                            prop.y = 100 * Math.random()
                                        }
                                    }

                                    for (let i = 0; i < that.tmpgraph.links.length; i++) {
                                        let prop = that.tmpgraph.links[i]
                                        prop.source = prop.source+""
                                        prop.target= prop.target+""
                                    }

                                    if(tmpjson.pic_name === 'movie'){
                                        that.isMoviePic=true
                                    }
                                }
                            }
                        })
                    }
                }
            }
            return true
        },

        // 功能:判断是否导入数据库中的知识图谱
        importFromDatabase(bool){
            this.haveGraphInDatabase=false
            if(bool) {
                this.myChart.hideLoading();
                this.savedgraph = this.tmpgraph
                this.initpage()
            }
        },

        // 功能:保存布局，上传数据和样式
        uploadJSON(){
            let tmpOption=this.myChart.getOption().series[0]

            let res={'pic_name':this.savedgraph.pic_name,'uid':this.uid,'center':tmpOption.center,
                'zoom':tmpOption.zoom,'itemStyle':tmpOption.itemStyle,
                'lineStyle':tmpOption.lineStyle,'label':tmpOption.label,'tooltip':tmpOption.tooltip,
                'categories':tmpOption.categories,'nodes':tmpOption.data,'links':tmpOption.links}

            // 上传数据
            $.ajax({
                url: 'http://47.99.190.169:8888/save',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("数据上传成功!")
                else console.log("数据上传失败")}
            })

            // 上传样式
            $.ajax({
                url: 'http://47.99.190.169:8888/saveLayout',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("样式上传成功!")
                else console.log("样式上传失败")}
            })

            // 更新

            setTimeout(this.getUserGraph, 5000);
        },

        // 功能:校验JSON格式
        checkJson(tmpjson) {
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

            // links是否都包含了source和target
            for (let i = 0; i < tmpjson.links.length; i++) {
                let prop = tmpjson.links[i]
                if (!('source' in prop) || !('target' in prop)) {
                    this.$message.error('内容格式错误!(links是否都包含了source/target属性)');
                    return false
                }
            }

            // nodes是否都包含了name/symbolSize/category
            for (let i = 0; i < tmpjson.nodes.length; i++) {
                let prop = tmpjson.nodes[i]
                if (!('name' in prop) || !('symbolSize' in prop) || !('category' in prop)) {
                    this.$message.error('内容格式错误!(nodes是否都包含了name/symbolSize/category属性)');
                    return false
                }
            }

            // categories是否都包含了name属性
            for (let i = 0; i < tmpjson.categories.length; i++) {
                let prop = tmpjson.categories[i]
                if (!('name' in prop)) {
                    this.$message.error('内容格式错误!(categories是否都包含了name属性)');
                    return false
                }
            }

            // 判断nodes是否有x,y值,否则随机
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

        // 功能:提交在线编辑表单时的验证
        handleEdit(mode) {
            let that = this;
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
                    const tmp = that.savedgraph.links[that.input.index];
                    tmp.source = that.input.source;
                    tmp.target = that.input.target;
                    that.initpage();
                    that.updateDisplayedData();
                    that.selectedItem.push(that.savedgraph.links[that.input.index]);
                }
                else if (mode === 'node') {
                    const tmp = that.savedgraph.nodes[that.input.index];
                    tmp.name = that.input.name;
                    tmp.value = that.input.value;
                    tmp.symbolSize = that.input.symbolSize;
                    tmp.category = parseInt(that.input.category);
                    tmp.symbol = that.input.symbol;
                    tmp.x = that.input.x;
                    tmp.y = that.input.y;
                    that.initpage();
                    that.updateDisplayedData();
                    that.selectedItem.push(that.savedgraph.nodes[that.input.index]);
                }
            }
        },

        // 功能:开启通过查看数据进行在线编辑
        startEdit(mode) {
            let that = this;
            // input是被编辑的表单，节点或边通用
            that.input = {};
            let data = that.selectedItem[0];

            if (mode === 'node') {
                that.input = {
                    index: data.index,
                    id: data.id,
                    name: data.name,
                    category: data.category,
                    symbolSize: data.symbolSize,
                    value: data.value,
                    symbol: data.symbol,
                    x: data.x,
                    y: data.y
                }

            }
            else if (mode === 'edge') {
                that.input = {
                    index: data.index,
                    source: data.source,
                    target: data.target
                }
            }
            that.editable = true;
        },

        // 功能:通过查看数据进行节点/边的删除
        handleDelete(type) {
            let index = this.selectedItem[0].index
            if (type === 'node') {
                this.deleteNode(index);
            }
            else if (type === 'edge') {
                this.deleteEdge(index);
            }
            this.editable = false;
        },

        // 功能:通过查看数据进行的删除节点
        deleteNode(index) {
            this.savedgraph.nodes.splice(index, 1);
            this.clearSelection()
            this.initpage();
        },

        // 功能:通过查看数据进行的删除边
        deleteEdge(index) {
            this.savedgraph.links.splice(index, 1);
            this.clearSelection()
            this.initpage();
        },

        // 功能:通过查看数据进行的添加节点
        addNode() {
            let that = this;
            this.$refs['addNodeForm'].validate((valid) => {
                that.isValid(valid, 'node')
            })
        },

        // 功能:在第index位置添加节点item
        addNodeAt(index, item) {
            this.savedgraph.nodes.splice(index, 0, item);
            this.initpage()
        },

        // 功能:在第index位置添加边item
        addEdgeAt(index, item) {
            this.savedgraph.links.splice(index, 0, item);
            this.initpage();
        },

        // 功能:通过查看数据进行的添加节点/边的结果提交并修改相应图谱，valid为表单验证结果
        isValid(valid, mode) {
            let that = this;
            if (valid) {
                if (mode === 'node') {
                    const tmp = {
                        category: parseInt(that.addNodeForm.category),
                        name: that.addNodeForm.name,
                        symbolSize: that.addNodeForm.symbolSize,
                        id: that.savedgraph.nodes[that.savedgraph.nodes.length - 1].id + 1,
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
        },

        // 功能:在线编辑撤回
        backtrack() {
            let op = this.editions[this.editions.length - 1];
            if (!op) {
                this.$message.info("已撤销到底!")
                return;
            }
            if (op.option === 'delete') {
                let type = op.type;
                if (type === 'node') {
                    this.addNodeAt(op.dataIndex, op.data);
                }
                else if (type === 'edge') {
                     this.addEdgeAt(op.dataIndex, op.data);
                }
            }
            else if (op.option === 'add') {
                let type = op.type;
                if (type === 'node') {
                    this.deleteNode(op.dataIndex)
                }
                else if (type === 'edge') {
                    this.deleteEdge(op.dataIndex)
                }
            }
            console.log(this.savedgraph);
            this.editions.splice(this.editions.length - 1, 1);
        },

        // 功能:开启在线编辑
        startGraphicalEdit() {
            this.editmode = 'beginning';
            // 将当前图谱复制，用另一个变量存储，该变量保存的是退出编辑时的图谱形式
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.clearSelection()
        },

        // 功能:点击两节点生成新的边
        addEdgeOfSelectedNodes() {
            let that = this;
            const newEdge = {
                source: that.selectedItem[0].id,
                target: that.selectedItem[1].id,
                name: this.source + '->' + this.target,
            }
            that.savedgraph.links.push(newEdge);
            that.initpage();
            const op = {
                option: 'add',
                type: 'edge',
                data: newEdge,
                dataIndex: that.savedgraph.links.length - 1
            }
            that.editions.push(op)
        },

        // 功能:结束图形化编辑
        endGraphicalEdit() {
            // 恢复savedgraph为上一次保存（或未经修改）的版本copiedgraph，并将copiedgraph清空
            this.savedgraph = JSON.parse(JSON.stringify(this.copiedgraph));
            this.copiedgraph = '';
            this.editmode = 'none';
            this.clearSelection()
            this.initpage();
            console.log('end edit');
        },

        // 功能:保存编辑结果
        saveGraphicalEdit() {
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.uploadJSON();
            if (this.editions.length === 0) this.$message.info('毫无变化');
        },

        // 功能:添加新节点
        graphicalAddNode() {
            let that = this;
            this.$refs['graphicalAddNodeForm'].validate((valid) => {
                if (valid) {
                    alert('submit!')
                    // that.checkFormAndAdd();
                    const newNode = {
                        id: that.savedgraph.nodes[that.savedgraph.nodes.length - 1].id + 1,
                        name: that.graphicalAddNodeForm.name,
                        category: parseInt(that.graphicalAddNodeForm.category),
                        itemStyle: that.graphicalAddNodeForm.itemStyle,
                        symbolSize: that.graphicalAddNodeForm.symbolSize,
                        label: that.graphicalAddNodeForm.label,
                        x: that.graphicalAddNodeForm.x,
                        y: that.graphicalAddNodeForm.y,
                        pic_name: that.savedgraph.nodes[0].pic_name,
                        symbol: that.graphicalAddNodeForm.symbol,
                    };
                    if (newNode.x === '') {
                        newNode.x = Math.random() * 1000;
                    }
                    if (newNode.y === '') {
                        newNode.y = Math.random() * 1000;
                    }
                    if (that.graphicalAddNodeForm.value !== '') {
                        newNode.value = that.graphicalAddNodeForm.value;
                    }
                    that.savedgraph.nodes.push(newNode);
                    that.initpage();
                    this.$refs['graphicalAddNodeForm'].resetFields();
                    that.editmode = 'addNode';
                }
                else {
                    alert("error!")
                    return false;
                }
            })
        },


        // resetGraphicalAddNodeForm() {
        //     this.$refs['graphicalAddNodeForm'].resetFields();
        // },

        // 功能:节点搜索
        handleNodeSearch() {
            let that = this;
            this.$refs['searchNodeForm'].validate((valid) => {
                if (valid) {
                    let res = {
                        'pic_name': that.savedgraph.pic_name,
                        'uid': this.uid
                    };
                    if(that.searchNodeForm.name!==""){res['name']= that.searchNodeForm.name}
                    if(that.searchNodeForm.label!=="") {res['label']= that.searchNodeForm.label}
                    if(that.searchNodeForm.lowerbound!=="") {res['lowerBound']=that.searchNodeForm.lowerbound}
                    if(that.searchNodeForm.upperbound!=="") {res['upperBound']=that.searchNodeForm.upperbound}
                    $.ajax({
                        url: 'http://47.99.190.169:8888/node/find',
                        type: 'post',
                        data: JSON.stringify(res),
                        dataType: 'json',
                        contentType: 'application/json; charset=UTF-8',
                        success: function (r) {
                            console.log(r)
                            if (r.success) {
                                that.searchNodeHistory.push(res);
                                const nodes = r.content;
                                let opt = that.myChart.getOption();
                                opt.series[0].data.forEach((node) => {
                                    if (nodes.findIndex((item) => item.id === parseInt(node.id)) !== -1) {
                                        // 高亮符合搜索结果的节点，修改边框颜色为rgba(0,0,0,1)黑色
                                        if (node.itemStyle == null) {
                                            node.itemStyle = {
                                                borderWidth: 10,
                                                borderColor: "rgba(0, 0, 0, 1)"
                                            };
                                        }
                                        else {
                                            node.itemStyle.borderWidth = 10
                                            node.itemStyle.borderColor = "rgba(0, 0, 0, 1)"
                                        }
                                    }
                                })
                                that.myChart.setOption(opt);
                            }
                        }
                    })
                }
                else {
                    console.log('error!!')
                }
            })
        },

        // 功能:边搜索
        handleEdgeSearch() {
            let that = this;
            console.log(this.myChart.getOption().series[0])

            this.$refs['searchEdgeForm'].validate((valid) => {
                if (valid) {
                    console.log(that.searchEdgeForm);
                    const res = {
                        'pic_name': that.savedgraph.pic_name,
                        'uid': this.uid
                    };

                    if(that.searchEdgeForm.name!==""){res['name']=that.searchEdgeForm.name}
                    if(that.searchEdgeForm.source!==""){res['source']=that.searchEdgeForm.source}
                    if(that.searchEdgeForm.target!==""){res['target']=that.searchEdgeForm.target}

                    $.ajax({
                        url: 'http://47.99.190.169:8888/relationship/find',
                        type: 'post',
                        data: JSON.stringify(res),
                        dataType: 'json',
                        contentType: 'application/json; charset=UTF-8',
                        success: function (r) {
                            if (r.success) {
                                that.searchEdgeHistory.push(res);
                                const edges = r.content;
                                let opt = that.myChart.getOption();
                                opt.series[0].links.forEach((edge) => {
                                    if (edges.findIndex((item) => item.id === parseInt(edge.id)) !== -1) {
                                        // 高亮符合搜索结果的边，修改边框颜色为rgba(0,0,0,1)黑色
                                        if (edge.lineStyle == null) {
                                            edge.lineStyle = {
                                                width: 10,
                                                color: "rgba(0, 0, 0, 1)"
                                            };
                                        }
                                        else {
                                            edge.lineStyle.width = 10
                                            edge.lineStyle.color = "rgba(0, 0, 0, 1)"
                                        }
                                    }
                                })

                                that.myChart.setOption(opt);
                            }
                        }
                    })
                }
                else {
                    console.log('error!!')
                }
            })
        },

        // 功能:重置两个搜索表单
        resetSearchForm() {
            this.$refs['searchNodeForm'].resetFields();
            this.$refs['searchEdgeForm'].resetFields();
        },

        // 功能:设置编辑模式，目前有addNode, addEdge, delete, none(默认)
        setEditMode(mode) {
            this.$message.info('Now in ' + mode + ' mode');
            this.editmode = mode;
        },

        // 取消搜索表
        cancelSearch() {
            this.resetSearchForm();
            if(this.nowOption===1)this.myChart.setOption(this.option1);
            else if(this.nowOption===2)this.myChart.setOption(this.option2);
            else if(this.nowOption===3)this.myChart.setOption(this.option3);
            else if(this.nowOption===4)this.myChart.setOption(this.option4);
        },

        // 功能:获取用户所有的知识图谱
        getUserGraph() {
            let that = this
            $.ajax({
                url: 'http://47.99.190.169:8888/graphName?uid=' + this.uid,
                type: 'get',
                // data: {},
                dataType: 'json',
                success: function (res) {
                    // 过滤掉名字为空的数据，同时只保留名称
                    const graphs = res.content.map((pic) => pic["n.pic_name"]).filter((pic_name) => pic_name !== null);
                    let idx = graphs.findIndex((pic_name) => pic_name === 'movie')
                    console.log(graphs)
                    if (idx === -1) {
                        // 对于没有movie知识图谱的，自动生成一个空的知识图谱（）
                        graphs.unshift('movie')
                    }
                    else if (idx !== 0) {
                        graphs.splice(idx, 1)
                        graphs.unshift('movie')
                    }
                    that.usr_graph = graphs;
                }
            })
            that.graphChange++;
        },

        // 功能:选中对应知识图谱时调用冰
        selectGraph(index, indexPath) {
            if (indexPath[0] === 'user_graphs') {
                let that = this;
                let pic_name = this.usr_graph[Number(index)];

                // 这个请求这段用了前面一摸一样的 考虑拉出来自成一个方法
                $.ajax({
                    url: 'http://47.99.190.169:8888/?pic_name=' + pic_name + '&uid=' + this.uid,
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        if (!res.success) {
                            console.log(res)
                            if(pic_name==='movie'){
                                that.$notify.info({
                                    title: '电影知识图谱',
                                    message: '目前您还没有喜欢的电影!请前往网页右下方推荐区域开始你的旅途!'
                                });
                                that.$nextTick(() => {
                                that.$notify.info({
                                    title: '推荐操作',
                                    message: '点击"智能推荐电影"可切换为协同过滤推荐模式,点击知识图谱上的电影节点可切换到类似电影推荐!'
                                });
                                });
                            }
                            else {
                                that.$notify.error({
                                    title: '网络波动!',
                                    message: '目前暂时无法拉取图谱!请稍后重新尝试!'
                                });
                            }
                        }
                        else{
                            that.tmpgraph=res.content
                            if (!('x' in that.tmpgraph.nodes[0]) || !('y' in that.tmpgraph.nodes[0])) {
                                for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                                    let prop = that.tmpgraph.nodes[i]
                                    prop.x = 100 * Math.random()
                                    prop.y = 100 * Math.random()
                                }
                            }

                            for (let i = 0; i < that.tmpgraph.links.length; i++) {
                                let prop = that.tmpgraph.links[i]
                                prop.source = prop.source+""
                                prop.target= prop.target+""
                            }

                            if (pic_name === 'movie') {
                                that.$notify({
                                    title: '电影知识图谱',
                                    message: '欢迎进入!',
                                    type: 'success'
                                });
                                that.$nextTick(() => {
                                    that.$notify({
                                        title: '推荐操作',
                                        message: '点击"智能推荐电影"可切换为协同过滤推荐模式,点击知识图谱上的电影节点可切换到类似电影推荐!',
                                        type: 'success'
                                    });
                                });

                                // 存储已喜欢的电影ID
                                that.mids = []

                                for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                                    let prop = that.tmpgraph.nodes[i]
                                    if (prop.category === 'movie') {
                                        that.mids.push(prop.mid)
                                    }
                                }

                            }
                            that.savedgraph = that.tmpgraph
                            that.initpage()
                        }
                        if(pic_name==='movie'){
                            that.isMoviePic=true
                            that.showUserPic()
                            that.recommendGet(that.uid)
                        }
                        else{
                            that.isMoviePic=false
                        }
                    }
                })
            }
            else if (indexPath[0] === 'logout') {
                this.logout()
            }
        },

        // 功能:点电影节点取消喜欢
        cancelLLoveNode() {
            let that = this;
            // 调后端接口取消喜欢
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/unlike?id=' + that.selectedItem[0].id + '&uid=' + that.uid,
                type: 'get',
                success: function (res) {
                    if (res.success) {
                        console.log('取消喜欢成功!')
                        // // 调用接口重新获取电影知识图谱
                        that.getMovie()

                    } else {
                        console.log('取消喜欢失败!')
                    }

                }
            })
        },

        // 功能:发送询问信息
        dealMessage() {
            let this_=this
            this_.message_array.push({message:"Question: "+this.Message.message,from:0});
            this_.tmpMessage=this_.Message.message
            console.log(this.Message.message)
            $.ajax({
                url:'http://47.99.190.169:8888/movie/answer' + '?question=' + this.Message.message,
                type:'GET',
                success: function (params){
                    if(params.success){
                        console.log(params)
                        if(params.content.length!==0){
                            let i=0
                            while(i<params.content.length){
                                if(params.content[i]["m.showtime"]!==null&&params.content[i]["m.showtime"]!==undefined){
                                    this_.message_array.push({message:"上映时间: " + params.content[i]["m.showtime"] ,from:1});
                                }else if(params.content[i]["m.rate"]!==null&&params.content[i]["m.rate"]!==undefined){
                                    this_.message_array.push({message:"电影评分: " + params.content[i]["m.rate"] ,from:1});
                                }else if(params.content[i]["count(m)"]!==null&&params.content[i]["count(m)"]!==undefined){
                                    this_.message_array.push({message:"电影数量: " + params.content[i]["count(m)"],from:1});
                                }else if(params.content[i]["m.othername"]!==null&&params.content[i]["m.othername"]!==undefined){
                                    this_.message_array.push({message:"电影别名: " + params.content[i]["m.othername"] ,from:1});
                                }else if(params.content[i]["m.url"]!==null&&params.content[i]["m.url"]!==undefined){
                                    this_.message_array.push({message:"电影详情: " + params.content[i]["m.url"] ,from:1});
                                }else if(params.content[i]["m.length"]!==null&&params.content[i]["m.length"]!==undefined){
                                    this_.message_array.push({message:"电影长度: " + params.content[i]["m.length"] ,from:1});
                                }else if(params.content[i]["m.language"]!==null&&params.content[i]["m.language"]!==undefined){
                                    this_.message_array.push({message:"电影语言: " + params.content[i]["m.language"] ,from:1});
                                }else if(params.content[i]["m.district"]!==null&&params.content[i]["m.district"]!==undefined){
                                    this_.message_array.push({message:"电影地区: " + params.content[i]["m.district"] ,from:1});
                                }else if(params.content[i].m!==null&&params.content[i].m!==undefined){
                                    let temp="电影名字: "+params.content[i].m.name + "\n" + "电影别名: " + params.content[i].m.othername +"\n" + "电影地区: " + params.content[i].m.district +"\n" + "电影题材: " + params.content[i].m.genre+ "\n" + "上映时间: " + params.content[i].m.showtime+ "\n" + "电影长度: " + params.content[i].m.length +"\n" + "电影评分: " + params.content[i].m.rate+ "\n" + "电影语言: " + params.content[i].m.language+ "\n" + "电影详情: " + params.content[i].m.url
                                    this_.message_array.push({message:temp ,from:1});
                                }else if(params.content[i].g!==null&&params.content[i].g!==undefined){
                                    this_.message_array.push({message:"题材对象: " + params.content[i].g.name ,from:1});
                                }else if(params.content[i].p!==null&&params.content[i].p!==undefined){
                                    let temp2="演员: " + params.content[i].p.name + "\n" + "演员评分: " + params.content[i].p.rate
                                    this_.message_array.push({message:temp2 ,from:1});
                                }
                                this_.$nextTick(() => {
                                    let msg = document.getElementById('bottom') // 获取对象
                                    msg.scrollTop = msg.scrollHeight // 滚动高度
                                })
                                i++
                            }
                        }else {
                            this_.message_array.push({message:"Answer: Not Found",from:1});
                            this_.$nextTick(() => {
                                let msg = document.getElementById('bottom') // 获取对象
                                msg.scrollTop = msg.scrollHeight // 滚动高度
                            })
                        }
                        //this.message_array.push({message:"Answer: "+params.content,from:1});

                    }else{
                        console.log("Answer: Error")
                        this_.message_array.push({message:"Answer: Error",from:1});
                    }
                }
            })
            this_.isAnswered=true
            this_.$nextTick(() => {
                let msg = document.getElementById('bottom') // 获取对象
                msg.scrollTop = msg.scrollHeight // 滚动高度
            })
            this.Message.message='';
        },

        //差评
        badAnswer(){
            let this_=this
            console.log(this_.tmpMessage)
            $.ajax({
                url:'http://47.99.190.169:8888/movie/feedback' + '?question=' + this_.tmpMessage,
                type:'GET',
                success: function (params){
                    console.log(params)
                }
            })
            this_.isAnswered=false
        },

        initialJSONUpload(file) {
            this.beforeJSONUpload(file);
            this.initialDialog = false;
        },

        logout(){
            this.$router.replace("/")
        }
    },

}
