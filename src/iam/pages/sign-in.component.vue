<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

/**
 * Sign in component
 * @summary
 * Display sign in form
 */
export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    /**
     * Sign in
     * @summary
     * Sign in user. It uses authentication store to sign in user.
     * If sign in is successful, it redirects to home page.
     * The store will update the current username and signed in status.
     */
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h3 class="login-title">Sign In</h3>
      <p class="login-subtitle">Please enter your credentials to sign in.</p>

      <form @submit.prevent="onSignIn" class="login-form">
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
            <pv-button type="submit" label="Sign In" class="p-button-primary w-full"></pv-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.login-form .field {
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