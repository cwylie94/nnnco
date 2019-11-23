import validator from "validator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { validateEmailData, sendEmail } from "../api/EmailService";

export default {
  name: "EmailClient",
  data: function() {
    return {
      fromName: "",
      fromEmail: "",
      recipientEmail: "",
      recipientEmails: [],
      cc: "",
      ccList: [],
      bcc: "",
      bccList: [],
      subject: "",
      emailText: "",
      recipientEmailsInvalid: false,
      ccEmailsInvalid: false,
      bccEmailsInvalid: false,
      submitEmailFailed: false,
      submitEmailSuccess: false,
      isValidEmail: true,
      isValidCC: true,
      isValidBCC: true,
      isValidFromEmail: true
    };
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
    addrecipientEmail(list, email) {
      if (this.addEmail(list, email)) {
        this.recipientEmail = "";
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
    validateEmail(event) {
      event.preventDefault();
      if (!validator.isEmail(this.fromEmail)) {
        this.isValidFromEmail = false;
        return;
      }
      if (this.recipientEmails.length < 1) {
        this.recipientEmailsInvalid = true;
        return;
      }
      const email = {
        fromName: this.fromName,
        fromEmail: this.fromEmail,
        subject: this.subject,
        emailText: this.emailText,
        recipientEmails: this.recipientEmails,
        ccList: this.ccList,
        bccList: this.bccList
      };
      validateEmailData(email, response => {
        if (response) {
          sendEmail(email, res => {
            if (res) {
              this.submitEmailSuccess = true;
            } else {
              this.submitEmailFailed = true;
            }
          });
        } else {
          this.submitEmailFailed = true;
        }
      });
    }
  }
};
