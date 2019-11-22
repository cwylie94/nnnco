<template>
  <div id="app">
    <div class="banner">
      <img alt="Vue logo" src="./assets/nnnco_logo.png" />
    </div>
    <h2 class="email-client-title">Email Client</h2>
    <EmailClient />
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

<style src="./styles/app.css"></style>
