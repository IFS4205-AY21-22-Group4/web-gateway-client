<template>
  <div class="container">
    <div class="text-center m-3">
      <h1>Account activation</h1>
    </div>
    <div class="col-md-4 offset-md-4">
      <form @submit.prevent="activation">
        <p class="text-center">Check your email for the activation key</p>

        <div class="mb-3">
          <label class="form-label">Activation key</label>
          <input class="form-control" required v-model="key" type="text" />
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100">Activate account</button>
        </div>

        <p class="text-center text-danger" v-if="activationFailed">
          Invalid key!
        </p>
        <hr />
      </form>
    </div>
  </div>
</template>

<script>
import { gatewayAPI } from "@/axios-api";

export default {
  name: "Activation",
  data() {
    return {
      key: "",
      activationFailed: false,
    };
  },
  methods: {
    activation() {
      gatewayAPI
        .get(`/api/verify-email/${this.key}`, {})
        .then((response) => {
          this.activationFailed = false;
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          this.activationFailed = true;
        });
    },
  },
};
</script>