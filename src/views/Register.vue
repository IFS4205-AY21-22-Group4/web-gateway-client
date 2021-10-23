<template>
  <div class="container">
    <div class="text-center m-3">
      <h1>Register</h1>
    </div>
    <div class="col-md-4 offset-md-4">
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" required v-model="email" type="text" />
        </div>

         <div class="mb-3">
          <label class="form-label">Postal Code</label>
          <input
            class="form-control"
            required
            v-model="postal"
            type="text"
            maxlength="6"
            minlength="6"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Unit no.</label>
          <input
            class="form-control"
            required
            v-model="unit"
            type="text"
          />
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
          <label class="form-label">Confirm password</label>
          <input
            class="form-control"
            required
            v-model="password2"
            type="password"
          />
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </div>
        <p class="text-center text-danger" v-if="authenticationFailed">
          {{failReason}}
        </p>
        <p class="text-center">
          Already have an account?
          <router-link :to="{ name: 'Login' }" exact>
            Click here to login.
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
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      postal: "",
      unit: "",
      authenticationFailed: false,
      failReason: "",
    };
  },
  methods: {
    register() {
      gatewayAPI
        .post("/api/register/", {
          email: this.email,
          password: this.password,
          password2: this.password2,
          postal_code: this.postal,
          unit_no: this.unit,
        })
        .then((response) => {
          this.authenticationFailed = false;
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          this.authenticationFailed = true;
          if (Object.keys(error.response.data)[0] == "postal_code") {
            this.failReason = "Invalid postal code"
          } else {
            this.failReason = error.response.data[Object.keys(error.response.data)[0]][0];
          }
          this.password = "";
          this.password2 = "";
        });
    },
  },
  created() {
  },
};
</script>