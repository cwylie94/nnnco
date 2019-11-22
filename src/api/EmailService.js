import axios from "axios";
import emailjs from "emailjs-com";

export function validateEmailData(email, callback) {
  const validationParams = {
    from: email.fromEmail,
    subject: email.subject,
    text: email.emailText,
    html: email.emailText,
    toList: email.recepientEmails,
    ccList: email.ccList,
    bccList: email.bccList
  };
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  axios
    .post("/emails", validationParams, config)
    .then(response => {
      if (response.status === 200) {
        callback(true);
      }
    })
    .catch(() => {
      callback(false);
    });
}

export function sendEmail(email, callback) {
  const templateParams = {
    fromName: email.fromName,
    fromEmail: email.fromEmail,
    emailText: email.emailText,
    subject: email.subject,
    recepientEmails: email.recepientEmails,
    cc: email.ccList,
    bcc: email.bccList
  };
  emailjs
    .send(
      "mailgun",
      "template_4OATzjxr",
      templateParams,
      "user_dDd3vEsNsr0d97jTg8i3z"
    )
    .then(
      () => {
        callback(true);
      },
      () => {
        callback(false);
      }
    );
}
