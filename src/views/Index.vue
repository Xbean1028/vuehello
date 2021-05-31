<template>
  <div class="appbody">
    <!-- <el-header style="text-align: center;width:100%;height:40px;background-color: #d3dce6">
      <div> -->
    <Header></Header>
    <!-- </div>
    </el-header> -->

    <el-container class="container">
      <!-- <el-aside width="15%"> -->
      <el-aside :width="isCollapse ? '5vw' : '15vw'">
        <div class="toggle-button" @click="togleCollapse">|||</div>
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409FFF"
          :default-openeds="['1', '2', '3']"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i> <span>功能导航</span></template
            >
            <el-menu-item index="1-1">
              <router-link to="/markLocation"><span>位置信息</span></router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/dataLocation">数据中心</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/circleLocation">电子围栏</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i><span>辅助功能</span></template
            >
            <el-menu-item index="2-1">
              <router-link to="/mapdemo2">卫星图层</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/mapdemo">拾取位置</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="2-3">
              <router-link to="/getLocation">定位测试</router-link>
            </el-menu-item> -->
            <!-- <el-menu-item index="1-3">
              <router-link to="/SettingPage">数据测试</router-link>
            </el-menu-item> -->
            <!-- <el-menu-item index="1-4">
              <router-link to="/mapdemo2">未定义</router-link>
            </el-menu-item> -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i><span>个人中心</span></template
            >
            <el-menu-item index="3-1">
              <router-link to="/UserPage">个人信息</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/DrivePage">设备管理</router-link>
            </el-menu-item>
            <el-menu-item index="3-3">
              <a href="https://mapapi.xubean.top/admin"  target="_blank">管理入口</a>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="height: 85vh">
        <!-- <el-header
          style="text-align: right; font-size: 18px; background-color: #e4e7ed"
        >
          <spin>Beta 1.01 </spin>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>我的设备</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="font-size: 18px"
            >欢迎你：{{ $store.getters.getUser.name }}---</span
          >
          <el-button type="danger" @click="logout" size="small" round
            >退出</el-button
          >
        </el-header> -->

        <el-main style="margin: 0px">
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-footer style="text-align: center; width: 100%; height: 40px">
      <Footer></Footer>
    </el-footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "Index",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      // 默认不折叠
      isCollapse: false,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      // let isLogin = sessionStorage.getItem('isLogin');
      sessionStorage.clear();
      this.$router.push("/login");
    },
    // 菜单的折叠与展开
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
body {
  height: 100vh;
  margin-bottom: 0px;
  padding: 0px;
}
.appbody a {
  text-decoration: none;
}

.container {
  height: 100%;
  margin-top: 0%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  background-color: #373f41;
  color: #fff;
  font-size: 20px;
}
.el-container {
  height: 100%;
}

.el-aside {
  color: #333;
  background-color: #333744;
}

.el-menu-item {
  color: #fff;
  background-color: #333744;
  text-align: center;
}
.el-aside .el-menu {
  
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  border: none;
  padding-left: 0;
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
  margin-top: 0px;
  padding: 0px;
}

.router-link-active {
  text-decoration: none;
}
a.router-link-active,
nav li a:hover {
  display: block;
  background: #f8f8fa;
  border-radius: 0 20px;
  text-shadow: none;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  /* 鼠标放上去变成小手 */
  cursor: pointer;
}

/* .appbody{
  width:100%;
  height:100%;
  background:url('../assets/bg4.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
  padding-bottom: 1px;
  
} */
</style>
