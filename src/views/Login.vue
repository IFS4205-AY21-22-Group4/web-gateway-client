<template>
  <div class="container">
    <div class="text-center m-3">
      <h1>Sign in</h1>
    </div>
    <div class="col-md-4 offset-md-4">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" required v-model="email" type="text" />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            class="form-control"
            required
            v-model="password"
            type="password"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </div>
        <p class="text-center text-danger" v-if="authenticationFailed">
          Incorrect username or password.
        </p>
        <p class="text-center">
          New user?
          <router-link :to="{ name: 'Login' }" exact>
            Click here to sign up.
          </router-link>
        </p>
        <hr />
      </form>
    </div>
  </div>
</template>

<script>
import { gatewayAPI } from "@/axios-api";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      authenticationFailed: false,
    };
  },
  methods: {
    login() {
      gatewayAPI
        .post("/api/login/", {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("Login success");
          sessionStorage.setItem("token", response.data.token);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log("Login failed");
          this.authenticationFailed = true;
          this.password = "";
        });
    },
  },
  created() {
    if (sessionStorage.getItem("token") !== null) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>