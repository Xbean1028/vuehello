<template>
  <div>
    <p>我是Drive页面</p>
  </div>
</template>

<script>
export default {
  name: "DrivePage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入设备管理界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开设备管理界面");
    next();
  }
};
</script>

<style scoped>
</style>
