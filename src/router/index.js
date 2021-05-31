import Vue from "vue"
import Router from "vue-router"
import MapPage from '../views/MapPage'
import Index from '../views/Index'
import DataPage from '../views/DataPage'
import SettingPage from '../views/SettingPage'
import UserPage from '../views/UserPage'
import DrivePage from '../views/DrivePage'
import Login from '../views/Login'
import NotFound from "../views/NotFound";
import mapdemo from "../components/mapdemo";
import mapdemo2 from "../components/mapdemo2";
import GetLocation from '@/views/Map/GetLocation';
import MarkLocation from '@/views/Map/MarkLocation';
import DataLocation from '@/views/Map/DataLocation';
import CircleLocation from '@/views/Map/CircleLocation';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            // 跳转地址
            path: '/login',
            // 路由名称
            name: 'Login',
            // 路由跳转组件
            component: Login
        },
        {
            // 跳转地址
            path: '/index',
            // 路由名称
            name: 'Index',
            // 路由跳转组件
            component: Index,
            redirect: '/markLocation',
            children: [{
                    path: '/MapPage',
                    // 路由名称
                    name: 'MapPage',
                    // 路由跳转组件
                    component: MapPage
                },
                {
                    path: '/mapdemo',
                    // 路由名称
                    name: 'mapdemo',
                    // 路由跳转组件
                    component: mapdemo
                },
                {
                    path: '/mapdemo2',
                    // 路由名称
                    name: 'mapdemo2',
                    // 路由跳转组件
                    component: mapdemo2
                },
                {
                    path: '/DataPage',
                    // 路由名称
                    name: 'DataPage',
                    // 路由跳转组件
                    component: DataPage
                },
                {
                    path: '/SettingPage',
                    // 路由名称
                    name: 'SettingPage',
                    // 路由跳转组件
                    component: SettingPage
                },
                {
                    path: '/UserPage',
                    // 路由名称
                    name: 'UserPage',
                    // 路由跳转组件
                    component: UserPage
                },
                {
                    path: '/DrivePage',
                    // 路由名称
                    name: 'DrivePage',
                    // 路由跳转组件
                    component: DrivePage
                },
                {
                    path: '/getLocation',
                    // 路由名称
                    name: 'GetLocation',
                    // 路由跳转组件
                    component: GetLocation
                },
                {
                    path: '/markLocation',
                    // 路由名称
                    name: 'MarkLocation',
                    // 路由跳转组件
                    component: MarkLocation
                },
                {
                    path: '/dataLocation',
                    // 路由名称
                    name: 'DataLocation',
                    // 路由跳转组件
                    component: DataLocation
                },
                {
                    path: '/circleLocation',
                    // 路由名称
                    name: 'CircleLocation',
                    // 路由跳转组件
                    component: CircleLocation
                }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})


// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
    // 访问登录页，放行
    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('isLogin')
        // 没有token, 强制跳转到登录页
    if (!tokenStr) return next('/login')
    next()
})

export default router