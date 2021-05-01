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

Vue.use(Router)

export default new Router({
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
    }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
