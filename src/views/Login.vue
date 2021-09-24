<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input required v-model="email" type="text" placeholder="Email" />
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
    },
  },
};
</script>