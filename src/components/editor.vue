<template>
<!--    <el-popover-->
<!--    ref="popover4"-->
<!--    placement="right"-->
<!--    width="400"-->
<!--    v-model="visible"-->
<!--    trigger="click">-->
    <el-table v-if="dataType==='edge'" :data="gridData">
        <!--            <el-table-column  v-for="(item, key) in data" width="150" label="{{key}}}" >{{item}}}</el-table-column>-->
        <el-table-column width="100" property="name" label="姓名"></el-table-column>
        <!--            <el-table-column width="300" property="address" label="地址"></el-table-column>-->
    </el-table>
<!--    </el-popover>-->
    <el-button v-popover:popover4>click 激活</el-button>
</template>

<script>
export default {
    props: ['dataType', 'data'],
    data() {
        return {
            visible: true,

            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        };
    }
};
</script>

<style scoped>

</style>