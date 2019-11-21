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
    <br>
    <input type="text" placeholder="Subject" v-model="subject" />
    <br>
    <textarea v-model="emailText" placeholder=""></textarea>
    <br>
    <button @click="validateEmail()">Send Email</button>
  </div>
</template>

<script>
import validator from "validator";
import emailjs from "emailjs-com";
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function () {
    return {
      recepientEmail: "",
      recepientEmails: ["wyliec94@gmail.com", "email1"],
      subject: "",
      emailText: ""
    }
  },
  methods: {
    addRecepientEmail(email) {
      if (validator.isEmail(email)) {
        this.recepientEmails.push(email);
        this.recepientEmail = "";
      }
    },
    removeRecepientEmail(index) {
      this.recepientEmails.splice(index, 1);
    },
    sendEmail() {
      const templateParams = {
        emailText: this.emailText,
        subject: this.subject,
        recepientEmails: this.recepientEmails
      };
      emailjs.send("mailgun", "template_4OATzjxr", templateParams, "user_dDd3vEsNsr0d97jTg8i3z")
      .then((result) => {
        alert("Success", result);
      }, (error) => {
        alert("Failed", error);
      });
    },
    validateEmail() {
      const validationParams = {
        from: "wyliec94@gmail.com",
        subject: this.subject,
        text: this.emailText,
        html: "",
        toList: this.recepientEmails,
        ccList: [],
        bccList: []
      };
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      axios.get("https://tt-email-gateway.nnnco.io/v1/api/emails", validationParams, config)
      .then((response) => {
        alert(JSON.stringify(response));
        // this.sendEmail();
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
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
