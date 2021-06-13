import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
import Login from '@/components/Login.vue'
import KG from '@/components/KG.vue'
import NetworkError from '@/components/NetworkError.vue'

Vue.use(Router)

/*配置路由*/
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/KG',
            name: 'KG',
            component: KG
        },
        {
            path: '/404',
            name: '404',
            component: NetworkError
        },{
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ]
})