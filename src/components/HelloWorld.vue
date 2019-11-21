<template>
  <div class="hello">
    <ul id="item-list">
      <li v-for="(item, index) of recepientEmails" v-bind:key="index" :id="item">
          {{ item }}
          <button @click="removeRecepientEmail(index)" />
      </li>
    </ul>
    <input type="text" placeholder="Email" v-model="recepientEmail"/>
    <button @click="addRecepientEmail(recepientEmail)" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function () {
    return {
      recepientEmail: "",
      recepientEmails: ["email1","email2"]
    }
  },
  methods: {
    addRecepientEmail(email) {
      if (email !== "") {
        this.recepientEmails.push(email);
        this.recepientEmail = "";
      }
    },
    removeRecepientEmail(index) {
      this.recepientEmails.splice(index, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
