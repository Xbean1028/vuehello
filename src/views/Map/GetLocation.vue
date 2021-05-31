<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>辅助功能</el-breadcrumb-item>
      <el-breadcrumb-item>定位测试</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="wrapper"></div>
    <!-- // 显示地图的容器，记得加宽高 -->

    <div id="tip" class="info">地图正在加载</div>
    <div class="info">
      <h4 id="status"></h4>
      <hr />
      <p id="result"></p>
      <hr />
      <!-- <p>
        由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "GetLocation",
  self: this,
  beforeRouteEnter: (to, from, next) => {
    console.log("进入定位测试界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开定位测试界面");
    next();
  },
  mounted() {
    // 地图初始化
    var mMap = new AMap.Map("wrapper", {
      center: [122.40718607522708, 37.396603265062066],
      resizeEnable: true,
      zoom: 14,
    });
    mMap.on("complete", function () {
      document.getElementById("tip").innerHTML =
        "地图图块加载完毕！当前地图中心点为：" + mMap.getCenter();
    });
    AMap.plugin("AMap.Geolocation", function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        buttonPosition: "RB", // 定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
      });
      mMap.addControl(geolocation);
      geolocation.getCurrentPosition(function (status, result) {
        if (status == "complete") {
            onComplete(result);
        } else {
          onError(result);
        }
      });
    });
    //解析定位结果
    function onComplete(data) {
      document.getElementById("status").innerHTML = "定位成功";
      var str = [];
      str.push("定位结果：" + data.position);
      str.push("定位类别：" + data.location_type);
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } //如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
      document.getElementById("result").innerHTML = str.join("<br>");
      document.getElementById("tip").innerHTML ="地图图块加载完毕！当前地图中心点为：" + data.position;
    }
    //解析定位错误信息
    function onError(data) {
      document.getElementById("status").innerHTML = "定位失败";
      document.getElementById("result").innerHTML =
        "失败原因排查信息:" + data.message;
    }
  },
  methods: {},
};
</script>

<style scoped>
.info {
  width: 100%;
  text-align: center;
  margin: auto;
}
#wrapper {
  width: 100%;
  height: 60vh;
}
.tip {
  text-align: center;
  /* margin: 15px auto; */
}
</style>
