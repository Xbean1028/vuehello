<template>
  <div class="bghead">
    <el-header>
      <div class="headtext">NBIoT的定位服务物联网平台</div>
      <div>
        <div class="showTime timetext">Hello</div>
        <div class="grid-content">
          <spin>Beta 2.0 </spin>
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
          <!-- <i class="el-icon-switch-button" @click="logout"></i> -->
          <el-button type="info" @click="logout" size="small" round
            >退出</el-button
          >
        </div>
      </div>
    </el-header>

  </div>
</template>

<script>
export default {
  name: "Header",
  mounted() {
    var t = null;
    t = setTimeout(time, 1000); //開始运行
    function time() {
      clearTimeout(t); //清除定时器
      var dt = new Date();
      var y = dt.getFullYear();
      var mt = dt.getMonth() + 1;
      var day = dt.getDate();
      var h = dt.getHours(); //获取时
      var m = dt.getMinutes(); //获取分
      var s = dt.getSeconds(); //获取秒
      document.querySelector(".showTime").innerHTML =
        "当前时间：" +
        y +
        "年" +
        mt +
        "月" +
        day +
        "日-" +
        h +
        "时" +
        m +
        "分" +
        s +
        "秒";
      t = setTimeout(time, 1000); //设定定时器，循环运行
    }
  },
  methods: {
    logout() {
      console.log("logout");
      // let isLogin = sessionStorage.getItem('isLogin');
      sessionStorage.clear();
      this.$router.push("/login");
    },
  }
};
</script>

<style scoped>
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bghead {
  /* background-color: #d3dce6; */
  height: 8vh;
  background-color: #373f41;
  /* display: flex; */
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.headtext {
  font: 26px "微软雅黑";
  /* color:#303133; */
  color: #fff;
  margin-left: 15px;
}
.timetext {
  font: 14px "微软雅黑";
  /* color:#409EFF; */
  color: #fff;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 16px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    span {
      margin-left: 15px;
    }
  }
}
</style>
