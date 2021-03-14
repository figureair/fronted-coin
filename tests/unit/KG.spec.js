import { shallowMount,createLocalVue } from '@vue/test-utils'
import KG from '@/components/KG.vue'
import ElementUI from 'element-ui';

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('KG.vue', () => {

    it('渲染正确组件', () => {
        const wrapper = shallowMount(KG,{localVue})
        expect(wrapper).toMatchSnapshot()
    })

    // it('用户点击力引导图，切换option2',()=>{
    //     const wrapper = shallowMount(KG,{localVue})
    //     const selector = wrapper.find('#');
    // })
})