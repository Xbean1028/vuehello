<template>
  <body>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能导航</el-breadcrumb-item>
      <el-breadcrumb-item>电子围栏</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
      <!-- <span>111{{$store.getters.getUser.dev}}</span> -->
      <span class="demonstration">设备筛选</span>
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
        @click="onSearchdev"
      ></el-button>
      <!-- <span class="demonstration">电子围栏开关</span> -->

      <div style="float: right; text-align: right">
        <div class="switchdiv">
          <el-switch
            v-model="valuetuceng"
            active-text="卫星图层"
            inactive-text="2D图层"
            @change="changeSwitchtuceng($event)"
          >
          </el-switch>
        </div>
        <div class="switchdiv">
          <el-switch
            v-model="valueluwang"
            active-text="添加路网"
            inactive-text="无路网"
            @change="changeSwitchluwang($event)"
          >
          </el-switch>
        </div>
        <div class="switchdiv">
          <el-switch
            v-model="valueswitch"
            active-text="开启围栏"
            inactive-text="关闭围栏"
            style="float: right"
            @change="changeSwitch($event)"
          >
          </el-switch>
        </div>
      </div>
    </div>
    <div id="wrapper"></div>
    <!-- // 显示地图的容器，记得加宽高 -->
    <div class="input-card" style="width: 200px">
      <el-button class="btn" @click="rectangleEditoropen">开始编辑</el-button>
      <el-button class="btn" @click="rectangleEditorclose">结束编辑</el-button>
    </div>

    <!-- <div id="tip" class="info">地图正在加载</div>
    <div class="info"></div> -->

    <el-table :data="tableData" height="100" border style="width: 100%;margin-top:0px">
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

    <!-- <el-form ref="form" :model="form" label-width="80px">
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
    </el-form> -->
  </body>
</template>

