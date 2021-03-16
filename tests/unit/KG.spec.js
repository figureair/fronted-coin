import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import KG from '@/components/KG.vue'
import ElementUI from 'element-ui';
import * as echarts from 'echarts';

const localVue = createLocalVue()
localVue.use(ElementUI)

let tmpdom = document.createElement('div')
Object.defineProperty(tmpdom, 'clientHeight', {
    get: function () {
        return 500;
    }
})
Object.defineProperty(tmpdom, 'clientWidth', {
    get: function () {
        return 500;
    }
})

describe('KG.vue', () => {

    it('快照测试，渲染正确UI', () => {
        const wrapper = shallowMount(KG, {localVue})
        expect(wrapper).toMatchSnapshot()
        wrapper.destroy()
    })

    it('点击导入须知，弹出dialog，点击确认关闭', () => {
        const wrapper = mount(KG, {localVue})
        wrapper.find('#tip').trigger('click')
        expect(wrapper.vm.dialogVisible).toBe(true)
        wrapper.find('#tipclose').trigger('click')
        expect(wrapper.vm.dialogVisible).toBe(false)
        wrapper.destroy()
    })

    it('点击下载Img，触发downloadImg', async () => {

        const wrapper = mount(KG, {localVue})

        wrapper.setData({
            myChart: echarts.init(tmpdom),
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, 'downloadImg')
        await wrapper.vm.$forceUpdate();

        //mock getDataURL方法 来自定义返回
        wrapper.vm.myChart.getDataURL = function () {
            return "123"
        }

        wrapper.find('#downimg').trigger('click')
        expect(spyFn).toHaveBeenCalled()

        echarts.dispose(tmpdom)
        wrapper.destroy()
    })

    it('点击下载Json，触发downloadJson', async () => {
        const wrapper = mount(KG, {localVue})
        const spyFn = jest.spyOn(wrapper.vm, 'downloadJson')
        await wrapper.vm.$forceUpdate();
        wrapper.find('#downjson').trigger('click')
        expect(spyFn).toHaveBeenCalled()
        wrapper.destroy()
    })

    it('点击下载Xml，触发downloadXml', async () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, 'downloadXml')
        if (typeof window.URL.createObjectURL === 'undefined') {
            window.URL.createObjectURL = () => {

            };
        }
        await wrapper.vm.$forceUpdate();
        wrapper.find('#downxml').trigger('click')
        expect(spyFn).toHaveBeenCalled()
        wrapper.destroy()
    })

    it('导入非json文件，提示错误', async () => {
        const wrapper = mount(KG, {localVue})
        let file = new File([""], "123.txt", {type: "text/plain"});
        expect(wrapper.vm.beforeJSONUpload(file)).toBe(false)
        wrapper.destroy()
    })

    it('导入json文件，跳转', async () => {
        const wrapper = mount(KG, {localVue})
        let file = new File([""], "123", {type: "application/json"});
        expect(wrapper.vm.beforeJSONUpload(file)).toBe(true)
        wrapper.destroy()
    })

    it("文件格式错误，提示错误", () => {
        const wrapper = mount(KG, {localVue})
        expect(wrapper.vm.checkjson(JSON.parse('{}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[],"links":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[],"links":[],"categories":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3"}],"categories":[{"name": "Person"}]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{}]}'))).toBe(false)
        wrapper.destroy()
    })

    it("文件正确格式，返回true", async () => {
        const wrapper = mount(KG, {localVue})
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(true)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(true)
        wrapper.destroy()
    })

    it('选择样式，测试触发', async () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            myChart: echarts.init(tmpdom),
            option1: {},
            option2: {},
            option3: {}
        })
        expect(wrapper.vm.changeTo(1)).toEqual(1);
        expect(wrapper.vm.changeTo(2)).toEqual(2);
        expect(wrapper.vm.changeTo(3)).toEqual(3);

        echarts.dispose(tmpdom)
        wrapper.destroy()
    })

    it('配置渲染，测试触发', async () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            changeOption:jest.fn(function() {
                return true;
            }),
            myChart: echarts.init(tmpdom),
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"name":"dot","source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, "initpage");
        wrapper.vm.initpage()
        expect(spyFn).toHaveBeenCalled()
        echarts.dispose(tmpdom)
        wrapper.destroy()
    })

    it("initdata初始化测试", async () => {
        const wrapper = mount(KG, {localVue})
        const spyFn = jest.spyOn(wrapper.vm, "initdata");
        await wrapper.vm.$forceUpdate();
        wrapper.vm.initdata()
        expect(spyFn).toHaveBeenCalled()
        wrapper.destroy()
    })

    it("changeOption测试", () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            myChart: echarts.init(tmpdom)
        })
        expect(wrapper.vm.changeOption({})).toBe(true)
        echarts.dispose(tmpdom)
        wrapper.destroy()
    })

    it("删除节点", () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            initpage:jest.fn(function() {
                return true;
            }),
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"name":"dot","source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, "deleteNode");
        wrapper.vm.deleteNode({index:1})
        expect(spyFn).toHaveBeenCalled()
        wrapper.destroy()
    })

    it("增加节点", () => {
        // const wrapper = mount(KG, {localVue})
        //
        // const spyFn = jest.spyOn(wrapper.vm, "addNode");
        // wrapper.vm.$refs['addNodeForm'].validate=function (){
        //     return true
        // }
        // wrapper.vm.addNode()
        // expect(spyFn).toHaveBeenCalled()
        // // echarts.dispose(tmpdom)
        // wrapper.destroy()
    })

    it("修改节点", () => {

    })

    it("增加边", () => {

    })

    it("删除边", () => {
        const wrapper = mount(KG, {localVue})
        wrapper.setData({
            initpage:jest.fn(function() {
                return true;
            }),
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"name":"dot","source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, "deleteEdge");
        wrapper.vm.deleteEdge({index:1})
        expect(spyFn).toHaveBeenCalled()
        wrapper.destroy()

    })

    it("修改边", () => {

    })

    it("isValid测试", () => {

    })

    it("校验方法测试", () => {
        const wrapper = mount(KG, {localVue})
        const mockFn=jest.fn(function() {
            return true;
        })
        wrapper.setData({
            savedgraph: JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"name":"dot","source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        wrapper.vm.checkName('','当事人',mockFn)
        wrapper.vm.checkName('','',mockFn)
        wrapper.vm.checkSymbolSize('','',mockFn)
        wrapper.vm.checkSymbolSize('',-1,mockFn)
        wrapper.vm.checkSymbolSize('',1,mockFn)
        wrapper.vm.checkSymbolSize('',NaN,mockFn)
        wrapper.vm.checkTarget('','',mockFn)
        wrapper.vm.checkSource('','',mockFn)
        wrapper.vm.checkCategory('','',mockFn)
        wrapper.vm.checkCategory('',NaN,mockFn)
        wrapper.vm.checkCategory('',-1,mockFn)
        wrapper.vm.checkCategory('',10,mockFn)
        wrapper.vm.checkCategory('',0,mockFn)
        wrapper.destroy()
    })
})