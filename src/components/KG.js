import $ from 'jquery'
const ROOT_PATH = 'https://figureair.github.io/data/les-miserables.json';

export default {
    name: "KG",
    data() {
        return {
            message_array:[],
            message:'',
            isPerson:false,
            isMovie:false,
            mids:[1701],
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
            userinfo: {"movie": [{
                    "rate": 0,
                    "showtime": 0,
                    "length": 0,
                    "name": "",
                    "id": 0,
                    "category": ""
                }], "genre": [
                    {
                        "num": 0,
                        "genre": "犯罪"
                    },
                    {
                        "num": 0,
                        "genre": "恐怖"
                    },
                    {
                        "num": 0,
                        "genre": "惊悚"
                    },
                    {
                        "num": 0,
                        "genre": "喜剧"
                    },
                    {
                        "num": 0,
                        "genre": "剧情"
                    },
                    {
                        "num": 0,
                        "genre": "爱情"
                    },
                    {
                        "num": 0,
                        "genre": "动作"
                    },
                    {
                        "num": 0,
                        "genre": "悬疑"
                    },
                    {
                        "num": 0,
                        "genre": "奇幻"
                    }
                ]},

            // recommend 相关变量

            // 判断是用户推荐和电影推荐
            recommendUser:true,
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
            recommendByUser:[{
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

            graph_readOnly: false,
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

        // 方便刷新暂用
        if (!this.uid) {
            this.uid = 5;
        }

        console.log('uid: ' + this.uid)
        this.getUserGraph()
        this.initdata()

        this.showUserPic()
        this.recommendGet(this.uid)


    },

    methods: {

        // 获取电影知识图谱
        getMovie(){

            let that=this

            // 调用接口获取图谱
            $.ajax({
                url: 'http://47.99.190.169:8888/?pic_name=movie' + '&uid='+that.uid,
                type: 'get',
                success: function (res) {
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

                    that.savedgraph = that.tmpgraph
                    console.log(that.tmpgraph)

                    // 存储已喜欢的电影ID
                    that.mids=[]
                    for(let i=0;i<that.tmpgraph.nodes.length;i++){
                        let prop = that.tmpgraph.nodes[i]
                        if(prop.category==='movie'){that.mids.push(prop.mid)}
                    }

                    that.initpage()
                }
            })
        },

        // 取消喜欢
        handleLoveCancel(movie){

            let that=this

            let unlike_id=-1

            for(let i=0;i<that.savedgraph.nodes.length;i++){
                if(that.savedgraph.nodes[i].category==='movie'){
                    if(that.savedgraph.nodes[i].mid===movie.id){
                        unlike_id=that.savedgraph.nodes[i].id
                        break
                    }
                }
            }

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
                            console.log('取消喜欢失败!')
                        }
                    }
                })
            }
        },

        // 点击喜欢
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
                        console.log('喜欢失败!')
                    }
                }
            })

        },

        // 获取推荐列表
        recommendGet(id){
            let that=this
            if(this.recommendUser) {
                // 调用接口
                $.ajax({
                    url: 'http://47.99.190.169:8888/movie/recommend/u?uid='+id,
                    type: 'get',
                    success: function (res) {
                        if(res.content.rec.length!==0) {
                            // 添加like属性,判断电影是否在知识图谱中
                            that.recommendByUser = res.content.rec
                            for (let i = 0; i < that.recommendByUser.length; i++) {
                                if (that.recommendByUser[i]['id'] in that.mids) {
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
                        }
                    }
                })


            }
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
                                if (that.recommendByMovie[i]['id'] in that.mids) {
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
                        }
                    }
                })
            }

            // 重新渲染
            that.recommendCount++

        },

        // 点击换一换，切换推荐
        recommendChange(){
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
            /// 重新渲染
            this.recommendCount++
        },

        // 用户画像生成
        showUserPic(){

            let that=this

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
                                normal: {
                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }
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
                that.avgLength=totalLength/that.userinfo['movie'].length
                let lengthsData = [{name: '100分钟以下', value: lengths['100分钟以下']}, {name: '100~110分钟', value: lengths['100~110分钟']}, {
                    name: '110~120分钟', value: lengths['110~120分钟']}, {name: '120分钟以上', value: lengths['120分钟以上']}]

                //生成时长饼图
                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic2');
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
                                normal: {
                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }
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

            function showtimeShow(){
                // 统计各个年代区间的数量并计算最新最老电影
                let showtimes={'2000年以前':0,'2000~2010年':0,'2010~2020年':0,'2020年以后':0}
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    that.oldShowtime=Math.min(that.oldShowtime,that.userinfo['movie'][i]['showtime'])
                    that.newShowtime=Math.max(that.newShowtime,that.userinfo['movie'][i]['showtime'])
                    if(that.userinfo['movie'][i]['showtime']<2000){
                        showtimes['2000年以前']=showtimes['2000年以前']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2010){
                        showtimes['2000~2010年']=showtimes['2000~2010年']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2020){
                        showtimes['2010~2020年']=showtimes['2010~2020年']+1
                    }
                    else{
                        showtimes['2020年以后']=showtimes['2020年以后']+1
                    }

                }

                let showtimesData = [{name: '2000年以前', value: showtimes['2000年以前']}, {name: '2000~2010年', value: showtimes['2000~2010年']}, {
                    name: '2010~2020年', value: showtimes['2010~2020年']}, {name: '2020年以后', value: showtimes['2020年以后']}]

                //生成年代饼图
                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic3');
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
                                normal: {
                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }
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

            function genreShow(){
                let genreData=[]
                for (let i=0;i<that.userinfo['genre'].length;i++)
                {
                    genreData.push({'name':that.userinfo['genre'][i].genre,'value':parseInt(that.userinfo['genre'][i].num)})
                }

                let echarts = require('echarts');
                let chartDom = document.getElementById('user_pic4');
                let userPic4 = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF','#1aff00','#ff0000']

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
                                normal: {
                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }
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
                    that.userinfo=res.content
                    rateShow()
                    lengthShow()
                    showtimeShow()
                    genreShow()
                }
            })
        },

        // 演员图表生成
        showInfoPic(name){
            let that=this

            // 生成图表方法
            function createPic() {
                let personData = []
                for (let i = 0; i < that.person['genre'].length; i++) {
                    personData.push({'name': that.person['genre'][i].genre, 'value': parseInt(that.person['genre'][i].num)})
                }

                let echarts = require('echarts');
                let chartDom = document.getElementById('person_pic');
                let personPic = echarts.init(chartDom);

                let colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF', '#1aff00', '#ff0000']

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
                                normal: {
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
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
                                normal: {
                                    length: 10,
                                    length2: 20,
                                    lineStyle: {
                                        width: 1
                                    }
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
                    that.person=res.content
                    that.isPerson=true
                    createPic()
                }
            })


        },

        // 电影信息展示
        showMovieInfo(id){
            let that=this
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/info?id='+id,
                type: 'get',
                success: function (res) {
                    that.movie=res.content

                    // 生成主演字符串
                    for(let i=0;i<that.movie.actor.length-1;i++){
                        that.actors=that.actors+that.movie.actor[i]+'、'
                    }
                    that.actors=that.actors+that.movie.actor[that.movie.actor.length-1]
                    that.isMovie=true
                }
            })
        },

        gobackZoom(){
            this.myChart.setOption({
                series:{
                    center:null,
                    zoom:this.old_value4
                }
            })
            this.value4=this.old_value4
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
            for (let i=0;i<this.option1.series[0].links.length;i++) {
                if(tmpcurveness[i].lineStyle==null)tmpcurveness[i].lineStyle={curveness:this.value1}
                else tmpcurveness[i].lineStyle.curveness = this.value1;
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

        checkLabel (rule, value, callback) {
            console.log(value);
            callback();
        },

        checkPosition (rule, value, callback) {
            if (value === '') {
                callback();
            }
            if (isNaN(value)) {
                callback(new Error("请输入数字"))
            }
            callback();
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
                    // console.log(event);
                    let id = event.data.index;
                    let item;
                    switch (event.dataType) {
                        case 'node':
                            item = that.savedgraph.nodes[id];
                            // console.log(item);
                            if (that.editmode === 'delete') {
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
                                        that.selectedItem = [];
                                        that.selectedType = '';
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
                                    if (that.selectedItem.length !== 0) {
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
                                    console.log(item);
                                    switch (item.category) {
                                        case 'movie':
                                            that.showMovieInfo(item.mid);
                                            that.recommendUser = false;
                                            that.recommendGet(item.mid);
                                            break;
                                        case 'person':
                                            that.showInfoPic(item.name);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                else {
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
                            // console.log(that.savedgraph)
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

        resetSelectedItem(item, id, type) {
            this.selectedItem.length = 0;
            this.selectedItem.push(item);
            this.selectedItem[0].index = id;
            this.selectedType = type;
        },

        clearSelection() {
            this.selectedItem = [];
            this.selectedType = '';
        },

        initpage() {
            $("#selector").val('关系图');

            let that = this

            for (let i = 0; i < that.savedgraph.links.length; i++) {
                let prop = that.savedgraph.links[i]
                prop.source = prop.source+""
                prop.target= prop.target+""
            }

            let index=0
            //初始设置为option1
            let graph = JSON.parse(JSON.stringify(that.savedgraph))
            if(graph.zoom==null){
                graph.zoom=1
            }
            console.log(graph)
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
            that.info = '统计:共有' + graph.nodes.length + '个节点,' + graph.links.length + '条边';
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


            //预存option2
            graph = JSON.parse(JSON.stringify(that.savedgraph))
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
                if (link.id == null){
                    link.id=index+''
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
                if (link.id == null){
                    link.id=index+''
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
                if (link.id == null){
                    link.id=index+''
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

            console.log(that.option1)
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

                                    that.graph_readOnly = tmpjson.pic_name === 'movie'
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
                this.myChart.hideLoading();
                this.savedgraph = this.tmpgraph
                this.initpage()
            }
        },

        uploadJSON(){
            let tmpOption=this.myChart.getOption().series[0]

            let res={'pic_name':this.savedgraph.pic_name,'uid':this.uid,'center':tmpOption.center,
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

        handleEdit(mode) {
            let that = this;
            // console.log(this.input)
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

        startEdit(mode) {
            let that = this;
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

        deleteNode(index) {
            this.savedgraph.nodes.splice(index, 1);
            this.selectedType = '';
            this.selectedItem = [];
            this.initpage();
        },

        deleteEdge(index) {
            this.savedgraph.links.splice(index, 1);
            this.selectedType = '';
            this.selectedItem = [];
            this.initpage();
        },

        addNode() {
            let that = this;
            this.$refs['addNodeForm'].validate((valid) => {
                that.isValid(valid, 'node')
            })
        },

        addNodeAt(index, item) {
            this.savedgraph.nodes.splice(index, 0, item);
            this.initpage()
        },

        addEdgeAt(index, item) {
            this.savedgraph.links.splice(index, 0, item);
            this.initpage();
        },

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

        deleteHistory(e) {
            console.log(e);
        },

        // 在线编辑撤回
        backtrack() {
            console.log(this.editions)
            console.log(this.savedgraph)
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
                    // console.log(op);
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
            // this.initpage();
        },

        // 开启在线编辑
        startGraphicalEdit() {
            this.editmode = 'beginning';
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.selectedItem = [];
            this.selectedType = '';
        },

        addEdgeOfSelectedNodes() {
            let that = this;
            // source跟target是id？
            const newEdge = {
                source: that.selectedItem[0].id,
                target: that.selectedItem[1].id,
                name: this.source + '->' + this.target,
            }
            console.log("line 1703")
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

        endGraphicalEdit(e) {
            console.log(e);
            this.savedgraph = JSON.parse(JSON.stringify(this.copiedgraph));
            this.copiedgraph = '';
            this.editmode = 'none';
            console.log(this.savedgraph)
            this.selectedItem = [];
            this.selectedType = '';
            this.initpage();
            console.log('end edit');
        },

        // 保存编辑结果
        saveGraphicalEdit(e) {
            console.log(e);
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.uploadJSON();
            if (this.editions.length === 0) this.$message.info('毫无变化');
            console.log("save and upload")
        },

        addTypeCheck(type) {
            this.editmode = 'add';
            console.log(type);
        },

        // 添加新节点
        graphicalAddNode() {
            let that = this;
            this.$refs['graphicalAddNodeForm'].validate((valid) => {
                if (valid) {
                    alert('submit!')
                    // console.log(that.graphicalAddNodeForm)
                    that.checkFormAndAdd();
                }
                else {
                    alert("error!")
                    console.log('error!!!!!!!');
                    return false;
                }
            })
        },

        checkFormAndAdd() {
            let that = this;
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
            console.log(newNode)
            that.savedgraph.nodes.push(newNode);
            that.initpage();
            that.resetGraphicalAddNodeForm();
            that.editmode = 'addNode';
        },

        resetGraphicalAddNodeForm() {
            this.$refs['graphicalAddNodeForm'].resetFields();
        },

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
                    console.log(res);
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
                                console.log('11111')
                                console.log(opt)
                                console.log(nodes)
                                console.log('11111')
                                opt.series[0].data.forEach((node) => {
                                    if (nodes.findIndex((item) => item.id === parseInt(node.id)) !== -1) {
                                        console.log(node)
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
                                // that.resetSearchForm();
                            }
                        }
                    })
                }
                else {
                    console.log('error??!!')
                }
            })
        },

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

                    console.log(res);

                    $.ajax({
                        url: 'http://47.99.190.169:8888/relationship/find',
                        type: 'post',
                        data: JSON.stringify(res),
                        dataType: 'json',
                        contentType: 'application/json; charset=UTF-8',
                        success: function (r) {
                            console.log(r)
                            if (r.success) {
                                that.searchEdgeHistory.push(res);
                                const edges = r.content;
                                console.log(edges)
                                let opt = that.myChart.getOption();
                                opt.series[0].links.forEach((edge) => {
                                    if (edges.findIndex((item) => item.id === parseInt(edge.id)) !== -1) {
                                        console.log(edge)
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
                                // that.resetSearchForm();
                            }
                        }
                    })
                }
                else {
                    console.log('error??!!')
                }
            })
        },

        resetSearchForm() {
            this.$refs['searchNodeForm'].resetFields();
            this.$refs['searchEdgeForm'].resetFields();
        },

        setEditMode(mode) {
            this.$message.info('Now in ' + mode + ' mode');
            this.editmode = mode;
        },

        cancelSearch() {
            this.resetSearchForm();
            if(this.nowOption===1)this.myChart.setOption(this.option1);
            else if(this.nowOption===2)this.myChart.setOption(this.option2);
            else if(this.nowOption===3)this.myChart.setOption(this.option3);
            else if(this.nowOption===4)this.myChart.setOption(this.option4);
        },

        getUserGraph() {
            let that = this
            $.ajax({
                url: 'http://47.99.190.169:8888/graphName?uid=' + this.uid,
                type: 'get',
                // data: {},
                dataType: 'json',
                success: function (res) {
                    const graphs = res.content.map((pic) => pic["n.pic_name"]).filter((pic_name) => pic_name !== null);
                    if (graphs != null) {
                        that.usr_graph = graphs;
                    }
                }
            })
        },

        selectGraph(index, indexPath) {
            if (indexPath[0] === '1') {
                let that = this;
                let pic_name = this.usr_graph[Number(index)];
                // 这个请求这段用了前面一摸一样的 考虑拉出来自成一个方法
                $.ajax({
                    url: 'http://47.99.190.169:8888/?pic_name=' + pic_name + '&uid=' + this.uid,
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        console.log(res)
                        if (res.content == null) {
                            //that.uploadJSON()
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

                            that.graph_readOnly = pic_name === 'movie'
                            if (pic_name === 'movie') {
                                // 很多变量要重置，到时改
                            }
                        }
                    }
                })
            }
        },

        // 点电影节点取消喜欢
        cancelLLoveNode() {
            let that = this;
            $.ajax({
                url: 'http://47.99.190.169:8888/movie/unlike?id=' + that.selectedItem[0].mid + '&uid=' + that.uid,
                type: 'get',
                success: function (res) {
                    if (res.success) {
                        console.log('取消喜欢成功!')
                        //
                        // // 设置对应电影like属性
                        // movie.like = 0
                        //
                        // // 调用接口重新获取电影知识图谱
                        that.getMovie()
                    } else {
                        console.log('取消喜欢失败!')
                    }
                }
            })
        },

        //滚动条到底部
        scrollBottm() {
            let el = this.$refs["chat-box"];
            el.scrollTop = el.scrollHeight;
        },

        //发送询问信息
        dealMessage() {
            this.message_array.push("Question: "+this.message);
            let params={'message':this.message}
            $.ajax({
                url:'',
                type:'POST',
                dataType:'json',
                data:JSON.stringify(params),
                contentType:'application/json; charset=UTF-8',
                success: function (params){
                    if(params.success){
                        console.log("Answer: "+params.content)
                        this.message_array.push("Answer: "+params.content);
                    }else{
                        console.log("Answer: Not found")
                        this.message_array.push("Answer: Not found");
                    }
                }
            })
        },

        // 暂时没用
        clapLoveNode() {

        },
    }
}