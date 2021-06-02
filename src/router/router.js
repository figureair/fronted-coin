import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
import Login from '@/components/Login.vue'
import KG from '@/components/KG.vue'

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
    ]
})