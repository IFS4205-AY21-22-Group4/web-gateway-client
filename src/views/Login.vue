<template>
  <div class="container"></div>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input required v-model="email" type="text" placeholder="Email" />
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password" />
    <p class="text-danger" v-if="authenticationFailed">
      Incorrect username or password.
    </p>
    <hr />
    <button type="submit">Login</button>
  </form>
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
      // this.$store
      //   .dispatch("userLogin", {
      //     username: this.email,
      //     password: this.password,
      //   })
      //   .then(() => {
      //     this.$router.push({ name: "Home" });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.authenticationFailed = true;
      //   });
      gatewayAPI
        .post("/api/login/", {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("Login success");
          sessionStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          console.log(error);
          console.log("Login fail");
        });
    },
  },
};
</script>