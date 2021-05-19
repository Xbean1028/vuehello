import aMap from 'vue-amap' // 这个引入的最好放在引入的vue上面
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from "axios";
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(aMap)

aMap.initAMapApiLoader({
    key: '	24d373bbd4a196a89ee956f2f022cdac', // 你的key
    plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.Geolocation',
        'AMap.Geocoder',
        'AMap.AMapManager',
        'AMap.Marker',
        'AMap.RectangleEditor',
        "AMap.Rectangle"
    ], // 应用功能项
    v: '1.4.15', // 版本
    uiVersion: '1.0' // ui版本
})

lazyAMapApiLoaderInstance.load().then(() => {
    // your code ...
    this.map = new AMap.Map('amapContainer', {
        center: new AMap.LngLat(121.59996, 31.197646)
    });
});

Vue.prototype.axios = axios;

// 路由跳转之前
router.beforeEach((to, from, next) => {
    const isLogin = sessionStorage.getItem('isLogin');
    if (to.path == '/logout') {
        sessionStorage.clear();
        next({ path: '/login' });
    } else if (to.path == '/login') {
        if (isLogin != null) {
            next({ path: '/index' });
        }
    } else if (isLogin == null) {
        next({ path: '/login' });
    }
    next();
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')