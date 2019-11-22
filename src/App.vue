<template>
  <div id="app">
    <div class="banner">
      <img alt="Vue logo" src="./assets/nnnco_logo.png" />
    </div>
    <h2 class="email-client-title">Email Client</h2>
    <EmailClient/>
  </div>
</template>

<script>
import EmailClient from "./components/EmailClient.vue";

export default {
  name: "app",
  components: {
    EmailClient
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
.email-client-title {
  margin-top: 20px;
}
</style>
