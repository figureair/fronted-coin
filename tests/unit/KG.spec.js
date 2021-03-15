import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import KG from '@/components/KG.vue'
import ElementUI from 'element-ui';

const localVue = createLocalVue()
localVue.use(ElementUI)

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
        const spyFn=jest.spyOn(wrapper.vm,'downloadXml')
        await wrapper.vm.$forceUpdate();
        wrapper.find('#downxml').trigger('click')
        expect(spyFn).toHaveBeenCalled()
    })

    it('导入非json文件，提示错误',()=>{
        const wrapper = mount(KG,{localVue})
        wrapper.find('#upload_button').trigger('click')
    })

    it("导入文件格式错误，提示错误",()=>{

    })

    it('选择样式，切换到对应样式图',async()=>{
        const wrapper = mount(KG,{localVue})
        const spyFn=jest.spyOn(wrapper.vm,'changeTo')
        await wrapper.vm.$forceUpdate();
        wrapper.vm.changeTo(2);
        expect(wrapper.vm.nowOption).toBe(1)
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