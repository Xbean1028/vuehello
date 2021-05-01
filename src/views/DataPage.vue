<template>
  <div>
    <p>我是Data页面</p>
  </div>
</template>

<script>
export default {
  name: "DataPage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入数据界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开数据界面");
    next();
  }
};
</script>

<style scoped>
</style>
