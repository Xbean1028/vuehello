<template>
  <div>
    <p>我是用户信息页面</p>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入用户信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开用户信息界面");
    next();
  }
};
</script>

<style scoped>
</style>
