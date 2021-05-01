<template>
  <div>
    <p>我是电子围栏页面</p>
  </div>
</template>

<script>
export default {
  name: "SettingPage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入电子围栏界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开电子围栏界面");
    next();
  }
};
</script>

<style scoped>
</style>
