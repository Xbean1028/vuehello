<template>
  <body>
    <div id="wrapper"></div>
    <!-- // 显示地图的容器，记得加宽高 -->
    <div class="input-card" style="width: 120px">
      <button
        class="btn"
        @click="rectangleEditoropen"
        style="margin-bottom: 5px"
      >
        开始编辑
      </button>
      <button class="btn" @click="rectangleEditorclose">结束编辑</button>
    </div>

    <div id="tip" class="info">地图正在加载</div>
    <div class="info"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="经度">
        <el-input v-model="form.input1"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.input2"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
        <el-button @click="onremove">清理</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  self: this,
  name: "CircleLocation",
  data() {
    return {
      form: {
        input1: "",
        input2: "",
      },
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入电子围栏信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开电子围栏信息界面");
    next();
  },
  mounted() {
    // 地图初始化
    var mMap = new AMap.Map("wrapper", {
      center: [122.08312407522708, 37.534181265062066],
      resizeEnable: true,
      zoom: 14,
      toolBar: true,
    });

    self.mMap = mMap;
    mMap.plugin(["AMap.ToolBar", "AMap.Scale","AMap.RectangleEditor"], function () {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      mMap.addControl(
        new AMap.ToolBar({
          // 简易缩放模式，默认为 false
          liteStyle: false,
        })
      );
      mMap.addControl(
        new AMap.Scale({
          visible: true,
        })
      );
    });
    mMap.on("complete", function () {
      document.getElementById("tip").innerHTML =
        "地图图块加载完毕！初始地图中心点为：" + mMap.getCenter();
    });

    var southWest = new AMap.LngLat(122.080724, 37.532681);
    var northEast = new AMap.LngLat(122.093434, 37.540323);
    var bounds = new AMap.Bounds(southWest, northEast);
    var rectangle = new AMap.Rectangle({
      bounds: bounds,
      strokeColor: "red",
      strokeWeight: 6,
      strokeOpacity: 0.5,
      strokeDasharray: [30, 10],
      // strokeStyle还支持 solid
      strokeStyle: "dashed",
      fillColor: "blue",
      fillOpacity: 0.5,
      cursor: "pointer",
      zIndex: 50,
    });
    rectangle.setMap(mMap);
    // 缩放地图到合适的视野级别
    mMap.setFitView([rectangle]);
    var rectangleEditor = new AMap.RectangleEditor(mMap, rectangle);
    self.rectangleEditor = rectangleEditor;
    rectangleEditor.on("adjust", function (event) {
      console.log("触发事件：adjust");
    });

    rectangleEditor.on("end", function (event) {
      console.log("触发事件： end");
      // event.target 即为编辑后的矩形对象
    });

    // 创建两个点标记
    // var m1 = new AMap.Marker({
    //   position: [116.49, 39.9],
    // });
    // var m2 = new AMap.Marker({
    //   position: [116.29, 39.9],
    // });
    // var m3 = new AMap.Marker({
    //   position: [116.69, 39.9],
    //   icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
    // });

    // mMap.add(m1);
    // mMap.add(m2);
    // mMap.add(m3);
    mMap.setFitView();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      var m3 = new AMap.Marker({
        position: [parseFloat(this.form.input1), parseFloat(this.form.input2)],
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
      });
      self.mMap.add(m3);
      self.mMap.setFitView();
    },
    onremove() {
      self.mMap.clearMap();
    },
    rectangleEditoropen() {
      self.rectangleEditor.open();
    },
    rectangleEditorclose() {
      self.rectangleEditor.close();
    },
  },
};
</script>

<style scoped>
/* @import"https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css";  */
.info {
  width: 26rem;
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
html,
body {
  height: 100%;
}
#container {
  height: 100%;
}
.input-card {
  width: 150px;
  top: 10px;
  bottom: auto;
}
</style>
