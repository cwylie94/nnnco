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
      fromEmail: "",
      recepientEmail: "",
      recepientEmails: [],
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
