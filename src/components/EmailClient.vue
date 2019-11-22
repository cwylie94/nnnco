<template>
  <div class="email-client-container rounded-lg">
    <b-form @submit="validateEmail">
      <b-form-group class="email-text-container" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="fromName"
          type="text"
          required
          placeholder="Name"
        />
      </b-form-group>

      <b-form-group class="email-text-container" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="fromEmail"
          type="text"
          required
          placeholder="Your Email"
          @keyup="isValidFromEmail = true"
          :state="isValidFromEmail"
        />
      </b-form-group>

      <b-alert
        class="email-error-alert"
        v-model="recepientEmailsInvalid"
        variant="danger"
        dismissible
      >
        Please add at least one recepient
      </b-alert>
      <b-form-group class="email-form" label-for="recepient-email-input">
        <div class="email-form-text">
          To:
        </div>
        <div class="email-list-container">
          <ul id="item-list">
            <li
              class="email-form-list-item"
              v-for="(item, index) of recepientEmails"
              v-bind:key="index"
              :id="item"
            >
              {{ item }}
              <b-button
                class="btn btn-danger btn-sm"
                @click="removeEmail(recepientEmails, index)"
                >X</b-button
              >
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
          :state="isValidEmail"
        />
        <b-button
          variant="secondary"
          class="email-form-button"
          @click="addRecepientEmail(recepientEmails, recepientEmail)"
          >+</b-button
        >
      </b-form-group>

      <div class="cc-wrapper">
        <b-form-group class="email-form" label-for="cc-email-input">
          <div class="email-form-text">
            CC:
          </div>
          <div class="email-list-container">
            <ul id="item-list">
              <li
                class="email-form-list-item"
                v-for="(item, index) of ccList"
                v-bind:key="index"
                :id="item"
              >
                {{ item }}
                <b-button
                  class="btn btn-danger btn-sm"
                  @click="removeEmail(ccList, index)"
                  >X</b-button
                >
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
            :state="isValidCC"
          />
          <b-button
            variant="secondary"
            class="email-form-button"
            @click="addCCEmail(ccList, cc)"
            >+</b-button
          >
        </b-form-group>
      </div>

      <div class="bcc-wrapper">
        <b-form-group class="email-form" label-for="bcc-email-input">
          <div class="email-form-text">
            BCC:
          </div>
          <div class="email-list-container">
            <ul id="item-list">
              <li
                class="email-form-list-item"
                v-for="(item, index) of bccList"
                v-bind:key="index"
                :id="item"
              >
                {{ item }}
                <b-button
                  class="btn btn-danger btn-sm"
                  @click="removeEmail(bccList, index)"
                  >X</b-button
                >
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
            :state="isValidBCC"
          />
          <b-button
            variant="secondary"
            class="email-form-button"
            @click="addBCCEmail(bccList, bcc)"
            >+</b-button
          >
        </b-form-group>
      </div>

      <b-form-group class="email-text-container" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="subject"
          type="text"
          required
          placeholder="Subject"
        />
      </b-form-group>

      <b-form-textarea
        id="textarea"
        v-model="emailText"
        placeholder="Enter email text..."
        rows="3"
        required
        max-rows="6"
      >
      </b-form-textarea>
      <b-button class="submit-button" type="submit" variant="primary"
        >Submit</b-button
      >
      <b-alert v-model="submitEmailSuccess" variant="success" dismissible>
        Email sent successfully
      </b-alert>
      <b-alert v-model="submitEmailFailed" variant="danger" dismissible>
        Email validation failed, please try again
      </b-alert>
    </b-form>
  </div>
</template>

<script src="../scripts/EmailClient.js"></script>

<style src="../styles/EmailClient.css"></style>
