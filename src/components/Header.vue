<template>
  <div class="bghead">
    <el-row :gutter="20">
        <!-- 24 -->
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"><div class="headtext">NBIoT的定位服务物联网平台</div></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"><div class="showTime timetext">Hello</div></div></el-col>
    </el-row>
    <!-- <div class="showTime">Hello</div> -->
  </div>
</template>

<script>
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
  document.querySelector(".showTime").innerHTML ="当前时间：" +y +"年" +mt +"月" +day +"日-" +h +"时" +m +"分" +s +"秒";
  t = setTimeout(time, 1000); //设定定时器，循环运行
}
export default {
  name: "Header",
};
</script>

<style scoped>

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
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
  .bghead{
background-color: #d3dce6;
  }
  .headtext{
      font: 26px "微软雅黑";
      color:#303133;
  }
  .timetext{
      font: 20px "微软雅黑";
      color:#409EFF;
  }

</style>
