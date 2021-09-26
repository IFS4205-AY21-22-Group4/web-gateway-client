<template>
  <div class="container">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="email" type="text" placeholder="Email" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <p class="text-danger" v-if="authenticationFailed">
        Incorrect username or password.
      </p>
      <hr />
      <button type="submit">Login</button>
    </form>
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