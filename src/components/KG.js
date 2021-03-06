import $ from 'jquery'
// const ROOT_PATH = 'https://figureair.github.io/data/les-miserables.json';

export default {
    name: "KG",
    data() {
        return {
            isShowRecommend:false,
            activePart:1,
            QAID:0,
            QALikeShow:false,
            helpShow:1,
            ifRecommendAgain:true,
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
            MessageRules: {
                message: [
                    { validator: this.checkMessage, trigger: 'blur'}
                ]
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

            // recommend ????????????

            // ????????????????????????????????????
            recommendUser:true,
            // ?????????????????????????????????????????????
            recommendOther:false,
            // ?????????????????????????????????index
            recommendByUserIndex:0,
            recommendByMovieIndex:0,
            // ?????????????????????
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
            // ??????????????????
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
            // ?????????????????????
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
            //??????????????????????????????????????????????????????????????????
            // 1.?????????
            option1: '',
            //2.????????????
            option2: '',
            //3.???????????????
            option3: '',
            //4.????????????
            option4:'',
            options: [{
                value: 1,
                label: '?????????'
            }, {
                value: 2,
                label: '????????????'
            }, {
                value: 3,
                label: '???????????????'
            },{
                value:4,
                label:'????????????'
            }],
            value: '',
            dialogVisible: false,
            editable: false,
            selectedType: 'edge',
            selectedItem: [
                {
                    "name": "??????",
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
            help_list1: [
                {id:0, image:require("../img/help-01-01.png")},
                {id:1, image:require("../img/help-01-02.png")},
            ],
            help_list2: [
                {id:0, image:require("../img/help-02-01.png")},
                {id:1, image:require("../img/help-02-02.png")},
            ],
            help_list3: [
                {id:0, image:require("../img/help-03-01.png")},
            ],
            help_list4: [
                {id:0, image:require("../img/help-04-01.png")},
            ],
            help_list5: [
                {id:0, image:require("../img/help-05-01.png")},
                {id:1, image:require("../img/help-05-02.png")},
                {id:2, image:require("../img/help-05-03.png")},
                {id:3, image:require("../img/help-05-04.png")},
            ],
            help_list6: [
                {id:0, image:require("../img/help-06-01.png")},
                {id:1, image:require("../img/help-06-02.png")},
                {id:2, image:require("../img/help-06-03.png")},
                {id:3, image:require("../img/help-06-04.png")},
                {id:4, image:require("../img/help-06-05.png")},
                {id:5, image:require("../img/help-06-06.png")},
            ],
            help_list7: [
                {id:0, image:require("../img/help-07-01.png")},
            ],
            help_list8: [
                {id:0, image:require("../img/help-08-01.png")},
            ],

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
                '??????',
                '???'
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
                    { required: true, trigger: 'change', message: '???????????????????????????'}
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

        // ??????????????????
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

        showRecommend(){
          this.isShowRecommend=!this.isShowRecommend;
        },

        changePart(index){
            this.activePart=index
        },

        // ??????:?????????????????????
        openNotify() {

            this.$notify({
                title: '????????????!',
                message: '???????????????????????????????????????!???????????????????????????????????????!',
                type: 'success'
            });
        },

        // ??????:????????????
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

        // ??????:???????????????????????????????????????
        changeUserAndOther(){
          this.recommendOther=!this.recommendOther
        },

        // ??????:????????????????????????
        getMovie(){
            let that=this

            // ??????:getMovie?????????person???recommend??????
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

            // ????????????????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/?pic_name=movie' + '&uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.content!==null) {
                        // ?????????????????????
                        that.tmpgraph = res.content

                        // ??????????????????????????????????????????
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

                        // ??????savedgraph
                        that.savedgraph = that.tmpgraph

                        // ????????????????????????ID
                        that.mids = []
                        for (let i = 0; i < that.tmpgraph.nodes.length; i++) {
                            let prop = that.tmpgraph.nodes[i]
                            if (prop.category === 'movie') {
                                that.mids.push(prop.mid)
                            }
                        }

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

        // ??????:????????????
        handleLoveCancel(movie){
            let that=this

            // ????????????????????????????????????id
            let unlike_id=-1

            // ????????????????????????????????????????????????id
            for(let i=0;i<that.savedgraph.nodes.length;i++){
                if(that.savedgraph.nodes[i].category==='movie'){
                    if(that.savedgraph.nodes[i].mid===movie.id){
                        unlike_id=that.savedgraph.nodes[i].id
                        break
                    }
                }
            }

            // ???????????????????????????????????????????????????
            if(unlike_id>0) {

                // ???????????????????????????id
                $.ajax({
                    url: 'http://192.168.137.1:8888/movie/unlike?id=' + unlike_id + '&uid=' + that.uid,
                    type: 'get',
                    success: function (res) {
                        if (res.success) {
                            console.log('??????????????????!')

                            // ??????????????????like??????
                            movie.like = 0

                            // ??????????????????????????????????????????
                            that.getMovie()
                        } else {
                            movie.like = 1
                            console.log('??????????????????!')
                        }
                    }
                })
            }
        },

        // ??????:????????????
        handleLoveClap(movie){

            let that=this

            // ???????????????????????????id
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/like?id='+movie.id+'&uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.success){
                        console.log('????????????!')

                        // ??????????????????like??????
                        movie.like=1

                        // ??????????????????????????????????????????
                        that.getMovie()
                    }
                    else{
                        movie.like=0
                        console.log('????????????!')
                    }
                }
            })

        },

        // ??????:??????????????????
        recommendGet(id){
            let that=this

            // ???????????????????????????
            if(this.recommendUser) {
                // ????????????????????????????????????
                $.ajax({
                    url: 'http://192.168.137.1:8888/movie/recommend/u?uid='+id,
                    type: 'get',
                    success: function (res) {
                        if(res.content.rec.length!==0) {

                            // ??????like??????,????????????????????????????????????,??????????????????
                            that.recommendByUser = res.content.rec
                            for (let i = 0; i < that.recommendByUser.length; i++) {
                                if (that.mids.indexOf(that.recommendByUser[i]['id'])!==-1) {
                                    that.recommendByUser[i]['like'] = 1
                                } else {
                                    that.recommendByUser[i]['like'] = 0
                                }
                            }
                            that.recommendByUserShow=[]
                            // ?????????????????????????????????
                            for (let i = 0; i < 3; i++) {
                                that.recommendByUserIndex = i
                                that.recommendByUserShow.push(that.recommendByUser[i])
                            }

                            // ??????key???????????????
                            that.recommendCount++
                        }
                        else{
                            $.ajax({
                                url: 'http://192.168.137.1:8888/movie/recommend/r',
                                type: 'get',
                                success: function (res) {
                                    if(res.content.rec.length!==0) {
                                        // ??????like??????,????????????????????????????????????,??????????????????
                                        that.recommendByUser = res.content.rec
                                        for (let i = 0; i < that.recommendByUser.length; i++) {
                                            if (that.mids.indexOf(that.recommendByUser[i]['id'])!==-1) {
                                                that.recommendByUser[i]['like'] = 1
                                            } else {
                                                that.recommendByUser[i]['like'] = 0
                                            }
                                        }
                                        that.recommendByUserShow = []
                                        // ?????????????????????????????????
                                        for (let i = 0; i < 3; i++) {
                                            that.recommendByUserIndex = i
                                            that.recommendByUserShow.push(that.recommendByUser[i])
                                        }

                                        // ??????key???????????????
                                        that.recommendCount++
                                    }
                                }
                            })
                        }
                    }
                })

                // ??????????????????????????????????????????
                $.ajax({
                    url: 'http://192.168.137.1:8888/movie/recommend/o?uid='+id,
                    type: 'get',
                    success: function (res) {
                        if(res.content.rec.length!==0) {
                            // ??????like??????,????????????????????????????????????,??????????????????
                            that.recommendByOther = res.content.rec
                            for (let i = 0; i < that.recommendByOther.length; i++) {
                                if (that.mids.indexOf(that.recommendByOther[i]['id'] )!==-1) {
                                    that.recommendByOther[i]['like'] = 1
                                } else {
                                    that.recommendByOther[i]['like'] = 0
                                }
                            }

                            // ??????key???????????????
                            that.recommendCount++

                        }
                    }
                })
            }
            // ???????????????????????????
            else{
                // ????????????
                $.ajax({
                    url: 'http://192.168.137.1:8888/movie/recommend/m?id='+id,
                    type: 'get',
                    success: function (res) {
                        if (res.content.rec.length !== 0) {
                            // ??????like??????,????????????????????????????????????
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
                            // ?????????????????????????????????
                            for (let i = 0; i < 3; i++) {
                                that.recommendByMovieIndex = i
                                that.recommendByMovieShow.push(that.recommendByMovie[i])
                            }

                            // ??????key???????????????
                            that.recommendCount++
                        }
                    }
                })
            }

        },

        // ??????:??????????????????
        recommendAgain(){
            this.recommendGet(this.uid);
        },

        // ??????:??????????????????????????????
        recommendChange(){
            // ?????????????????????
            if(this.recommendUser){
                // ???????????????????????????
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
            // ?????????????????????
            else{
                // ???????????????????????????
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
            // ??????key???????????????
            this.recommendCount++
        },

        // ??????:??????????????????
        showUserPic(){
            let that=this

            // ?????????????????????
            function rateShow(){
                // ??????????????????????????????????????????????????????
                let rates={'8?????????':0,'6~8???':0,'4~6???':0,'4?????????':0}
                let totalRate=0
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    totalRate+=that.userinfo['movie'][i]['rate']
                    if(that.userinfo['movie'][i]['rate']<4){
                        rates['4?????????']=rates['4?????????']+1
                    }
                    else if(that.userinfo['movie'][i]['rate']<6){
                        rates['4~6???']=rates['4~6???']+1
                    }
                    else if(that.userinfo['movie'][i]['rate']<8){
                        rates['6~8???']=rates['6~8???']+1
                    }
                    else{
                        rates['8?????????']=rates['8?????????']+1
                    }

                }
                that.avgRate=(totalRate/that.userinfo['movie'].length).toFixed(2)
                let ratesData = [{name: '8?????????', value: rates['8?????????']}, {name: '6~8???', value: rates['6~8???']}, {
                    name: '4~6???', value: rates['4~6???']}, {name: '4?????????', value: rates['4?????????']}]

                //??????????????????
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
                        text: '???????????????',
                        top:'0%',
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
                        formatter: "{b}: {c}??? ({d}%)"
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

            // ?????????????????????
            function lengthShow(){
                // ??????????????????????????????????????????????????????
                let lengths={'100????????????':0,'100~110??????':0,'110~120??????':0,'120????????????':0}
                let totalLength=0
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    totalLength+=that.userinfo['movie'][i]['length']
                    if(that.userinfo['movie'][i]['length']<100){
                        lengths['100????????????']=lengths['100????????????']+1
                    }
                    else if(that.userinfo['movie'][i]['length']<110){
                        lengths['100~110??????']=lengths['100~110??????']+1
                    }
                    else if(that.userinfo['movie'][i]['length']<120){
                        lengths['110~120??????']=lengths['110~120??????']+1
                    }
                    else{
                        lengths['120????????????']=lengths['120????????????']+1
                    }

                }
                that.avgLength=(totalLength/that.userinfo['movie'].length).toFixed(2)
                let lengthsData = [{name: '100????????????', value: lengths['100????????????']}, {name: '100~110??????', value: lengths['100~110??????']}, {
                    name: '110~120??????', value: lengths['110~120??????']}, {name: '120????????????', value: lengths['120????????????']}]

                //??????????????????
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
                        text: '???????????????',
                        top:'0%',
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
                        formatter: "{b}: {c}??? ({d}%)"
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

            // ?????????????????????
            function showtimeShow(){
                // ????????????????????????????????????????????????????????????
                let showtimes={'2000?????????':0,'2000~2005???':0,'2005~2010???':0,'2010?????????':0}
                for(let i=0;i<that.userinfo['movie'].length;i++){
                    that.oldShowtime=Math.min(that.oldShowtime,that.userinfo['movie'][i]['showtime'])
                    that.newShowtime=Math.max(that.newShowtime,that.userinfo['movie'][i]['showtime'])
                    if(that.userinfo['movie'][i]['showtime']<2000){
                        showtimes['2000?????????']=showtimes['2000?????????']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2005){
                        showtimes['2000~2005???']=showtimes['2000~2005???']+1
                    }
                    else if(that.userinfo['movie'][i]['showtime']<2010){
                        showtimes['2005~2010???']=showtimes['2005~2010???']+1
                    }
                    else{
                        showtimes['2010?????????']=showtimes['2010?????????']+1
                    }

                }

                let showtimesData = [{name: '2000?????????', value: showtimes['2000?????????']}, {name: '2000~2005???', value: showtimes['2000~2005???']}, {
                    name: '2005~2010???', value: showtimes['2005~2010???']}, {name: '2010?????????', value: showtimes['2010?????????']}]

                //??????????????????
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
                        text: '???????????????',
                        top:'0%',
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
                        formatter: "{b}: {c}??? ({d}%)"
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

            // ???????????????
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
                        text: '???????????????',
                        top:'0%',
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
                        formatter: "{b}: {c}??? ({d}%)"
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

            // ?????????????????????????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/userdata?uid='+that.uid,
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

                        // ??????key?????????DOM
                        that.user_pic_count++
                    }
                }
            })
        },

        // ??????:??????????????????
        showInfoPic(name){
            let that=this

            // ??????????????????
            function createPic() {
                let personData = []
                // ??????????????????????????????personData
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

                // ?????????
                let colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A',
                    '#FD866A', '#9E87FF', '#58D5FF', '#1aff00',
                    '#ff0000','#752c82','#1e4013','#e77d00',
                    '#e3a1a1','#797357','#d25252','#001686',
                ]

                let option = {
                    title: {
                        text: '?????????',
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
                                formatter: '{a|{b}???{d}%}\n{hr|}',
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

            // ??????????????????????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/person?name='+name,
                type: 'get',
                success: function (res) {
                    // ????????????
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

                    // ?????????????????????????????????
                    that.isPerson=true
                    createPic()
                }
            })


        },

        // ??????:??????????????????
        showMovieInfo(id){
            let that=this
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/info?id='+id,
                type: 'get',
                success: function (res) {
                    that.movie=res.content

                    that.actors=''
                    // ?????????????????????
                    for(let i=0;i<that.movie.actor.length-1;i++){
                        that.actors=that.actors+that.movie.actor[i]+'???'
                    }
                    that.actors=that.actors+that.movie.actor[that.movie.actor.length-1]

                    // ?????????????????????????????????
                    that.isMovie=true
                }
            })
        },

        // ??????:??????????????????????????????
        goBackZoom(){
            // ??????zoom???
            this.myChart.setOption({
                series:{
                    center:null,
                    zoom:this.zoom_old_value
                }
            })
            // ??????????????????????????????zoom???
            this.zoom_value=this.zoom_old_value
        },

        // ??????:??????????????????
        changeZoom(){
            this.myChart.setOption({
                series: {
                    zoom: this.zoom_value
                }
            })
        },

        // ??????:????????????????????????
        changeTooltip(){
            // ?????????links??????
            let tmpTooltip=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))

            // ????????????link???tooltip???????????????
            for (let i=0;i<this.option1.series[0].links.length;i++)
            {
                tmpTooltip[i].tooltip.show=this.showTooltip;
            }

            // ????????????
            this.myChart.setOption({
                series:[{
                    links:tmpTooltip
                }]
            })
        },

        // ??????:????????????
        changeCurveness(){
            // ?????????links??????
            let tmpCurveness=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].links))

            // ????????????link???curveness
            for (let i=0;i<this.option1.series[0].links.length;i++) {
                if(tmpCurveness[i].lineStyle==null)tmpCurveness[i].lineStyle={curveness:this.changedCurveness}
                else tmpCurveness[i].lineStyle.curveness = this.changedCurveness;
            }

            // ????????????
            this.myChart.setOption({
                series:[{
                    links:tmpCurveness
                }]
            })
        },

        // ??????:??????????????????
        changeFontSize(){
            // ?????????data??????
            let tmpFontSize=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))

            // ????????????node???????????????
            for (let i=0;i<this.option1.series[0].data.length;i++)
            {
                tmpFontSize[i].label.fontSize=this.changedFontSize;
            }

            // ????????????
            this.myChart.setOption({
                series:[{
                    data:tmpFontSize
                }]
            })
        },

        // ??????:??????????????????
        changeSymbolSize(){
            // ?????????data??????
            let tmpSymbolSize=JSON.parse(JSON.stringify(this.myChart.getOption().series[0].data))

            // ????????????node???????????????
            for (let i=0;i<this.option1.series[0].data.length;i++)
            {
                tmpSymbolSize[i].symbolSize=tmpSymbolSize[i].symbolSize/this.lastSymbolSize*this.changedSymbolSize;
            }
            this.lastSymbolSize=this.changedSymbolSize

            // ????????????
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

        // ????????????:?????????????????????category???
        checkCategory (rule, value, callback) {
            let that = this;
            if (value === '') {
                return callback(new Error('??????????????????'));
            }

            if (isNaN(value)) {
                callback(new Error('???????????????'))
            }
            else if (value < 0) {
                callback(new Error('?????????????????????'))
            }
            else if (value >= that.savedgraph.categories.length) {
                callback(new Error('?????????????????????????????????'))
            }
            else {
                callback()
            }
        },

        // ????????????:???????????????source???
        checkSource(rule, value, callback){
            if (value === '') {
                return callback(new Error('??????????????????'))
            }
        },

        // ????????????:???????????????source???
        checkTarget(rule, value, callback) {
            if (value === '') {
                return callback(new Error('??????????????????'))
            }
        },

        // ????????????:??????????????????symbolSize???
        checkSymbolSize(rule, value, callback) {
            if (value === '') {
                return callback(new Error('????????????????????????'));
            }
            if (isNaN(value)) {
                // console.log(value)
                callback(new Error('???????????????'));
            }
            else if (value < 0) {
                callback(new Error('????????????????????????'))
            } else {
                callback()
            }
        },

        // ????????????:??????????????????name???
        checkName (rule, value, callback) {
            let that = this;
            if (value === '') {
                callback(new Error('????????????????????????'));
            }
            if (that.savedgraph.nodes.find(function(element) {
                return element.name === value;
            })) {
                callback(new Error('???????????????????????????'))
            }
            else {
                callback();
            }
        },

        // ????????????:?????????????????????source???
        checkEditSource (rule, value, callback) {
            if (value === '') {
                return callback(new Error('??????????????????'))
            }
            let that = this;
            if (!that.savedgraph.nodes.find(function (element) {
                return element.id === value;
            })) {
                callback(new Error('?????????????????????????????????id?????????'))
            }
            else {
                callback()
            }
        },

        // ????????????:?????????????????????target???
        checkEditTarget (rule, value, callback) {
            if (value === '') {
                return callback(new Error('??????????????????'))
            }
            let that = this;
            if (!that.savedgraph.nodes.find(function (element) {
                return element.id === value;
            })) {
                callback(new Error('?????????????????????????????????id?????????'))
            }
            else {
                callback()
            }
        },

        // ????????????:??????????????????name???
        checkEditName (rule, value, callback) {
            if (value === '') {
                return callback(new Error('??????????????????'))
            }
            let that = this;
            let id = that.savedgraph.nodes.findIndex(function (element) {
                return element.name === value;
            })
            if (id !== -1 && id !== that.selectedItem[0].index) {
                callback(new Error('???????????????????????????'))
            }
            else {
                callback()
            }
        },

        // ????????????:??????????????????label???
        checkLabel (rule, value, callback) {
            console.log(value);
            callback();
        },

        // ????????????:??????????????????x, y???
        checkPosition (rule, value, callback) {
            if (value === '') {
                callback();
            }
            if (isNaN(value)) {
                callback(new Error("???????????????"))
            }
            callback();
        },

        // ?????????????????????
        checkMessage (rule, value, callback) {
            if (value === '') {
                callback(new Error("????????????????????????"))
            }
            callback();
        },

        // ??????:?????????????????????echarts?????????????????????
        initdata() {
            // ?????????echarts??????
            let that = this
            $(document).ready(function () {
                // ??????DOM????????????
                let echarts = require('echarts');
                that.myChart = echarts.init(document.getElementById('myChart'))

                // ????????????
                // that.myChart.showLoading();
                // // ??????JSON??????
                // $.getJSON(ROOT_PATH, function (graph) {
                //     // ????????????
                //     that.myChart.hideLoading();
                //
                //     //??????????????????
                //     that.savedgraph = JSON.parse(JSON.stringify(graph))
                //
                //     // ???????????????
                //     that.initpage()
                // });

                // ?????????????????????????????????
                that.myChart.on('click', 'series.graph', function (event) {
                    console.log(event);
                    let id = event.data.index;
                    let item;
                    switch (event.dataType) {
                        case 'node':
                            item = that.savedgraph.nodes[id];
                            if (that.editmode === 'delete') {
                                // ????????????
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
                                        // ??????????????????????????????????????????
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
                                    // ???bug???????????????????????????
                                    console.log("?????????")
                                }
                                that.selectedType = 'node';
                            }
                            else {
                                if (that.savedgraph.pic_name === 'movie') {
                                    // ?????????????????????????????????
                                    // ??????????????????????????????????????????????????????????????????
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
                                    // ????????????????????????????????????????????????
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
                                    // ???????????????????????????????????????????????????????????????
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
                                // ????????????????????????????????????????????????????????????
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

                that.selectGraph(0,['user_graphs'])
            })
        },

        // ??????:????????????????????????
        resetSelectedItem(item, id, type) {
            this.selectedItem.length = 0;
            this.selectedItem.push(item);
            this.selectedItem[0].index = id;
            this.selectedType = type;
        },

        // ??????:????????????
        clearSelection() {
            this.selectedItem = [];
            this.selectedType = '';
            this.cancelLoveButton = false;
            this.isMovie = false;
            this.isPerson = false;
        },

        // ??????:???????????????????????????????????????
        initpage() {
            // ???????????????????????????
            $("#selector").val('????????????');

            let that = this

            // ??????????????????link???source???target???????????????????????????????????????(???????????????ID?????????????????????)
            for (let i = 0; i < that.savedgraph.links.length; i++) {
                let prop = that.savedgraph.links[i]
                prop.source = prop.source+""
                prop.target= prop.target+""
            }

            // ?????????index(??????)
            let index=0

            // ??????option1
            function setOption1(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // ????????????zoom?????????zoom
                if(graph.zoom==null){
                    graph.zoom=1
                }

                // ?????????node??????????????????
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

                // ??????index
                index = 0;

                // ?????????link??????????????????
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

                // ??????????????????
                that.info = '??????:??????' + graph.nodes.length + '?????????,' + graph.links.length + '??????';

                // ??????option1
                that.option1 = {
                    tooltip: {
                        position: 'right',
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
                        formatter: '{b}'
                    },
                    //??????
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
                            //?????????????????????
                            layout: 'none',
                            //????????????????????????
                            legendHoverLink: false,
                            //???????????????????????????????????????
                            nodeScaleRatio: 1,
                            //???????????????????????????
                            roam: true,
                            draggable: false,
                            //??????????????????
                            edgeSymbol: ['none', 'arrow'],
                            //????????????????????????
                            edgeSymbolSize: 5,
                            //?????????????????????
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

            // ??????option2
            function setOption2(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // ??????????????????zoom
                if(graph.nodes.length>=15 || graph.links.length>=30){
                    graph.zoom=0.4
                }
                else{
                    graph.zoom=0.6
                }

                // ??????index
                index = 0;

                // ?????????node??????????????????
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // ??????index
                index = 0;

                // ?????????link??????????????????
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // ??????option2
                that.option2 = {
                    tooltip: {
                        position: 'right',
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
                        formatter: '{b}'
                    },
                    //??????
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

                            //???????????????????????????
                            zoom: graph.zoom,
                            //???????????????
                            draggable: true,
                            type: 'graph',
                            //?????????????????????
                            layout: 'force',

                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,

                            //???????????????????????????
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
                                //??????
                                repulsion: 100
                            }
                        }
                    ]
                };
            }

            // ??????option3
            function setOption3(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // ??????index
                index = 0;

                // ?????????node??????????????????
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // ??????index
                index = 0;

                // ?????????link??????????????????
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // ??????option3
                that.option3 = {
                    tooltip: {
                        position: 'right',
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
                        formatter: '{b}'
                    },
                    //??????
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

            // ??????option4
            function setOption4(){
                let graph = JSON.parse(JSON.stringify(that.savedgraph))

                // ??????????????????zoom
                if(graph.nodes.length>=15 || graph.links.length>=30){
                    graph.zoom=1
                }
                else{
                    graph.zoom=0.6
                }

                // ??????index
                index = 0;

                // ?????????node??????????????????
                graph.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize >= 30
                    };
                    node.index = index++;
                });

                // ??????index
                index = 0;

                // ?????????link??????????????????
                graph.links.forEach(function (link) {
                    if (link.name === "dot") {
                        link.lineStyle = {type: 'dotted', width: '2'}
                    }
                    if (link.id == null){
                        link.id=index+''
                    }
                    link.index = index++;
                });

                // ??????????????????y????????????
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

                // ??????option4
                that.option4 = {
                    tooltip: {
                        position: 'right',
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
                        formatter: '{b}'
                    },
                    //??????
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
                            //?????????????????????
                            layout: 'none',
                            //????????????????????????
                            legendHoverLink: false,
                            //???????????????????????????????????????
                            nodeScaleRatio: 0,
                            //???????????????????????????
                            roam: true,
                            draggable:false,
                            //??????????????????
                            edgeSymbol: ['none', 'arrow'],
                            //????????????????????????
                            edgeSymbolSize: 5,
                            //?????????????????????
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

            // ???????????????
            that.value=2;
            that.changeTo(2)
        },

        // ??????:??????????????????????????????
        revokeAction(){
            // len???????????????????????????
            let len=this.previouschangeLayout.length

            // ???????????????
            if(len>0) {
                // ??????index???????????????????????????
                let dataIndex = this.previouschangeLayout[len - 1][0]
                let position = this.previouschangeLayout[len - 1][1]

                // ????????????
                this.option1.series[0].data[dataIndex].x = position[0];
                this.option1.series[0].data[dataIndex].y = position[1];
                let tmpSeries=this.option1.series[0]

                // ??????savedgraph
                this.savedgraph={uid:tmpSeries.uid,nodes:tmpSeries.data,links:tmpSeries.links,categories:tmpSeries.categories,
                    itemStyle:tmpSeries.itemStyle,lineStyle:tmpSeries.lineStyle,pic_name:tmpSeries.pic_name,
                    label:tmpSeries.label,tooltip:tmpSeries.tooltip}

                // ?????????????????????????????????????????????
                this.myChart.setOption(this.option1);
                this.updatePosition()

                // ??????????????????????????????
                this.previouschangeLayout.splice(len - 1)
            }
            else{
                this.$message.info("???????????????!")
            }
        },

        saveLayout(){
            this.$message.info("?????????????????????")
            let tmpOption=this.myChart.getOption().series[0]

            let res={'pic_name':this.savedgraph.pic_name,'uid':this.uid,'center':tmpOption.center,
                'zoom':tmpOption.zoom,'itemStyle':tmpOption.itemStyle,
                'lineStyle':tmpOption.lineStyle,'label':tmpOption.label,'tooltip':tmpOption.tooltip,
                'categories':tmpOption.categories,'nodes':tmpOption.data,'links':tmpOption.links}
            console.log(res)

            $.ajax({
                url: 'http://192.168.137.1:8888/saveLayout',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("??????????????????!")
                else console.log("??????????????????")}
            })

            $.ajax({
                url: 'http://192.168.137.1:8888/save',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("??????????????????!")
                else console.log("??????????????????")}
            })
        },

        fixLayoutChange(){
            if(this.changeLayout) {
                this.$message.info("??????roam???????????????!")

                // ????????????roam??????
                if(this.isRoam){
                    this.fixRoam()
                }

                this.initInvisibleGraphic();
            }
            else{
                this.$message.info("??????roam!")
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

        // ??????:??????????????????????????????????????????
        initInvisibleGraphic() {
            let that = this
            let echarts = require('echarts');

            // ?????????????????????
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

        // ??????:???????????????????????????
        updatePosition() {
            let that=this
            let echarts = require('echarts');

            // ????????????????????????roam????????????
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

            // ?????????????????????"??????????????????????????????????????????"??????
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

        // ??????:????????????????????????????????????
        onPointDragging(dataIndex) {
            let that=this

            let position=that.myChart.convertFromPixel({seriesIndex: 0},this.myChart.getOption().graphic[0].elements[dataIndex].position);

            // ??????????????????index?????????????????????????????????
            this.previouschangeLayout.push([dataIndex,[this.option1.series[0].data[dataIndex].x,this.option1.series[0].data[dataIndex].y]]);

            // ????????????
            this.option1.series[0].data[dataIndex].x = position[0];
            this.option1.series[0].data[dataIndex].y = position[1];

            // ??????????????????savedgraph???
            let tmpSeries=this.option1.series[0]

            for(let i=0;i<tmpSeries.data.length;i++){
                if(typeof(tmpSeries.data[i].category)===Number) {
                    tmpSeries.data[i].category = tmpSeries.categories[tmpSeries.data[i].category].name
                }
            }

            this.savedgraph={uid:tmpSeries.uid,nodes:tmpSeries.data,links:tmpSeries.links,categories:tmpSeries.categories,
                itemStyle:tmpSeries.itemStyle,lineStyle:tmpSeries.lineStyle,pic_name:this.savedgraph.pic_name,
                label:tmpSeries.label,tooltip:tmpSeries.tooltip}

            // ????????????
            this.myChart.setOption(that.option1)
            this.updatePosition()
        },

        // ??????:?????????????????????????????????
        changeTo(value) {
            let that = this

            that.clearSelection()

            // ?????????????????????
            function changeOption(option){
                // ????????????
                that.myChart.setOption(option);

                // ????????????????????????????????????
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

        // ??????:???????????????JSON
        beforeJSONUpload(file) {
            //???????????????json??????
            const isJSON = file.type === 'application/json';
            if (!isJSON) {
                this.$message.error('????????????????????? JSON ??????!');
                return false
            } else {
                //??????json???????????????tmpjson
                let reader = new FileReader()
                let tmpjson
                reader.readAsText(file);
                reader.onload = () => {
                    tmpjson = JSON.parse(reader.result)

                    // ???????????????????????????
                    if (this.checkJson(tmpjson)) {
                        this.initpage()
                        let that=this
                        $.ajax({
                            url: 'http://192.168.137.1:8888/?pic_name=' + tmpjson.pic_name + '&uid='+this.uid,
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

                        if(tmpjson.pic_name!=='movie'){
                            that.isMoviePic=false
                        }
                    }
                }
            }
            return true
        },

        // ??????:?????????????????????????????????????????????
        importFromDatabase(bool){
            this.haveGraphInDatabase=false
            if(bool) {
                this.myChart.hideLoading();
                this.savedgraph = this.tmpgraph
                this.initpage()
            }
        },

        // ??????:????????????????????????????????????
        uploadJSON(){
            let tmpOption=this.myChart.getOption().series[0]

            let res={'pic_name':this.savedgraph.pic_name,'uid':this.uid,'center':tmpOption.center,
                'zoom':tmpOption.zoom,'itemStyle':tmpOption.itemStyle,
                'lineStyle':tmpOption.lineStyle,'label':tmpOption.label,'tooltip':tmpOption.tooltip,
                'categories':tmpOption.categories,'nodes':tmpOption.data,'links':tmpOption.links}

            // ????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/save',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("??????????????????!")
                else console.log("??????????????????")}
            })

            // ????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/saveLayout',
                type: 'post',
                data: JSON.stringify(res),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {if(res.success)console.log("??????????????????!")
                else console.log("??????????????????")}
            })

            // ??????

            setTimeout(this.getUserGraph, 5000);
        },

        // ??????:??????JSON??????
        checkJson(tmpjson) {
            //??????????????????????????????json??????
            if (!('pic_name' in tmpjson)) {
                this.$message.error('??????????????????!(???pic_name??????)');
                return false
            }
            if (!('nodes' in tmpjson)) {
                this.$message.error('??????????????????!(???nodes??????)');
                return false
            }
            if (!('links' in tmpjson)) {
                this.$message.error('??????????????????!(???links??????)');
                return false
            }
            if (!("categories" in tmpjson)) {
                this.$message.error('??????????????????!(???categories??????)');
                return false
            }
            if (tmpjson.links.length === 0 || tmpjson.nodes.length === 0 || tmpjson.categories.length === 0) {
                return false
            }

            // links??????????????????source???target
            for (let i = 0; i < tmpjson.links.length; i++) {
                let prop = tmpjson.links[i]
                if (!('source' in prop) || !('target' in prop)) {
                    this.$message.error('??????????????????!(links??????????????????source/target??????)');
                    return false
                }
            }

            // nodes??????????????????name/symbolSize/category
            for (let i = 0; i < tmpjson.nodes.length; i++) {
                let prop = tmpjson.nodes[i]
                if (!('name' in prop) || !('symbolSize' in prop) || !('category' in prop)) {
                    this.$message.error('??????????????????!(nodes??????????????????name/symbolSize/category??????)');
                    return false
                }
            }

            // categories??????????????????name??????
            for (let i = 0; i < tmpjson.categories.length; i++) {
                let prop = tmpjson.categories[i]
                if (!('name' in prop)) {
                    this.$message.error('??????????????????!(categories??????????????????name??????)');
                    return false
                }
            }

            // ??????nodes?????????x,y???,????????????
            if (!('x' in tmpjson.nodes[0]) || !('y' in tmpjson.nodes[0])) {
                this.$message.info('?????????nodes????????????x/y???,??????????????????')
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

        // ??????:????????????????????????????????????
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

        // ??????:??????????????????????????????????????????
        startEdit(mode) {
            let that = this;
            // input??????????????????????????????????????????
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

        // ??????:??????????????????????????????/????????????
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

        // ??????:???????????????????????????????????????
        deleteNode(index) {
            this.savedgraph.nodes.splice(index, 1);
            this.clearSelection()
            this.initpage();
        },

        // ??????:????????????????????????????????????
        deleteEdge(index) {
            this.savedgraph.links.splice(index, 1);
            this.clearSelection()
            this.initpage();
        },

        // ??????:???????????????????????????????????????
        addNode() {
            let that = this;
            this.$refs['addNodeForm'].validate((valid) => {
                that.isValid(valid, 'node')
            })
        },

        // ??????:??????index??????????????????item
        addNodeAt(index, item) {
            this.savedgraph.nodes.splice(index, 0, item);
            this.initpage()
        },

        // ??????:??????index???????????????item
        addEdgeAt(index, item) {
            this.savedgraph.links.splice(index, 0, item);
            this.initpage();
        },

        // ??????:???????????????????????????????????????/??????????????????????????????????????????valid?????????????????????
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

        // ??????:??????????????????
        backtrack() {
            let op = this.editions[this.editions.length - 1];
            if (!op) {
                this.$message.info("???????????????!")
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

        // ??????:??????????????????
        startGraphicalEdit() {
            this.editmode = 'beginning';
            // ??????????????????????????????????????????????????????????????????????????????????????????????????????
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.clearSelection()
        },

        // ??????:??????????????????????????????
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

        // ??????:?????????????????????
        endGraphicalEdit() {
            // ??????savedgraph????????????????????????????????????????????????copiedgraph?????????copiedgraph??????
            this.savedgraph = JSON.parse(JSON.stringify(this.copiedgraph));
            this.copiedgraph = '';
            this.editmode = 'none';
            this.clearSelection()
            this.initpage();
            console.log('end edit');
        },

        // ??????:??????????????????
        saveGraphicalEdit() {
            this.copiedgraph = JSON.parse(JSON.stringify(this.savedgraph));
            this.uploadJSON();
            if (this.editions.length === 0) this.$message.info('????????????');
        },

        // ??????:???????????????
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

        // ??????:????????????
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
                        url: 'http://192.168.137.1:8888/node/find',
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
                                        // ?????????????????????????????????????????????????????????rgba(0,0,0,1)??????
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

        // ??????:?????????
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
                        url: 'http://192.168.137.1:8888/relationship/find',
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
                                        // ??????????????????????????????????????????????????????rgba(0,0,0,1)??????
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

        // ??????:????????????????????????
        resetSearchForm() {
            this.$refs['searchNodeForm'].resetFields();
            this.$refs['searchEdgeForm'].resetFields();
        },

        // ??????:??????????????????????????????addNode, addEdge, delete, none(??????)
        setEditMode(mode) {
            this.$message.info('Now in ' + mode + ' mode');
            this.editmode = mode;
        },

        // ???????????????
        cancelSearch() {
            this.resetSearchForm();
            if(this.nowOption===1)this.myChart.setOption(this.option1);
            else if(this.nowOption===2)this.myChart.setOption(this.option2);
            else if(this.nowOption===3)this.myChart.setOption(this.option3);
            else if(this.nowOption===4)this.myChart.setOption(this.option4);
        },

        // ??????:?????????????????????????????????
        getUserGraph() {
            let that = this
            $.ajax({
                url: 'http://192.168.137.1:8888/graphName?uid=' + this.uid,
                type: 'get',
                // data: {},
                dataType: 'json',
                success: function (res) {
                    // ??????????????????????????????????????????????????????
                    const graphs = res.content.map((pic) => pic["n.pic_name"]).filter((pic_name) => pic_name !== null);
                    let idx = graphs.findIndex((pic_name) => pic_name === 'movie')
                    console.log(graphs)
                    if (idx === -1) {
                        // ????????????movie????????????????????????????????????????????????????????????
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

        // ??????:????????????????????????????????????
        selectGraph(index, indexPath) {
            if (indexPath[0] === 'user_graphs') {
                let that = this;
                let pic_name = 'movie';

                // ????????????????????????????????????????????? ?????????????????????????????????
                $.ajax({
                    url: 'http://192.168.137.1:8888/?pic_name=' + pic_name + '&uid=' + this.uid,
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        if (!res.success) {
                            console.log(res)
                            if(pic_name==='movie'){
                                that.$nextTick(() => {
                                    setTimeout(function(){
                                        that.$notify.info({
                                            title: '??????????????????',
                                            message: '?????????????????????????????????!???????????????????????????????????????????????????????????????!'
                                        });
                                    } ,3000)
                                });
                            }
                            else {
                                that.$notify.error({
                                    title: '????????????!',
                                    message: '??????????????????????????????!?????????????????????!'
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

                                // ????????????????????????ID
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
            else if (indexPath[0]==='QA'){
                this    ``.$nextTick(() => {
                    let msg = document.getElementById('bottom') // ????????????
                    msg.scrollTop = msg.scrollHeight // ????????????
                })
            }
        },

        // ??????:???????????????????????????
        cancelLLoveNode() {
            let that = this;
            // ???????????????????????????
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/unlike?id=' + that.selectedItem[0].id + '&uid=' + that.uid,
                type: 'get',
                success: function (res) {
                    if (res.success) {
                        console.log('??????????????????!')
                        // // ??????????????????????????????????????????
                        that.getMovie()

                    } else {
                        console.log('??????????????????!')
                    }

                }
            })
        },

        sendMessage() {
            let that = this;
            this.$refs['QA'].validate((valid) => {
                if (valid) {
                    that.dealMessage();
                }
                else console.log("????????????")
            })
        },

        // ??????:??????????????????
        dealMessage() {
            let this_=this
            if(this.Message.message==="") {
                this_.$notify({
                    title: '?????????????????????!',
                    type: 'info'
                });
                return

            }
            this_.message_array.push({message:"Question: "+this.Message.message,from:0});
            this_.tmpMessage=this_.Message.message
            console.log(this.Message.message)
            $.ajax({
                url:'http://192.168.137.1:8888/movie/answer' + '?question=' + this.Message.message,
                type:'GET',
                success: function (params){
                    if(params.success){
                        console.log(params)
                        if(params.content.length!==0){
                            if(params.content[0]["m"]!==null&&params.content[0]["m"]!==undefined&&params.content.length===1){
                                this_.QAID=params.content[0]["m"]["id"]
                                this_.QALikeShow=true
                            }
                            else{
                                this_.QALikeShow=false
                            }
                            let i=0
                            while(i<params.content.length){
                                if(params.content[i]["m.showtime"]!==null&&params.content[i]["m.showtime"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.showtime"] ,from:1});
                                }else if(params.content[i]["m.rate"]!==null&&params.content[i]["m.rate"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.rate"] ,from:1});
                                }else if(params.content[i]["count(m)"]!==null&&params.content[i]["count(m)"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["count(m)"],from:1});
                                }else if(params.content[i]["m.othername"]!==null&&params.content[i]["m.othername"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.othername"] ,from:1});
                                }else if(params.content[i]["m.url"]!==null&&params.content[i]["m.url"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.url"] ,from:1});
                                }else if(params.content[i]["m.length"]!==null&&params.content[i]["m.length"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.length"] ,from:1});
                                }else if(params.content[i]["m.language"]!==null&&params.content[i]["m.language"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.language"] ,from:1});
                                }else if(params.content[i]["m.district"]!==null&&params.content[i]["m.district"]!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i]["m.district"] ,from:1});
                                }else if(params.content[i].m!==null&&params.content[i].m!==undefined){
                                    let temp="????????????: "+params.content[i].m.name + "\n" + "????????????: " + params.content[i].m.othername +"\n" + "????????????: " + params.content[i].m.district +"\n" + "????????????: " + params.content[i].m.genre+ "\n" + "????????????: " + params.content[i].m.showtime+ "\n" + "????????????: " + params.content[i].m.length +"\n" + "????????????: " + params.content[i].m.rate+ "\n" + "????????????: " + params.content[i].m.language+ "\n" + "????????????: " + params.content[i].m.url
                                    this_.message_array.push({message:temp ,from:1});
                                }else if(params.content[i].g!==null&&params.content[i].g!==undefined){
                                    this_.message_array.push({message:"????????????: " + params.content[i].g.name ,from:1});
                                }else if(params.content[i].p!==null&&params.content[i].p!==undefined){
                                    let temp2="??????: " + params.content[i].p.name + "\n" + "????????????: " + params.content[i].p.rate
                                    this_.message_array.push({message:temp2 ,from:1});
                                }
                                this_.$nextTick(() => {
                                    let msg = document.getElementById('bottom') // ????????????
                                    msg.scrollTop = msg.scrollHeight // ????????????
                                })
                                i++
                            }
                        }else {
                            this_.message_array.push({message:"Answer: Not Found",from:1});
                            this_.$nextTick(() => {
                                let msg = document.getElementById('bottom') // ????????????
                                msg.scrollTop = msg.scrollHeight // ????????????
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
                let msg = document.getElementById('bottom') // ????????????
                msg.scrollTop = msg.scrollHeight // ????????????
            })
            this.Message.message='';
        },

        // ??????:QA??????
        QALike(){
            let that=this

            // ???????????????????????????id
            $.ajax({
                url: 'http://192.168.137.1:8888/movie/like?id='+that.QAID+'&uid='+that.uid,
                type: 'get',
                success: function (res) {
                    if(res.success){
                        console.log('????????????!')

                        // ??????????????????????????????????????????
                        that.getMovie()

                        that.QALikeShow=false
                    }
                    else{
                        console.log('????????????!')
                    }
                }
            })
        },

        //??????
        badAnswer(){
            let this_=this
            console.log(this_.tmpMessage)
            $.ajax({
                url:'http://192.168.137.1:8888/movie/feedback' + '?question=' + this_.tmpMessage,
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
        },

        help1(){
            this.helpShow=1
        },
        help2(){
            this.helpShow=2
        },
        help3(){
            this.helpShow=3
        },
        help4(){
            this.helpShow=4
        },
        help5(){
            this.helpShow=5
        },
        help6(){
            this.helpShow=6
        },
        help7(){
            this.helpShow=7
        },
        help8(){
            this.helpShow=8
        },
    },

}
