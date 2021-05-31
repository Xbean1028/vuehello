<template>
  <div>
    <!-- <el-row> -->
      <!-- <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          2020-2021 xubean 版权所有 鲁ICP备*******号 blog
        </div></el-col
      > -->
      <div class="foot">
        © 2019-2021  by <el-link type="primary" target="_blank" href="https://blog.xubean.top/">Code小白</el-link>. All rights reserved.
        <el-link type="primary" target="_blank" href="https://github.com/Xbean1028/">Github</el-link>.&
        <el-link type="primary" target="_blank" href="https://xubean.blog.csdn.net/">CSDN</el-link>.
        
        <div class="foot">
            My Email:xubean123@163.com 
            <el-link type="primary" target="_blank" href="http://www.beian.miit.gov.cn">鲁ICP备 19055640 号</el-link>
        </div>
      </div>
    <!-- </el-row> -->
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  components: {},
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
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.foot {
    /* position: absolute; */
    /* bottom: 10px; */
    z-index: 1000;
    text-align: center;
    width: 100%;
    color: #999;
    /* height: 5vh; */
    line-height: 20px;
    font-size: 12px;
}
</style>
