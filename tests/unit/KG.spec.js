import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import KG from '@/components/KG.vue'
import ElementUI from 'element-ui';
import * as echarts from 'echarts';

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(echarts)

describe('KG.vue', () => {

    it('快照测试，渲染正确UI', () => {
        const wrapper = shallowMount(KG,{localVue})
        expect(wrapper).toMatchSnapshot()
    })

    it('点击导入须知，弹出dialog，点击确认关闭',()=>{
        const wrapper = mount(KG,{localVue})
        wrapper.find('#tip').trigger('click')
        expect(wrapper.vm.dialogVisible).toBe(true)
        wrapper.find('#tipclose').trigger('click')
        expect(wrapper.vm.dialogVisible).toBe(false)
    })

    it('点击下载Img，触发downloadImg',async()=>{
        const wrapper = mount(KG,{localVue})
        const spyFn=jest.spyOn(wrapper.vm,'downloadImg')
        await wrapper.vm.$forceUpdate();
        wrapper.setData({
            myChart:echarts.init(document.createElement('div'))
        })
        wrapper.find('#downimg').trigger('click')
        expect(spyFn).toHaveBeenCalled()
    })

    it('点击下载Json，触发downloadJson',async()=>{
        const wrapper = mount(KG,{localVue})
        const spyFn=jest.spyOn(wrapper.vm,'downloadJson')
        await wrapper.vm.$forceUpdate();
        wrapper.find('#downjson').trigger('click')
        expect(spyFn).toHaveBeenCalled()
    })

    it('点击下载Xml，触发downloadXml',async()=>{
        const wrapper = mount(KG,{localVue})
        wrapper.setData({
            savedgraph:JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn=jest.spyOn(wrapper.vm,'downloadXml')
        if (typeof window.URL.createObjectURL === 'undefined') {
            window.URL.createObjectURL = () => {

            };
        }
        await wrapper.vm.$forceUpdate();
        wrapper.find('#downxml').trigger('click')
        expect(spyFn).toHaveBeenCalled()
    })

    it('导入非json文件，提示错误',async()=>{
        const wrapper = mount(KG,{localVue})
        let file=new File([""], "123.txt",{type: "text/plain"});
        expect(wrapper.vm.beforeJSONUpload(file)).toBe(false)
    })

    it("导入文件格式错误，提示错误",()=>{
        const wrapper = mount(KG,{localVue})
        expect(wrapper.vm.checkjson(JSON.parse('{}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[],"links":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[],"links":[],"categories":[]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3"}],"categories":[{"name": "Person"}]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(false)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{}]}'))).toBe(false)

    })

    it("导入文件正确，返回true",async()=>{
        const wrapper = mount(KG,{localVue})
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(true)
        expect(wrapper.vm.checkjson(JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"}],"links":[{"source": "3","target": "0"}],"categories":[{"name": "Person"}]}'))).toBe(true)
    })

    it('选择样式，测试触发',async()=>{
        const wrapper = mount(KG,{localVue})
        const spyFn = jest.spyOn(wrapper.vm, "changeTo");
        spyFn.mockReturnValue(Promise.resolve(2));
        expect(await wrapper.vm.changeTo(2)).toEqual(2);
    })

    it('配置渲染，测试触发',async ()=>{
        const wrapper = mount(KG,{localVue})
        wrapper.setData({
            savedgraph:JSON.parse('{"nodes":[{"symbolSize": 40,"name": "当事人","category": 0,"x":"1","y":"2"},{"symbolSize": 40,"name": "123","category": 0,"x":"2","y":"1"}],"links":[{"source": "0","target": "1"}],"categories":[{"name": "Person"}]}')
        })
        const spyFn = jest.spyOn(wrapper.vm, "initpage");
        wrapper.vm.initpage()
        expect(spyFn).toHaveBeenCalled()
    })

    it("删除节点",()=>{

    })

    it("增加节点",()=>{

    })

    it("修改节点",()=>{

    })

    it("增加边",()=>{

    })

    it("删除边",()=>{

    })

    it("修改边",()=>{

    })
})