<template>
  <div class="appbody">
    <el-header style="text-align: center;width:100%;height:40px;background-color: #d3dce6">
      <div>
        <Header></Header>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>功能导航</template
            >
            <el-menu-item index="1-1">
              <router-link to="/markLocation">位置信息</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/dataLocation">数据中心</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/circleLocation">电子围栏</router-link>
            </el-menu-item>
            <el-menu-item index="1-4">
              <router-link to="/mapdemo2">未定义</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>辅助功能</template
            >
            <el-menu-item index="1-1">
              <router-link to="/mapdemo">拾取位置</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/getLocation">定位测试</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/SettingPage">数据测试</router-link>
            </el-menu-item>
            <el-menu-item index="1-4">
              <router-link to="/mapdemo2">未定义</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>个人中心</template
            >
            <el-menu-item index="2-1">
              <router-link to="/UserPage">个人信息</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/DrivePage">设备管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">未定义</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>我的设备</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="font-size:16px">欢迎你：{{ $store.getters.getUser.name }}---</span>
          <i class="el-icon-switch-button" @click="logout"></i>
        </el-header>

        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-footer style="text-align: center;width:100%;height:40px">
      <Footer></Footer>
    </el-footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "Index",
  methods: {
    logout() {
      console.log("logout");
      // let isLogin = sessionStorage.getItem('isLogin');
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  /*opacity:0.5;*/
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  /*opacity:0.5;*/
}
.appbody {
  /*background:url("../assets/bg.jpg");*/
  /*width:100%;*/
  /*大小设置为100%*/
  /*height:100%;*/
  /*大小设置为100%*/
  /*position:fixed;*/
  /*background-size:100% 100%;*/
}
.appbody{
  width:100%;
  height:100%;
  background:url('../assets/bg2.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
  
}
.appbody::after{
   position: absolute;
   /* opacity:0.5; */
}
</style>
