<template>
  <div class="hello">
    <b-form @submit="validateEmail">
      <b-form-group label-for="input-1">
        <ul id="item-list">
          To:
          <li v-for="(item, index) of recepientEmails" v-bind:key="index" :id="item">
              {{ item }}
              <b-button class="btn btn-danger btn-sm" @click="removeRecepientEmail(index)">X</b-button>
          </li>
          <b-alert v-model="recepientEmailsInvalid" variant="danger" dismissible>
            Please add at least one recepient
          </b-alert>
        </ul>
        <b-form-input
          id="input-1"
          v-model="recepientEmail"
          type="email"
          placeholder="Email"
          :state="isValidEmail"/>
          <b-button variant="secondary" @click="addRecepientEmail(recepientEmail)">Add Email</b-button>
      </b-form-group>

      <b-form-group label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="subject"
          type="text"
          required
          placeholder="Subject"/>
      </b-form-group>

      <b-form-textarea
        id="textarea"
        v-model="emailText"
        placeholder="Enter email text..."
        rows="3"
        required
        max-rows="6">
      </b-form-textarea>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
  </div>
</template>

<script>
import validator from "validator";
import emailjs from "emailjs-com";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
      emailText: "",
      recepientEmailsInvalid: false
    }
  },
  computed: {
    isValidEmail() {
      return validator.isEmail(this.recepientEmail);
    },
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
    validateEmail(event) {
      event.preventDefault();
      if (this.recepientEmails.length < 1) {
        this.recepientEmailsInvalid = true;
        return;
      }
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
.hello {
  width: 600px;
  margin: auto;
}
</style>
