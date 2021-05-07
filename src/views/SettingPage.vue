<template>
  <div>
    <p>我是数据测试页面</p>
  </div>
</template>

<script>
export default {
  name: "SettingPage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入数据测试界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开数据测试界面");
    next();
  }
};
</script>

<style scoped>
</style>
