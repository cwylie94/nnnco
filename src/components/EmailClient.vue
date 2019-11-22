<template>
  <div class="hello rounded-lg">
    <b-form @submit="validateEmail">

      <b-form-group class="email-text-container" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="fromName"
          type="text"
          required
          placeholder="Name"/>
      </b-form-group>

      <b-form-group class="email-text-container" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="fromEmail"
          type="text"
          required
          placeholder="Your Email"
          @keyup="isValidFromEmail = true"
          :state="isValidFromEmail"/>
      </b-form-group>

      <b-alert class="email-error-alert" v-model="recepientEmailsInvalid" variant="danger" dismissible>
        Please add at least one recepient
      </b-alert>
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
        <b-form-input
          id="recepient-email-input"
          class="email-form-input"
          v-model="recepientEmail"
          type="email"
          placeholder="Email"
          @keyup="isValidEmail = true"
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
            @keyup="isValidCC = true"
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
            @keyup="isValidBCC = true"
            :state="isValidBCC"/>
            <b-button
              variant="secondary"
              class="email-form-button"
              @click="addBCCEmail(bccList, bcc)">+</b-button>
        </b-form-group>
      </div>

      <b-form-group class="email-text-container" label-for="input-2">
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
  name: "EmailClient",
  data: function () {
    return {
      fromName: "",
      fromEmail: "wyliec94@gmail.com",
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
      submitEmailSuccess: false,
      isValidEmail: true,
      isValidCC: true,
      isValidBCC: true,
      isValidFromEmail: true
    }
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
      } else {
        this.isValidEmail = false;
      }
    },
    addCCEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.cc = "";
      } else {
        this.isValidCC = false;
      }
    },
    addBCCEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.bcc = "";
      } else {
        this.isValidBCC = false;
      }
    },
    sendEmail() {
      const templateParams = {
        fromName: this.fromName,
        fromEmail: this.fromEmail,
        emailText: this.emailText,
        subject: this.subject,
        recepientEmails: this.recepientEmails,
        cc: this.ccList,
        bcc: this.bccList
      };
      emailjs.send("mailgun", "template_4OATzjxr", templateParams, "user_dDd3vEsNsr0d97jTg8i3z")
      .then(() => {
        this.submitEmailSuccess = true;
      }, () => {
        this.submitEmailFailed = true;
      });
    },
    validateEmail(event) {
      event.preventDefault();
      if (!validator.isEmail(this.fromEmail)) {
        this.isValidFromEmail = false;
        return;
      }
      if (this.recepientEmails.length < 1) {
        this.recepientEmailsInvalid = true;
        return;
      }
      const validationParams = {
        from: this.fromEmail,
        subject: this.subject,
        text: this.emailText,
        html: this.emailText,
        toList: this.recepientEmails,
        ccList: this.ccList,
        bccList: this.bccList
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
          this.sendEmail();
        }
      })
      .catch(() => {
        this.submitEmailFailed = true;
      });
    }
  }
};
</script>

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
  margin-top: 20px;
  margin-bottom: 30px;
}
.email-form {
  margin-top: 10px;
  float: left;
  width: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: silver;
  border-radius: 10px;
  padding: 10px;
  background-color: lightgrey;
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
  border-color: darkgrey;
  border-radius: 5px;
  width: 90%;
  height: 70px;
  overflow: auto;
  float: right;
  padding: 3px;
  background-color: silver;
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
  border-color: darkgrey;
  border-radius: 20px;
  padding: 6px;
  background-color: whitesmoke;
  margin-top: 5px;
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
.email-error-alert {
  width: 100%;
  height: 50px;
  float: left;
}
.email-text-container {
  width: 50%;
}
</style>
