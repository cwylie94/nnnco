<template>
  <div id="app">
    <div class="banner">
      <img alt="Vue logo" src="./assets/nnnco_logo.png" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #E3DCDC;
}
.banner {
  background-color: #4C4747;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
