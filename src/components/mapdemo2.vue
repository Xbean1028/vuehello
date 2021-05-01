<template>
  <div>
    <div id="wrapper"></div>
    <!-- // 显示地图的容器，记得加宽高 -->

    <div id="tip" class="info">地图正在加载</div>
    <div class="info">
      <h4 id="status"></h4>
      <hr />
      <p id="result"></p>
      <hr />
      <p>
        由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。
      </p>
      <div class="input-card" style="width: 24rem">
        <h4>添加、删除图层（Layer）</h4>
        <div class="input-item">
          <label>卫星图层：</label>
          <button
            class="btn"
            id="add-satellite-layer"
            style="margin-right: 1rem"
          >
            添加卫星图层
          </button>
          <button class="btn" id="remove-satellite-layer">删除卫星图层</button>
        </div>
        <div class="input-item">
          <label>红色标记：</label>
          <button class="btn" id="add-roadnet-layer" style="margin-right: 1rem">
            添加路网图层
          </button>
          <button class="btn" id="remove-roadnet-layer">删除路网图层</button>
        </div>
      </div>
      <div class="input-card" style="width: 24rem">
        <h4>添加、删除覆盖物</h4>
        <div class="input-item">
          <label>Marker：</label>
          <button class="btn" id="add-marker" style="margin-right: 1rem">
            添加Marker
          </button>
          <button class="btn" id="remove-marker">删除Marker</button>
        </div>
        <div class="input-item">
          <label>Circle：</label>
          <button class="btn" id="add-circle" style="margin-right: 1rem">
            添加Circle
          </button>
          <button class="btn" id="remove-circle">删除Circle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapdemo",
  self: this,
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
    // 构造官方卫星、路网图层
    var satelliteLayer = new AMap.TileLayer.Satellite();
    var roadNetLayer = new AMap.TileLayer.RoadNet();

    //批量添加图层
    mMap.add([satelliteLayer, roadNetLayer]);

    //官方卫星、路网图层事件绑定
    document.querySelector("#add-satellite-layer").onclick = function () {
      mMap.add(satelliteLayer);
    };

    document.querySelector("#remove-satellite-layer").onclick = function () {
      mMap.remove(satelliteLayer);
    };

    document.querySelector("#add-roadnet-layer").onclick = function () {
      mMap.add(roadNetLayer);
    };

    document.querySelector("#remove-roadnet-layer").onclick = function () {
      mMap.remove(roadNetLayer);
    };

    // 构造点标记
    var marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      // position: [116.405467, 39.907761],
      position: mMap.getCenter(),
      zoom: 14,
    });
    // 构造矢量圆形
    var circle = new AMap.Circle({
      // center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
      center: new AMap.LngLat("122.0807", "37.53425"), // 圆心位置
      radius: 300, //半径1000m
      strokeColor: "#F33", //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 3, //线粗细度
      fillColor: "#ee2200", //填充颜色
      fillOpacity: 0.35, //填充透明度
    });
    //点标记事件绑定
    document.querySelector("#add-marker").onclick = function () {
      mMap.add(marker);
      mMap.setFitView();
    };
    document.querySelector("#remove-marker").onclick = function () {
      mMap.remove(marker);
      mMap.setFitView();
    };
    document.querySelector("#add-circle").onclick = function () {
      mMap.add(circle);
      mMap.setFitView();
    };
    document.querySelector("#remove-circle").onclick = function () {
      mMap.remove(circle);
      mMap.setFitView();
    };

    // 解析定位结果
    function onComplete(data) {
      document.getElementById("status").innerHTML = "定位成功";
      var str = [];
      str.push("定位结果：" + data.position);
      str.push("定位类别：" + data.location_type);
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } // 如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
      document.getElementById("result").innerHTML = str.join("<br>");
    }
    // 解析定位错误信息
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
</style>