<script>
import store from "../../store/index";
var selfs = this;
export default {
  self: this,
  name: "CircleLocation",
  data() {
    return {
      timer: "",
      form: {
        input1: "",
        input2: "",
      },
      NEQ: "", //wei
      NER: "", //jing
      SWQ: "",
      SWR: "",
      SetIsDelete: "",
      options: [
        // {
        //   value: "选项1",
        //   label: "Dev1",
        // },
      ],
      valuedev: "",
      valuetuceng: false,
      valueluwang: false,
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
      valueswitch: true, //电子围栏
      markers: "",
      GPSdatelabel: "",
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入电子围栏信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开电子围栏信息界面");
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
    mMap.plugin(
      ["AMap.ToolBar", "AMap.Scale", "AMap.RectangleEditor", "AMap.Rectangle"],
      function () {
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
      }
    );
    // mMap.on("complete", function () {
    //   document.getElementById("tip").innerHTML =
    //     "地图图块加载完毕！初始地图中心点为：" + mMap.getCenter();
    // });

    this.dev.forEach(function (element) {
      console.log(element.value);
      selfs.options.push({ value: element.value, label: element.value });
    });
    ///////////////////////////////////////////创建rectangle对象，隐藏，防止报错
    var southWest = new AMap.LngLat(122.080724, 37.532681);
    var northEast = new AMap.LngLat(122.080724, 37.528681);
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
    this.rectangle = rectangle; //rectangle暴露出去，要不然控制不到
    // 缩放地图到合适的视野级别
    mMap.setFitView([rectangle]);
    rectangle.hide();
    //////////////////////////////////////////////////////////
    this.satelliteLayer = new AMap.TileLayer.Satellite();
    this.roadNetLayer = new AMap.TileLayer.RoadNet();

    this.timer = window.setInterval(this.onSearchdev, 20000);
    selfs.timer = this.timer;
    //window.clearTimeout(selfs.timer);
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
    onSearchdev() {
      console.log(this.valuedev);
      if (this.valuedev) {
        self.mMap.clearMap();
        this.getCircle();
        this.axios
          .get("mapwebapp/getLastData", {
            params: {
              devid: this.valuedev,
            },
          })
          .then((response) => {
            console.log("/a", response.data);
            if (response.data.code == "OK") {
              //var tempdata = [];
              var tempitem = null;
              var item = null;
              this.tableData.splice(0, this.tableData.length);
              //self.mMap.clearMap();

              //设置围栏区域
              // if (this.valueswitch == true) {
              //   //alert("f-true");
              //   //this.mMap.setFitView([rectangle]);
              //   this.getCircle();
              //   //selfs.rectangle.show();
              // } else {
              //   //selfs.rectangle.hide();
              // }

              for (item of response.data.datas) {
                tempitem = {
                  dev_id: item.dev_id,
                  weideg: item.weideg,
                  jingdeg: item.jingdeg,
                  GPSdate: item.GPSdate,
                  wei: "N",
                  jing: "E",
                };
                this.tableData.push(tempitem);
                this.GPSdatelabel = item.GPSdate;
                var position = [
                  parseFloat(item.jingdeg),
                  parseFloat(item.weideg),
                ];
                //var positionpoint = new AMap.LngLat(item.jingdeg, item.weideg);
                //console.log(this.rectangle.contains(positionpoint));
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
    rectangleEditoropen() {
      this.rectangleEditor.open();
    },
    rectangleEditorclose() {
      this.rectangleEditor.close();
      //console.log(self.mMap.getBounds());
      this.NEQ = this.rectangle.getBounds().northeast.Q.toFixed(6); //小数点后6位
      this.NER = this.rectangle.getBounds().northeast.R.toFixed(6); //小数点后6位
      this.SWQ = this.rectangle.getBounds().southwest.Q.toFixed(6); //小数点后6位
      this.SWR = this.rectangle.getBounds().southwest.R.toFixed(6); //小数点后6位
      //console.log(self.mMap.getBounds().northeast);
      console.log(this.NEQ, this.NER, this.SWQ, this.SWR);
      this.axios
        .get("mapwebapp/saveCircle", {
          params: {
            devid: this.valuedev,
            NEQ: this.NEQ,
            NER: this.NER,
            SWQ: this.SWQ,
            SWR: this.SWR,
          },
        })
        .then((response) => {
          console.log("/a", response.data);
          if (response.data.code == "OK") {
            console.log("save OK");
          }
        })
        .catch((error) => console.log(error));

      // getBoundingClientRect
    },
    changeSwitch(val) {
      this.axios
        .get("mapwebapp/switchCircle", {
          params: {
            devid: this.valuedev,
            switch: this.valueswitch,
          },
        })
        .then((response) => {
          console.log("/a", response.data);
          if (response.data.code == "OK") {
            //var tempdata = [];
            console.log("switchCircle OK" + val);
            this.onSearchdev();
          }
          if (response.data.code == "NULL") {
            //var tempdata = [];
            console.log("switchCircle NULL" + val);
            if (val == true) {
              var southWest = new AMap.LngLat(122.068712, 37.527448);
              var northEast = new AMap.LngLat(122.08416, 37.534323);
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
              this.rectangle = rectangle; //rectangle暴露出去，要不然控制不到
              // 缩放地图到合适的视野级别
              mMap.setFitView([rectangle]);
              var rectangleEditor = new AMap.RectangleEditor(mMap, rectangle);
              this.rectangleEditor = rectangleEditor;
              rectangleEditor.on("adjust", function (event) {
                console.log("触发事件：adjust");
              });

              rectangleEditor.on("end", function (event) {
                console.log("触发事件： end");
                // event.target 即为编辑后的矩形对象
              });
            } else {
              this.rectangle.hide();
            }
          }
        })
        .catch((error) => console.log(error));

      // if (val == true) {
      //   //alert("f-true");
      //   //this.rectangle.hide();
      //   this.getCircle();
      //   //this.rectangle.show();
      // } else {
      //   //alert("ffff")
      //   //this.rectangle.hide();
      //   this.getCircle();
      // }
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
    getCircle() {
      this.axios
        .get("mapwebapp/getCircle", {
          params: {
            devid: this.valuedev,
          },
        })
        .then((response) => {
          console.log("/a", response.data);
          if (response.data.code == "OK") {
            console.log("get OK");
            var data = response.data.datas[0];
            this.NEQ = data.NEQ;
            this.NER = data.NER;
            this.SWQ = data.SWQ;
            this.SWR = data.SWR;
            this.SetIsDelete = data.isDelete;
            if (data.isDelete == 0) {
              this.valueswitch = true;
              var southWest = new AMap.LngLat(this.SWR, this.SWQ);
              var northEast = new AMap.LngLat(this.NER, this.NEQ);
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
              this.rectangle = rectangle; //rectangle暴露出去，要不然控制不到
              selfs.rectangle = rectangle; //rectangle暴露出去，要不然控制不到
              // 缩放地图到合适的视野级别
              self.mMap.setFitView([rectangle]);
              var rectangleEditor = new AMap.RectangleEditor(mMap, rectangle);
              this.rectangleEditor = rectangleEditor;
              rectangleEditor.on("adjust", function (event) {
                console.log("触发事件：adjust");
              });

              rectangleEditor.on("end", function (event) {
                console.log("触发事件： end");
                // event.target 即为编辑后的矩形对象
              });
            } else {
              this.valueswitch = false;
              this.rectangle.hide();
            }
            console.log(this.NEQ, this.NER, this.SetIsDelete);
            ////////
          } else if (response.data.code == "NULL") {
            console.log("get NULL");
          }
        })
        .catch((error) => console.log(error));
    },
    // 坐标转换
    convertFrom(lnglat, type) {
      AMap.convertFrom(lnglat, type, function (status, result) {
        if (result.info === "ok") {
          var resLnglat = result.locations[0];
          // var marker = new AMap.Marker({
          //     position: resLnglat,
          // });
          // self.mMap.add(marker);
          // self.mMap.setFitView();
          //根据矩形判断，区域内蓝色，区域外红色
          var flag = selfs.rectangle.contains(resLnglat);
          console.log(flag);
          if (flag) {
            var marker = new AMap.Marker({
              position: resLnglat,
            });
            self.mMap.add(marker);
          } else if (!flag && selfs.valueswitch) {
            var marker = new AMap.Marker({
              position: resLnglat,
              icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
            });
            // marker.setLabel({
            //     offset: new AMap.Pixel(20, 20),
            //     content: selfs.GPSdatelabel
            // });
            self.mMap.add(marker);
          } else {
            var marker = new AMap.Marker({
              position: resLnglat,
            });
            self.mMap.add(marker);
          }
          self.mMap.setFitView();
          //this.marker=marker;
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
  height: 100%;
}
#container {
  height: 100%;
}
.input-card {
  top: 10px;
  margin: auto;
  bottom: auto;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.demonstration {
  font-size: 15px;
}
.switchdiv {
  margin-right: 0px;
  padding-top: 2px;
}
</style>
