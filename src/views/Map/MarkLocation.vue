<template>
  <body>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能导航</el-breadcrumb-item>
      <el-breadcrumb-item>位置信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
      <!-- <span>111{{$store.getters.getUser.dev}}</span> -->
      <!-- style=" text-align:center;height:100%" -->
      <span class="demonstration" >设备筛选</span>
      <el-select v-model="valuedev" placeholder="请选择设备">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
        @click="onSearchdevBut"
      ></el-button>
      <el-button type="primary" round @click="onSearchAllBut">
        显示全部设备</el-button
      >
      <div style="float: right; text-align:right">
        <div class="switchdiv">
          <el-switch
            v-model="valuetuceng"
            active-text="卫星图层"
            inactive-text="2D图层"
            @change="changeSwitchtuceng($event)"
          >
          </el-switch>
        </div>
        <div class="switchdiv" >
          <el-switch
            v-model="valueluwang"
            active-text="添加路网"
            inactive-text="无路网"
            @change="changeSwitchluwang($event)"
          >
          </el-switch>
        </div>
        <div class="switchdiv" >
          <el-switch
            v-model="valueshuaxin"
            active-text="刷新全部"
            inactive-text="默认刷新"
            @change="changeSwitchshuaxin($event)"
          >
          </el-switch>
        </div>
      </div>

      <!-- <spin style="float: right; font-size: 15px">&ensp; |&ensp;</spin> -->
    </div>
    <div id="wrapper"></div>
    <!-- // 显示地图的容器，记得加宽高 -->

    <div id="tip" class="info">地图正在加载</div>
    <div class="info"></div>

    <el-table :data="tableData" border style="width: 100%;margin-top:0px">
      <el-table-column prop="dev_id" label="设备id"> </el-table-column>
      <el-table-column prop="GPSdate" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="weideg" label="纬度" width="180">
      </el-table-column>
      <el-table-column prop="wei" label="纬度半球"> </el-table-column>
      <el-table-column prop="jingdeg" label="纬度" width="180">
      </el-table-column>
      <el-table-column prop="jing" label="经度半球"> </el-table-column>
    </el-table>

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
import store from "../../store/index";
var selfs = this;
export default {
  self: this,
  name: "MarkLocation",
  self: this,
  data() {
    return {
      timer: "",
      form: {
        input1: "",
        input2: "",
      },
      options: [
        // {
        //   value: "选项1",
        //   label: "Dev1",
        // },
      ],
      valuedev: "",
      valuedevtime: "",
      valuetuceng: false,
      valueluwang: false,
      valueshuaxin: false,
      tableData: [
        // {
        //   GPSdate: "2016-05-03 19:20:30",
        //   dev_id: "dev1",
        //   weideg: "37.53207466666667",
        //   wei: "N",
        //   jingdeg: "122.07993716666667",
        //   jing: "E",
        // },
      ],
      dev: store.getters.getUser.dev,
      userid: store.getters.getUser.name,
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入位置信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开位置信息界面");
    window.clearTimeout(selfs.timer);
    next();
  },
  created() {
    selfs = this;
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
    mMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
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
      document.getElementById("tip").innerHTML = "地图图块加载完毕！";
      // 初始地图中心点为：" + mMap.getCenter();
    });
    // 创建两个点标记
    var m1 = new AMap.Marker({
      position: [122.08078, 37.53423],
    });
    var m2 = new AMap.Marker({
      position: [122.085988, 37.533925],
    });
    // var m3 = new AMap.Marker({
    //   position: [116.69, 39.9],
    //   icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
    // });

    // mMap.add(m1);
    // mMap.add(m2);
    // // mMap.add(m3);
    // mMap.setFitView();
    this.dev.forEach(function (element) {
      console.log(element.value);
      selfs.options.push({ value: element.value, label: element.value });
    });
    this.satelliteLayer = new AMap.TileLayer.Satellite();
    this.roadNetLayer = new AMap.TileLayer.RoadNet();
    this.onTimeStart();

    
    //clearTimeout(selfs.timer);
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
    onSearchdevBut(){
      //关闭定时器
      window.clearTimeout(selfs.timer);
      this.onSearchdev();

    },
    onSearchAllBut(){
      //关闭定时器
      window.clearTimeout(selfs.timer);
      this.onSearchAll();

    },
    onSearchdev() {
      console.log(this.valuedev);
      if (this.valuedev) {
        this.axios
          .get("mapwebapp/getLastData", {
            params: {
              devid: this.valuedev,
            },
          })
          .then((response) => {
            console.log("/a", response.data);
            if (response.data.code == "OK") {
              var tempdata = [];
              var tempitem = null;
              var item = null;
              this.tableData.splice(0, this.tableData.length);
              self.mMap.clearMap();
              for (item of response.data.datas) {
                tempitem = {
                  dev_id: item.dev_id,
                  weideg: item.weideg,
                  jingdeg: item.jingdeg,
                  GPSdate: item.GPSdate,
                  wei: "N",
                  jing: "E",
                };
                this.valuedevtime = item.GPSdate;
                this.tableData.push(tempitem);
                var position = [
                  parseFloat(item.jingdeg),
                  parseFloat(item.weideg),
                ];
                this.convertFrom(position, "gps");
                // var m66 = new AMap.Marker({
                // position: [parseFloat(item.jingdeg), parseFloat(item.weideg)],
                // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",});
                // self.mMap.add(m66);
                // self.mMap.setFitView();
              }
            }
          })
          .catch((error) => console.log(error));
      }
    },
    //显示所有设备位置
    onSearchAll() {
      // var tempdev = self.valuedev;
      self.mMap.clearMap();
      selfs.tableData.splice(0, selfs.tableData.length);
      selfs.dev.forEach(function (element) {
        console.log(element.value);
        self.valuedev = element.value;
        selfs.axios
          .get("mapwebapp/getLastData", {
            params: {
              devid: self.valuedev,
            },
          })
          .then((response) => {
            console.log("/a", response.data);
            if (response.data.code == "OK") {
              var tempdata = [];
              var tempitem = null;
              var item = null;
              //self.mMap.clearMap();
              for (item of response.data.datas) {
                tempitem = {
                  dev_id: item.dev_id,
                  weideg: item.weideg,
                  jingdeg: item.jingdeg,
                  GPSdate: item.GPSdate,
                  wei: "N",
                  jing: "E",
                };
                selfs.valuedevtime = item.GPSdate;
                selfs.tableData.push(tempitem);
                var position = [
                  parseFloat(item.jingdeg),
                  parseFloat(item.weideg),
                ];
                //selfs.convertFrom(position, "gps");
                AMap.convertFrom(position, "gps", function (status, result) {
                  if (result.info === "ok") {
                    var resLnglat = result.locations[0];
                    var m22 = new AMap.Marker({
                      position: resLnglat,
                      title: item.dev_id,
                      icon:
                        "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                      //offset: new AMap.Pixel(-13, -30),
                    });
                    // 设置label标签
                    // label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    m22.setLabel({
                      offset: new AMap.Pixel(10, 10), //设置文本标注偏移量
                      content:
                        "<div class='info'>" +
                        item.dev_id +
                        "-time:" +
                        item.GPSdate +
                        "</div>", //设置文本标注内容
                      direction: "bottom", //设置文本标注方位
                    });
                    self.mMap.add(m22);
                    self.mMap.setFitView();
                    // 设置标签
                    // m2.setLabel({
                    //     offset: new AMap.Pixel(20, 20),
                    //     content: "高德坐标系中首开广场（正确）"
                    // });
                  }
                });
              }
            }
          })
          .catch((error) => console.log(error));
        selfs.valuedev = "";
      });
    },
    changeSwitchtuceng(val) {
      if (val == true) {
        self.mMap.add(this.satelliteLayer);
      } else {
        self.mMap.remove(this.satelliteLayer);
      }
    },
    changeSwitchluwang(val) {
      if (val == true) {
        self.mMap.add(this.roadNetLayer);
      } else {
        self.mMap.remove(this.roadNetLayer);
      }
    },
    changeSwitchshuaxin(val) {
      if (val == true) {
        self.mMap.clearMap();
        this.onTimeStop();
        this.onTimeAllStart();

      } else {
        self.mMap.clearMap();
        this.onTimeAllStop();
        this.onTimeStart();
      }
    },
    //自动刷新封装
    //默认刷新
    onTimeStart(){
      if(this.timer){
        window.clearTimeout(this.timer);
        console.log("window.clearTimeout:onTimeStart");
      }
      console.log("window.setInterval:onTimeStart");
      this.onSearchdev();
      this.timer = window.setInterval(this.onSearchdev, 20000);
      selfs.timer = this.timer;

    },
    onTimeStop(){
      console.log("window.clearTimeout:onTimeStop");
      window.clearTimeout(this.timer);
    },
    //刷新全部
    onTimeAllStart(){
      if(this.timer){
        window.clearTimeout(this.timer);
        console.log("window.clearTimeout:onTimeAllStart");
      }
      console.log("window.setInterval:onTimeAllStart");
      this.onSearchAll();
      this.timer = window.setInterval(this.onSearchAll, 20000);
      selfs.timer = this.timer;

    },
    onTimeAllStop(){
      console.log("window.clearTimeout:onTimeAllStart");
      window.clearTimeout(this.timer);
    },
    // 坐标转换
    convertFrom(lnglat, type) {
      AMap.convertFrom(lnglat, type, function (status, result) {
        if (result.info === "ok") {
          var resLnglat = result.locations[0];
          var m22 = new AMap.Marker({
            position: resLnglat,
            title: selfs.valuedev,
            //offset: new AMap.Pixel(-13, -30),
          });
          // 设置label标签
          // label默认蓝框白底左上角显示，样式className为：amap-marker-label
          m22.setLabel({
            offset: new AMap.Pixel(10, 10), //设置文本标注偏移量
            content:
              "<div class='info'>" +
              selfs.valuedev +
              "-time:" +
              selfs.valuedevtime +
              "</div>", //设置文本标注内容
            direction: "bottom", //设置文本标注方位
          });
          self.mMap.add(m22);
          self.mMap.setFitView();
          // 设置标签
          // m2.setLabel({
          //     offset: new AMap.Pixel(20, 20),
          //     content: "高德坐标系中首开广场（正确）"
          // });
        }
      });
    },
  },
};
</script>

<style scoped>
/* @import"https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css";  */
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
html,
body {
  margin-top: 0px;
  height: 100%;
  padding: 0px;
}
#container {
  height: 100vh;
  width: 100%;
}
.input-card {
  width: 150px;
  top: 10px;
  bottom: auto;
}
.block {
  margin: 0px;
}
.demonstration {
  font-size: 15px;
}
.switchdiv {
  margin-right: 0px;
  padding-top: 2px;
}
</style>
