<template>
  <div class="hello rounded-lg">
    <b-form @submit="validateEmail">

      <b-form-group class="email-form" label-for="recepient-email-input">
        <div class="email-form-text">
          To:
        </div>
        <div class="email-list-container">
          <ul id="item-list">
            <li class="email-form-list-item" v-for="(item, index) of recepientEmails" v-bind:key="index" :id="item">
                {{ item }}
                <b-button class="btn btn-danger btn-sm" @click="removeEmail(recepientEmails, index)">X</b-button>
            </li>
          </ul>
        </div>
        <b-alert v-model="recepientEmailsInvalid" variant="danger" dismissible>
          Please add at least one recepient
        </b-alert>
        <b-form-input
          id="recepient-email-input"
          class="email-form-input"
          v-model="recepientEmail"
          type="email"
          placeholder="Email"
          :state="isValidEmail"/>
        <b-button
          variant="secondary"
          class="email-form-button"
          @click="addRecepientEmail(recepientEmails, recepientEmail)">+</b-button>
      </b-form-group>

      <div class="cc-wrapper">
        <b-form-group class="email-form" label-for="cc-email-input">
          <div class="email-form-text">
            CC:
          </div>
          <div class="email-list-container">
            <ul id="item-list">
              <li class="email-form-list-item" v-for="(item, index) of ccList" v-bind:key="index" :id="item">
                  {{ item }}
                  <b-button class="btn btn-danger btn-sm" @click="removeEmail(ccList, index)">X</b-button>
              </li>
            </ul>
          </div>
          <b-alert v-model="ccEmailsInvalid" variant="danger" dismissible>
            Please add at least one recepient
          </b-alert>
          <b-form-input
            id="cc-email-input"
            class="email-form-input"
            v-model="cc"
            type="email"
            placeholder="cc"
            :state="isValidCC"/>
            <b-button
              variant="secondary"
              class="email-form-button"
              @click="addCCEmail(ccList, cc)">+</b-button>
        </b-form-group>
      </div>

      <div class="bcc-wrapper">
        <b-form-group class="email-form" label-for="bcc-email-input">
          <div class="email-form-text">
            BCC:
          </div>
          <div class="email-list-container">
            <ul id="item-list">
              <li class="email-form-list-item" v-for="(item, index) of bccList" v-bind:key="index" :id="item">
                  {{ item }}
                  <b-button class="btn btn-danger btn-sm" @click="removeEmail(bccList, index)">X</b-button>
              </li>
            </ul>
          </div>
          <b-alert v-model="bccEmailsInvalid" variant="danger" dismissible>
            Please add at least one recepient
          </b-alert>
          <b-form-input
            id="bcc-email-input"
            class="email-form-input"
            v-model="bcc"
            type="email"
            placeholder="bcc"
            :state="isValidCC"/>
            <b-button
              variant="secondary"
              class="email-form-button"
              @click="addBCCEmail(bccList, bcc)">+</b-button>
        </b-form-group>
      </div>

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
    <b-button class="submit-button" type="submit" variant="primary">Submit</b-button>
    <b-alert v-model="submitEmailSuccess" variant="success" dismissible>
      Email sent successfully
    </b-alert>
    <b-alert v-model="submitEmailFailed" variant="danger" dismissible>
      Email validation failed, please try again
    </b-alert>
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
      cc: "",
      ccList: [],
      bcc: "",
      bccList: [],
      subject: "",
      emailText: "",
      recepientEmailsInvalid: false,
      ccEmailsInvalid: false,
      bccEmailsInvalid: false,
      submitEmailFailed: false,
      submitEmailSuccess: false
    }
  },
  computed: {
    isValidEmail() {
      return validator.isEmail(this.recepientEmail);
    },
    isValidCC() {
      return validator.isEmail(this.cc);
    },
    isValidBCC() {
      return validator.isEmail(this.bcc);
    },
  },
  methods: {
    addEmail(list, email) {
      if (validator.isEmail(email)) {
        list.push(email);
        return true;
      }
      return false;
    },
    removeEmail(list, index) {
      list.splice(index, 1);
    },
    addRecepientEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.recepientEmail = "";
      }
    },
    addCCEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.cc = "";
      }
    },
    addBCCEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.bcc = "";
      }
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
        html: this.emailText,
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
      axios.post("/v1/api/emails", validationParams, config)
      .then((response) => {
        if (response.status === 200) {
          this.submitEmailSuccess = true;
          alert(response.status);
          // this.sendEmail();
        }
      })
      .catch(() => {
        this.submitEmailFailed = true;
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
  float: left;
  display: inline;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 900px;
  margin: auto;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.email-form {
  margin-top: 20px;
  float: left;
  width: 100%;
}
.email-form-input {
  float: left;
  display: inline;
  width: 60%;
  margin-right: 10px;
  margin-top: 10px;
}
.email-form-button {
  float: left;
  display: inline;
  margin-top: 10px;
}
.email-list-container {
  border-style: solid;
  border-width: 2px;
  border-color: lightgrey;
  border-radius: 10px;
  width: 90%;
  height: 70px;
  overflow: auto;
  float: right;
  padding: 5px;
}
.email-form-text {
  float: left;
  display: inline;
  margin-top: 20px;
}
.email-form-list-item {
  float: left;
  display: inline;
  border-style: solid;
  border-width: 2px;
  border-color: lightgrey;
  border-radius: 20px;
  padding: 6px;
  background-color: whitesmoke;
}
.cc-wrapper {
  float: left;
  width: 45%;
}
.bcc-wrapper {
  float: right;
  width: 50%;
}
.submit-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
