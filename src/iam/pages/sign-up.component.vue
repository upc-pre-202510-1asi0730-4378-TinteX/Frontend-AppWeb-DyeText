<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      password: "",
    };
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-card">
      <h3 class="signup-title">Sign Up</h3>
      <p class="signup-subtitle">Please enter the required information to sign up.</p>

      <form @submit.prevent="onSignUp" class="signup-form">
        <div class="p-fluid">
          <div class="field mt-4">
            <pv-float-label>
              <label for="username">Username</label>
              <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}" aria-describedby="username-help"/>
            </pv-float-label>
            <small v-if="!username" id="username-help" class="p-error block mt-2">Username is required.</small>
          </div>

          <div class="field mt-4">
            <pv-float-label>
              <label for="password">Password</label>
              <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password" aria-describedby="password-help"/>
            </pv-float-label>
            <small v-if="!password" id="password-help" class="p-error block mt-2">Password is required.</small>
          </div>

          <div class="field mt-5">
            <pv-button type="submit" label="Sign Up" class="p-button-primary w-full"></pv-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.signup-card {
  background: rgba(255, 255, 255, 0.46);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.signup-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.signup-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.signup-form .field {
  text-align: left;
}

.p-float-label label {
  color: #777;
}

.p-error {
  color: #ef4444;
  font-size: 0.875rem;
}

.p-button-primary {
  background-color: #007ad9;
  border-color: #007ad9;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}

.p-button-primary:hover {
  background-color: #005bb5;
  border-color: #005bb5;
}
</style>