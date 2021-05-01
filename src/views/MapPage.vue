<template>
  <body>
    <div>
      <p>我是Map页面</p>
    </div>
  </body>
</template>

<script>
export default {
  name: "MapPage",
  beforeRouteEnter: (to, from, next) => {
    console.log("进入地图界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开地图界面");
    next();
  }
};
</script>

<style scoped>
</style>
