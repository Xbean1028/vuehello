<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <mapdemo></mapdemo> -->
    <router-view />
    <!--    <Index></Index>-->
  </div>
</template>

<script>
// import mapdemo from "./components/mapdemo";
// import Index from './views/Index'
export default {
  name: "App",
  // components: {
  //   // Index,
  //   // mapdemo,
  // },
  mounted () {
    window.addEventListener('unload', this.saveState);
  },
  methods: {
    saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state.user));
    }
  }
};
</script>

<style>
body {
  height: 100%;
  margin-bottom: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
